import { ASTBuildingContext, DataClumpDetectorContext, DataClumpRefactoringContext, UsageFindingContext } from "../../../context/DataContext";
import { PipeLineStep, PipeLineStepType } from "../../PipeLineStep";
import { AbstractStepHandler } from "../AbstractStepHandler";
import { Readable, Writable } from "stream"
import { ResponseMessage } from "../../../util/languageServer/TypeDefinitions";
import { DefinitionParams, InitializeParams, ReferenceParams } from "ts-lsp-client";
import { resolve,relative } from "path"
import { MyCapabilities } from "../../../util/languageServer/capabilities";
import { readFileSync } from "fs"
import fs from "fs"
import { LanguageServerAPI, Methods } from "../../../util/languageServer/LanguageServerAPI";
import { UsageType, VariableOrMethodUsage } from "../../../context/VariableOrMethodUsage";
import { getContextSerializationPath, registerFromName, resolveFromInterfaceName } from "../../../config/Configuration";
import { DataClumpTypeContext, Position } from "data-clumps-type-context";
import { waitSync } from "../../../util/Utils";

type LanguageServerReferenceAPIParams = {
    apiName: string,
    apiArgs: any
}
export class LanguageServerReferenceAPI extends AbstractStepHandler {
    api: LanguageServerAPI | null = null;
    apiArgs: LanguageServerReferenceAPIParams
    globalCounter = 3
    balanceQueue=new Set<number>();
    private useExistingReferences: boolean=true;
    visitedMethods: Set<string> = new Set();
    counterDataClumpInfoMap: Map<number, { variableKey: string, variableName: string, usageType: UsageType,variableNames:string[],originKey:string,isParameter:boolean, request:string }> = new Map();
    constructor(args: LanguageServerReferenceAPIParams & {useExistingReferences:boolean}) {
        super();
        registerFromName(args.apiName, "LanguageServerAPI", args.apiArgs)
        this.apiArgs = args;
        if(args.useExistingReferences!=undefined){
            this.useExistingReferences=args.useExistingReferences
        
        }
    }
    nextCounterValue(): number {
       let n=this.globalCounter++;
       this.balanceQueue.add(n)
        return n;
    }
    deserializeExistingContext(context: DataClumpRefactoringContext, step: PipeLineStepType): DataClumpRefactoringContext | null {
       
        if(step==PipeLineStep.ReferenceFinding && this.useExistingReferences){
            let path=getContextSerializationPath(step.name,context)
            if(fs.existsSync(getContextSerializationPath(step.name,context))){
                let data=JSON.parse(fs.readFileSync(getContextSerializationPath(step.name,context)).toString())
                return context.buildNewContext(new UsageFindingContext(data))
            }
        }
        return null;
    }
    addCreatedContextNames(pipeLineStep: PipeLineStepType, createdContexts: Set<string>): void {
        createdContexts.add(UsageFindingContext.name)
    }
    addAditionalContextRequirementNames(pipeLineStep: PipeLineStepType, requirements: Set<string>): void {
        requirements.add(DataClumpDetectorContext.name)
    }
    getIdentifierPosition(relativePath: string, identifier: string, fileMap: Map<string, string>, context: DataClumpRefactoringContext, startLine: number): Position {
        const filePath = resolve(context.getProjectPath(), relativePath)
        if (!fileMap.has(filePath)) {
            fileMap.set(filePath, readFileSync(filePath).toString())
        }
        let wholeFile = fileMap.get(filePath)!!.split("\n");

        let line = wholeFile[startLine]
        let character = line.indexOf(identifier);
        return { startLine: startLine, startColumn: character, endLine: startLine, endColumn: character + identifier.length };
    }

    sendMethodUsageAndDeclarationRequest(socket:Writable,dcKey:string,methodFile: string, methodName: string, context: DataClumpRefactoringContext,  line: number,variableNames:string[],methodKey:string) {
        this.loadMethodDeclarations(socket,methodFile,methodName,context,dcKey,methodKey,variableNames)
      
       
    }
    loadMethodDeclarations(socket:Writable ,methodFile: string, methodName: string, context: DataClumpRefactoringContext, dcKey: string, methodKey: string, variableNames: string[]) {
       let astContext=context.getByType(ASTBuildingContext)!;
       let originalClass=astContext.getByPath(methodFile)
       if(originalClass.methods[methodKey]==undefined){
        return
       }
       let fileQueue=[methodFile]
       let visited=new Set<string>()
       do{
        let currPath=fileQueue.pop()!!
        if(visited.has(currPath))continue;
        visited.add(currPath)
      
        let myClass=astContext.getByPath(currPath)
        let method=Object.keys(myClass.methods).map((it)=>myClass.methods[it]).find((it)=>it.name==methodName && it.parameters.map((it)=>it.type +" "+it.name).join(",")==originalClass.methods[methodKey].parameters.map((it)=>it.type +" "+it.name).join(","))
        if(method==undefined){
            continue;
        }
        if (!(dcKey in this.usages)){
            this.usages[dcKey] = []
        }
       
        this.usages[dcKey]!.push({
            symbolType:UsageType.MethodDeclared,
            range:{startLine:method.position.startLine-1,startColumn:method.position.startColumn,endLine:method.position.endLine-1,endColumn:method.position.endColumn},
            filePath:currPath,
            name:methodName,
            originKey:methodKey,
        })

        for(let paramName of variableNames){
            let param=method.parameters.find((it)=>it.name==paramName)!
          let requestParam:ReferenceParams={
                textDocument: {
                    uri: "file://" + resolve(context.getProjectPath(),currPath)
                },
                position: {
                    line: param.position.startLine -1,
                    character: param.position.startColumn
                },
                context:{
                    includeDeclaration:false
                }

    
            }
            let nextId=this.nextCounterValue();

            let request=this.api?.create_request_message(nextId,Methods.References,requestParam)

             this.counterDataClumpInfoMap.set(nextId,
                {variableKey:dcKey,
                    variableName:paramName,
                    usageType:UsageType.VariableUsed,
                    variableNames:[],
                    originKey:methodKey,isParameter:true,
                    request:request!

                }
            );
             socket.write(request)
            
        }
        
        let extending=astContext.getExtendingOrImplementingClassKeys(methodFile)
        for(let cls of extending){
            fileQueue.push(cls)
        }
        let methodUsedReferenceParams:ReferenceParams={
            textDocument: {
                uri: "file://" + resolve(context.getProjectPath(),currPath)
            },
            position: {
                line: method.position.startLine-1,
                character: method.position.startColumn
            },
            context:{
                includeDeclaration:false
            }

        }
         let nextId=this.nextCounterValue();
         let request=this.api?.create_request_message(nextId,Methods.References,methodUsedReferenceParams)

         this.counterDataClumpInfoMap.set(nextId,
            {variableKey:dcKey,
                variableName:methodName,
                usageType:UsageType.MethodUsed,
                variableNames:variableNames,
                originKey:methodKey,isParameter:false,
                request:request!

            }
        );
         socket.write(request)
    
       }while(fileQueue.length>0)

    }
    sendVariableUsageAndDeclarationRequest(socket:Writable,dcKey:string,fieldFile: string, fieldName: string, context: DataClumpRefactoringContext, pos: Position,variableNames:string[],fieldKey:string,isParameter:boolean) {
        let nextId=0
        let request:string|undefined=""
        if(!isParameter){
            let fieldDefRequest: DefinitionParams = {

                textDocument: {
                    uri: "file://" + resolve(context.getProjectPath(),fieldFile)
                },
                position: {
                    line: pos.startLine-1,
                    character: pos.startColumn
                }
            }
            nextId=this.nextCounterValue();
            request=this.api?.create_request_message(nextId,Methods.Definition,fieldDefRequest)
            this.counterDataClumpInfoMap.set(nextId,
                {variableKey:dcKey,
                    variableName:fieldName
                    ,usageType:UsageType.VariableDeclared,
                    variableNames:variableNames,
                    originKey:fieldKey,isParameter:isParameter,
                    request:request!
                })
               // waitSync(1000)
            socket.write(request)
        }
       
        
        let fieldUsageRequest:ReferenceParams={
            textDocument: {
                uri: "file://" + resolve(context.getProjectPath(),fieldFile)
            },
            position: {
                line: pos.startLine-1 ,
                character: pos.startColumn
            },
            context:{
                includeDeclaration:false
            }

        }
         nextId=this.nextCounterValue();
         request=this.api?.create_request_message(nextId,Methods.References,fieldUsageRequest)
        this.counterDataClumpInfoMap.set(nextId,
            {variableKey:dcKey,
                variableName:fieldName,
                usageType:UsageType.VariableUsed,
                variableNames:[],
                originKey:fieldKey,isParameter:isParameter,
                request:request!

            }
                );
        
        socket.write(request)
    }
    sendRequestsForDataClump(socket:Writable,dataClump: DataClumpTypeContext,context:DataClumpRefactoringContext){
            const isFromMethod = dataClump.from_method_name != null;
            const isToMethod = dataClump.to_method_name != null;
            if (isFromMethod) {
                let startLine=Object.values(dataClump.data_clump_data)[0].position.startLine-1
                this.sendMethodUsageAndDeclarationRequest(socket,dataClump.key!,dataClump.from_file_path, dataClump.from_method_name!!, context, startLine,Object.values(dataClump.data_clump_data).map((it)=>it.name),dataClump.from_method_key! )
            }
            if(isToMethod){
                let startLine=Object.values(dataClump.data_clump_data)[0].to_variable.position.startLine-1

                this.sendMethodUsageAndDeclarationRequest(socket,dataClump.key,dataClump.to_file_path, dataClump.to_method_name!!, context, startLine,Object.values(dataClump.data_clump_data).map((it)=>it.to_variable.name),dataClump.to_method_key!)
            }
            for(let variableKey of Object.keys(dataClump.data_clump_data)){
                let variable=dataClump.data_clump_data[variableKey]!
                this.sendVariableUsageAndDeclarationRequest(socket,dataClump.key,dataClump.from_file_path,variable.name,context,variable.position,Object.values(dataClump.data_clump_data).map((it)=>it.name),variable.key,isFromMethod)
                this.sendVariableUsageAndDeclarationRequest(socket,dataClump.key,dataClump.to_file_path,variable.to_variable.name,context,variable.to_variable.position,Object.values(dataClump.data_clump_data).map((it)=>it.to_variable.name),variable.to_variable.key,isToMethod)
            
            }
          
        }
    private usages:{ [key: string]: VariableOrMethodUsage[] }={}

    async handle(step:PipeLineStepType,context: DataClumpRefactoringContext, params: any): Promise < DataClumpRefactoringContext > {
                if(this.api == null){
                this.api = resolveFromInterfaceName("LanguageServerAPI") as LanguageServerAPI;
            }
            let dcContext=context.getByType(DataClumpDetectorContext)!!
            return await new Promise<DataClumpRefactoringContext>(async handleResolver => {
                const socket = await this.api!!.init(context.getProjectPath(), (data) => {
                    console.log(JSON.stringify(data, null, 2))
                    let info = this.counterDataClumpInfoMap.get(data.id)!
                    if (info == undefined) return;
                    let combined=Object.assign(info,data,)
                    this.balanceQueue.delete(data.id)
                    if (!(info.variableKey in this.usages)){
                        this.usages[info.variableKey]= []
                    }
                    if(data.error){
                        console.log("ERROR ON REC",data.error)
                        return
                    }
                    for (let result of data.result!) {
                        let usage:VariableOrMethodUsage={
                            symbolType: info.usageType,
                            range:{startLine:result.range.start.line,startColumn:result.range.start.character,endLine:result.range.end.line,endColumn:result.range.end.character},
                            filePath: result.uri.substring("file://".length).replace(context.getProjectPath(),""),
                            name: info.variableName,
                            originKey:info.originKey,
                        }
                        this.usages[(info.variableKey)]!.push(usage)

                    }
                    console.log("balance", this.balanceQueue.size)
                    if (this.balanceQueue.size == 0) {
                        for(let usg of  Object.entries(this.usages)){
                       
                            this.usages[usg[0]]= this.usages[usg[0]]!.sort(function(a,b){
                                return a.symbolType-b.symbolType
                            });
                        }
                        this.api?.close()
                        handleResolver(context.buildNewContext(new UsageFindingContext( this.usages)))
                    }
                });
                let detectorContext = context.getByType(DataClumpDetectorContext)!!
                for (let dataClumpKey of detectorContext.getDataClumpKeys()) {
                    let dc = detectorContext.getDataClumpTypeContext(dataClumpKey)
                    this.sendRequestsForDataClump(socket.writer,dc,context)


                }
                while(false){
                    console.log("Queue has "+this.balanceQueue.size)
                    let id=Array.from(this.balanceQueue)[0]
                    console.log("use id",id)
                    let request=this.counterDataClumpInfoMap.get(id)!.request
                    console.log(request)
                    socket.writer.write(request)
                    waitSync(1000)

                }
            });

        }



        getExecutableSteps(): PipeLineStepType[] {
            return [PipeLineStep.ReferenceFinding]
        }



    }


function wait(sec: number) {
    var waitTill = new Date(new Date().getTime() + sec * 1000);
    while (waitTill > new Date()) { }
}