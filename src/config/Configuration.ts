type PipeLineStepConf={
    handler:string,
    args:any
}
export type Configuration={
    ProgrammingLanguageIdentifier:string,
    PipeLine:{
        CodeObtaining:PipeLineStepConf,
         FileFiltering:PipeLineStepConf,
         ASTGeneration:PipeLineStepConf,
         SilarityDetection:PipeLineStepConf,
         DataClumpDetection:PipeLineStepConf,
         DataClumpFiltering:PipeLineStepConf,
         NameFinding:PipeLineStepConf,
         ClassExtraction:PipeLineStepConf
         UsageFinding:PipeLineStepConf,
         Refactoring:PipeLineStepConf,
         Validation:PipeLineStepConf,
    }
    
}