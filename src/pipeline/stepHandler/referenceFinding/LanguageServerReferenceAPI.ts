import { ClassExtractionContext, DataClumpDetectorContext, DataClumpRefactoringContext, UsageFindingContext } from "../../../context/DataContext";
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
    counterDataClumpInfoMap: Map<number, { variableKey: string, variableName: string, usageType: UsageType,variableNames:string[] }> = new Map();
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

    sendMethodUsageAndDeclarationRequest(socket:Writable,dcKey:string,methodFile: string, methodName: string, context: DataClumpRefactoringContext, fileMap: Map<string, string>, line: number,variableNames:string[]) {
        let methodPos = this.getIdentifierPosition(methodFile, methodName, fileMap, context, line)

        let methodDefRequest: DefinitionParams = {

            textDocument: {
                uri: "file://" + resolve(context.getProjectPath(),methodFile)
            },
            position: {
                line: methodPos.startLine ,
                character: methodPos.startColumn
            }
        }
        let nextId=this.nextCounterValue();
        let request=this.api?.create_request_message(nextId,Methods.Definition,methodDefRequest)
        this.counterDataClumpInfoMap.set(nextId,
            {variableKey:dcKey,
                variableName:methodName,
                usageType:UsageType.MethodDeclared,
                variableNames:variableNames
            })
        socket.write(request)

        let methodUsageRequest:ReferenceParams={
            textDocument: {
                uri: "file://" + resolve(context.getProjectPath(),methodFile)
            },
            position: {
                line: methodPos.startLine ,
                character: methodPos.startColumn
            },
            context:{
                includeDeclaration:false
            }

        }
         nextId=this.nextCounterValue();
         request=this.api?.create_request_message(nextId,Methods.References,methodUsageRequest)
        this.counterDataClumpInfoMap.set(nextId,
            {variableKey:dcKey,
                variableName:methodName,
                usageType:UsageType.MethodUsed,
                variableNames:variableNames
            })
        socket.write(request)
    }
    sendFieldUsageAndDeclarationRequest(socket:Writable,dcKey:string,fieldFile: string, fieldName: string, context: DataClumpRefactoringContext, fileMap: Map<string, string>, line: number,variableNames:string[]) {
        let fieldPos = this.getIdentifierPosition(fieldFile, fieldName, fileMap, context, line)

        let fieldDefRequest: DefinitionParams = {

            textDocument: {
                uri: "file://" + resolve(context.getProjectPath(),fieldFile)
            },
            position: {
                line: fieldPos.startLine ,
                character: fieldPos.startColumn
            }
        }
        let nextId=this.nextCounterValue();
        let request=this.api?.create_request_message(nextId,Methods.Definition,fieldDefRequest)
        this.counterDataClumpInfoMap.set(nextId,
            {variableKey:dcKey,
                variableName:fieldName
                ,usageType:UsageType.VariableDeclared,
                variableNames:variableNames})
        socket.write(request)

        let fieldUsageRequest:ReferenceParams={
            textDocument: {
                uri: "file://" + resolve(context.getProjectPath(),fieldFile)
            },
            position: {
                line: fieldPos.startLine ,
                character: fieldPos.startColumn
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
                variableNames:[]
            }
                );
        
        (this.counterDataClumpInfoMap.get(nextId) as any).requestPosition=fieldPos
        socket.write(request)
    }
    sendRequestsForDataClump(socket:Writable,dataClump: DataClumpTypeContext, fileMap: Map<string, string>,context:DataClumpRefactoringContext){
            const isFromMethod = dataClump.from_method_name != null;
            const isToMethod = dataClump.to_method_name != null;
            if (isFromMethod) {
                let startLine=Object.values(dataClump.data_clump_data)[0].position.startLine-1
                this.sendMethodUsageAndDeclarationRequest(socket,dataClump.key!,dataClump.from_file_path, dataClump.from_method_name!!, context, fileMap, startLine,Object.values(dataClump.data_clump_data).map((it)=>it.name) )
            }
            if(isToMethod){
                let startLine=Object.values(dataClump.data_clump_data)[0].to_variable.position.startLine-1

                this.sendMethodUsageAndDeclarationRequest(socket,dataClump.key,dataClump.to_file_path, dataClump.to_method_name!!, context, fileMap, startLine,Object.values(dataClump.data_clump_data).map((it)=>it.to_variable.name))
            }
            for(let variableKey of Object.keys(dataClump.data_clump_data)){
                let variable=dataClump.data_clump_data[variableKey]!
                this.sendFieldUsageAndDeclarationRequest(socket,dataClump.key,dataClump.from_file_path,variable.name,context,fileMap,variable.position.startLine-1,Object.values(dataClump.data_clump_data).map((it)=>it.name))
                this.sendFieldUsageAndDeclarationRequest(socket,dataClump.key,dataClump.to_file_path,variable.name,context,fileMap,variable.to_variable.position.startLine-1,Object.values(dataClump.data_clump_data).map((it)=>it.to_variable.name))
            
            }
          
        }

    async handle(context: DataClumpRefactoringContext, params: any): Promise < DataClumpRefactoringContext > {
                let usages=new Map<string, VariableOrMethodUsage[]>();
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
                    if (!usages.has(info.variableKey)) {
                        usages.set(info.variableKey, [])
                    }

                    for (let result of data.result!) {
                        let usage={
                            symbolType: info.usageType,
                            range:{startLine:result.range.start.line,startColumn:result.range.start.character,endLine:result.range.end.line,endColumn:result.range.end.character},
                            filePath: result.uri.substring("file://".length).replace(context.getProjectPath(),""),
                            name: info.variableName,
                            extractedClassPath:classExtractionContext.getExtractedClassPath(info.variableKey)?.replace(context.getProjectPath(),""),
                            variableNames:info.variableNames
                        }
                        usages.get(info.variableKey)!.push(usage)

                    }
                    console.log("balance", this.balance)
                    if (this.balance == 0) {
                        handleResolver(context.buildNewContext(new UsageFindingContext(usages)))
                    }
                });
                console.log("hallo")
                let fileMap = new Map<string, string>();
                let detectorContext = context.getByType(DataClumpDetectorContext)!!
                for (let dataClumpKey of detectorContext.getDataClumpKeys()) {
                    let dc = detectorContext.getDataClumpTypeContext(dataClumpKey)
                    this.sendRequestsForDataClump(socket.writer,dc, fileMap,context)


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