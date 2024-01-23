import { ASTBuildingContext, ClassExtractionContext, DataClumpDetectorContext, DataClumpRefactoringContext, UsageFindingContext } from "../../../context/DataContext";
import { PipeLineStep, PipeLineStepType } from "../../PipeLineStep";
import { AbstractStepHandler } from "../AbstractStepHandler";
import { Readable, Writable } from "stream"
import { ResponseMessage } from "../../../util/languageServer/TypeDefinitions";
import { DefinitionParams, InitializeParams, ReferenceParams } from "ts-lsp-client";
import { resolve,relative } from "path"
import { MyCapabilities } from "../../../util/languageServer/capabilities";
import { readFileSync } from "fs"
import { LanguageServerAPI, Methods } from "../../../util/languageServer/LanguageServerAPI";
import { UsageType, VariableOrMethodUsage } from "../../../context/VariableOrMethodUsage";
import { registerFromName, resolveFromName } from "../../../config/Configuration";
import { DataClumpTypeContext, Position } from "data-clumps-type-context";

type LanguageServerReferenceAPIParams = {
    apiName: string,
    apiArgs: any
}
export class LanguageServerReferenceAPI extends AbstractStepHandler {
    api: LanguageServerAPI | null = null;
    apiArgs: LanguageServerReferenceAPIParams
    globalCounter = 3
    balance = 0;
    visitedMethods: Set<string> = new Set();
    counterDataClumpInfoMap: Map<number, { variableKey: string, variableName: string, usageType: UsageType,variableNames:string[],originKey:string,isParameter:boolean }> = new Map();
    constructor(args: LanguageServerReferenceAPIParams) {
        super();
        registerFromName(args.apiName, "LanguageServerAPI", args.apiArgs)
        this.apiArgs = args;
    }
    nextCounterValue(): number {
        this.balance++;
        return this.globalCounter++;
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
        console.log(wholeFile)
        console.log(startLine)
        let line = wholeFile[startLine]
        let character = line.indexOf(identifier);
        return { startLine: startLine, startColumn: character, endLine: startLine, endColumn: character + identifier.length };
    }

    sendMethodUsageAndDeclarationRequest(socket:Writable,dcKey:string,methodFile: string, methodName: string, context: DataClumpRefactoringContext,  line: number,variableNames:string[],methodKey:string) {
        let createdClassPath=context.getByType(ClassExtractionContext)!!.getExtractedClassPath(dcKey).replace(context.getProjectPath(),"")
        console.log("createdClassPath",createdClassPath,context.getProjectPath(),dcKey)
        this.loadMethodDeclarations(socket,methodFile,methodName,context,dcKey,methodKey,variableNames,createdClassPath)
      
       
    }
    loadMethodDeclarations(socket:Writable ,methodFile: string, methodName: string, context: DataClumpRefactoringContext, dcKey: string, methodKey: string, variableNames: string[],extractedClassPath:string) {
       let astContext=context.getByType(ASTBuildingContext)!;
       let originalClass=astContext.getByPath(methodFile)
       let fileQueue=[methodFile]
       let visited=new Set<string>()
       do{
        console.log(astContext)
        let currPath=fileQueue.pop()!!
        if(visited.has(currPath))continue;
        visited.add(currPath)
        console.log("currPath",currPath)

        let myClass=astContext.getByPath(currPath)
        let method=Object.keys(myClass.methods).map((it)=>myClass.methods[it]).find((it)=>it.name==methodName && it.parameters.map((it)=>it.type +" "+it.name).join(",")==originalClass.methods[methodKey].parameters.map((it)=>it.type +" "+it.name).join(","))
        console.log("method",method,methodKey)
        if(method==undefined){
            continue;
        }
        
        if(!this.usages.has(dcKey)){
            this.usages.set(dcKey,[])
        }
        this.usages.get(dcKey)!.push({
            symbolType:UsageType.MethodDeclared,
            range:{startLine:method.position.startLine-1,startColumn:method.position.startColumn,endLine:method.position.endLine-1,endColumn:method.position.endColumn},
            filePath:currPath,
            name:methodName,
            extractedClassPath:extractedClassPath,
            variableNames:variableNames,
            originKey:methodKey,
            isParameter:false
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
             this.counterDataClumpInfoMap.set(nextId,
                {variableKey:dcKey,
                    variableName:paramName,
                    usageType:UsageType.VariableUsed,
                    variableNames:[],
                    originKey:methodKey,isParameter:true

                }
            );
             let request=this.api?.create_request_message(nextId,Methods.References,requestParam)
             socket.write(request)
            
        }
        
        let extending=astContext.getExtendingOrImplementingClassKeys(methodFile)
        for(let cls of extending){
            console.log("extending",cls)
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
        console.log("cuurr",methodName)
         let nextId=this.nextCounterValue();
         this.counterDataClumpInfoMap.set(nextId,
            {variableKey:dcKey,
                variableName:methodName,
                usageType:UsageType.MethodUsed,
                variableNames:variableNames,
                originKey:methodKey,isParameter:false

            }
        );
         let request=this.api?.create_request_message(nextId,Methods.References,methodUsedReferenceParams)
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
                    originKey:fieldKey,isParameter:isParameter
                })
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
                originKey:fieldKey,isParameter:isParameter

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
                console.log("AUTO",variable.name,variable.to_variable.name,dataClump.from_file_path,dataClump.to_file_path)
                this.sendVariableUsageAndDeclarationRequest(socket,dataClump.key,dataClump.from_file_path,variable.name,context,variable.position,Object.values(dataClump.data_clump_data).map((it)=>it.name),variable.key,isFromMethod)
                this.sendVariableUsageAndDeclarationRequest(socket,dataClump.key,dataClump.to_file_path,variable.to_variable.name,context,variable.to_variable.position,Object.values(dataClump.data_clump_data).map((it)=>it.to_variable.name),variable.to_variable.key,isToMethod)
            
            }
          
        }
    private usages=new Map<string, VariableOrMethodUsage[]>();

    async handle(context: DataClumpRefactoringContext, params: any): Promise < DataClumpRefactoringContext > {
                if(this.api == null){
                this.api = resolveFromName("LanguageServerAPI") as LanguageServerAPI;
            }
            let dcContext=context.getByType(DataClumpDetectorContext)!!
            let classExtractionContext=context.getByType(ClassExtractionContext)!!
            return await new Promise<DataClumpRefactoringContext>(async handleResolver => {
                const socket = await this.api!!.init(context.getProjectPath(), (data) => {
                    console.log("begin")
                    console.log(JSON.stringify(data))
                    let info = this.counterDataClumpInfoMap.get(data.id)!
                   
                    if (info == undefined) return;
                    let combined=Object.assign(info,data,)
                    console.log(JSON.stringify(combined,null,2))
                    this.balance--
                    if (!this.usages.has(info.variableKey)) {
                        this.usages.set(info.variableKey, [])
                    }

                    for (let result of data.result!) {
                        let usage={
                            symbolType: info.usageType,
                            range:{startLine:result.range.start.line,startColumn:result.range.start.character,endLine:result.range.end.line,endColumn:result.range.end.character},
                            filePath: result.uri.substring("file://".length).replace(context.getProjectPath(),""),
                            name: info.variableName,
                            extractedClassPath:classExtractionContext.getExtractedClassPath(info.variableKey)?.replace(context.getProjectPath(),""),
                            variableNames:info.variableNames,
                            originKey:info.originKey,
                            isParameter:info.isParameter
                        }
                        this.usages.get(info.variableKey)!.push(usage)

                    }
                    console.log("balance", this.balance)
                    if (this.balance == 0) {
                        for(let usg of  this.usages){
                       
                            this.usages.set(usg[0], this.usages.get(usg[0])!.sort(function(a,b){
                                console.log("sort",a,b)
                                return a.symbolType-b.symbolType
                            }));
                        }
                        handleResolver(context.buildNewContext(new UsageFindingContext( this.usages)))
                    }
                });
                console.log("hallo")
                let detectorContext = context.getByType(DataClumpDetectorContext)!!
                for (let dataClumpKey of detectorContext.getDataClumpKeys()) {
                    let dc = detectorContext.getDataClumpTypeContext(dataClumpKey)
                    this.sendRequestsForDataClump(socket.writer,dc,context)


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