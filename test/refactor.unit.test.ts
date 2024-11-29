
import fs from "fs";
import ts from "typescript";
import { ModifiedFilesProposal, parse_piecewise_output, parse_piecewise_output_from_file, StubOutputHandler } from "../src/pipeline/stepHandler/languageModelSpecific/ModelToContextHandlers";
import { ChatMessage } from "../src/util/languageModel/AbstractLanguageModel";
import { CodeObtainingContext } from "../src/context/DataContext";
import { resolve } from "path";
beforeAll(() => {
});


const correctRefactoring={
    refactorings:{
        "MathStuff.java":[
            {
                fromLine:3,
                toLine:5,
               oldContent:`    private boolean sign;
    private double mantissa;
    private int exponent;`,
    newContent:"   FloatingPointData floatingPointData;"
            },

            {
                fromLine:9,
                toLine:9,
                oldContent:"        return (sign ? 1 : -1) * mantissa * Math.pow(2, exponent);",
                newContent:"        return (floatingPointData.getSign() ? 1 : -1)*\n                floatingPointData.getMantissa() * Math.pow(2,\n                floatingPointData.getExponent());"
            },

            {
                fromLine:5,
                toLine:6,
                oldContent:"    public void printLength(int x, int y, int z) {\n        System.out.println(Math.sqrt(x * x + y * y + z * z));",
                newContent:"    public void printLength(Point pt) {\n        System.out.println(Math.sqrt(pt.x * pt.x + pt.y * pt.y + pt.z * pt.z));"

            }
        ]

        
    },
    extractedClasses:{
        "FloatingPointData":""
    }
}
const correctRefactoringSerialized=JSON.stringify(correctRefactoring)

function incrementFromLineNUmber(obj:any, by:number){
    for(let o of Object.values(obj["refactorings"])){
        for(let ref of (o as Array<any>)){
            ref.fromLine+=by;
            ref.toLine+=by;
        }
    }
}



test("Test piecewise refactor", async () => {
    
    let context=new CodeObtainingContext(resolve("testData"));
    
    let handler=new StubOutputHandler();
    handler.apply=false
    

    let testCases=[
        {
            modifyFunction:(o)=>{incrementFromLineNUmber(o,0)},
            doesfail:false,
            index:0
        },
        {
            modifyFunction:(o)=>{incrementFromLineNUmber(o,1)},
            doesfail:false,
            index:1
        },
        {
            modifyFunction:(o)=>{incrementFromLineNUmber(o,-1)},
            doesfail:false,
            index:2
        },
        {
            modifyFunction:(o)=>{incrementFromLineNUmber(o,2)},
            doesfail:false,
            index:3
        },
        {
            modifyFunction:(o)=>{incrementFromLineNUmber(o,-2)},
            doesfail:false,
            index:4
        },
        {
            modifyFunction:(o)=>{incrementFromLineNUmber(o,3)},
            doesfail:false,
            index:5
        },
        {
            modifyFunction:(o)=>{incrementFromLineNUmber(o,-3)},
            doesfail:false,
            index:6
        }
       
    ]
    let counter=0
    let mathStuffRefactored=fs.readFileSync(resolve("testData/MathStuffRefactored.java")).toString();
    mathStuffRefactored=mathStuffRefactored.split("\n").map((x)=>x.trim()).join("\n");
    const expected=mathStuffRefactored.split("\n").filter((x)=>x.trim()!="");
    for(let testCase of testCases){
        let refactoring=JSON.parse(correctRefactoringSerialized);
        testCase.modifyFunction(refactoring);
        parse_piecewise_output(refactoring,[],context,handler);
        let proposal=handler.proposal as ModifiedFilesProposal;
        let refactoringOutput=proposal.getModifiedFiles()[resolve("testData/MathStuff.java")].split("\n").map((x)=>x.trim()).join("\n");
        if(testCase.doesfail){
            console.log("test case", counter)
            parse_piecewise_output(refactoring,[],context,handler);
            expect(refactoringOutput).not.toBe(mathStuffRefactored)
        }
        else{
            let outputSplitted=refactoringOutput.split("\n").filter((x)=>x.trim()!="");
            expect(outputSplitted).toEqual(expected)

        }
        counter++;
       
    }

    
});
function testRefactoring(oldLines:string[], newLines:string[], checkIndent:boolean,oldLinesReal?:string[], fail?:boolean){
    let refactorInstruction={
        refactorings:{
            "":[
                {
                    fromLine:1,
                    toLine:3,
                    oldContent:oldLines.join("\n"),
                    newContent:newLines.join("\n")
                }
            ]
        }
        
    }
    let result=parse_piecewise_output_from_file(refactorInstruction.refactorings[""],(oldLinesReal??oldLines).join("\n"));
    if(checkIndent){
        let r=expect(result);
        if(fail){
            expect(result).not.toBe(newLines.join("\n"))
        }
        else{
            expect(result).toBe(newLines.join("\n"))

        }
    }
    else{
        if(fail){
            expect(result.trim()).not.toBe(newLines.map((it)=>it.trim()).join("\n"));

        }
        else{
        expect(result.trim()).toBe(newLines.map((it)=>it.trim()).join("\n"));

        }
    }
}
function indent(lines:string[], indentsBefore:string[], indentsAfter?:string[]):string[]{
    let result:string[]=[]
    for(let i=0;i<lines.length;i++){
        let r=indentsBefore[i]+lines[i];
        if(indentsAfter){
            r+=indentsAfter[i]
        }
        result.push(r)

    }
    return result;
}
const threeLines=[
    "int x1;",
    "int x2;",
    "int x3; 4"
];
const oneLine=["int x0;"]
test("Test piecewise refactor, edge cases", async () => {

    
    testRefactoring(oneLine,threeLines,false);
    testRefactoring(oneLine,threeLines,false,["","int a","int b","int c"],true)
    testRefactoring(threeLines,oneLine,false)
    testRefactoring(threeLines,oneLine,true)

    testRefactoring(indent(threeLines,["  ",""," \t"]),oneLine,false,indent(threeLines,["  ","\t\t", "       "  ]))
   
});

test("test invalid instructions",()=>{
    const noInstructions={}
    let output=parse_piecewise_output_from_file([],threeLines.join("\n"))

    expect(output).toBe(threeLines.join("\n"))
})

