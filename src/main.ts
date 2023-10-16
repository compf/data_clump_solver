import { Detector } from "./data-clumps-doctor/analyse/src"
import { Analyzer } from "./data-clumps-doctor/analyse/src/ignoreCoverage/Analyzer"
import {resolve} from "path"
console.log("hello world")
let analyser=new Analyzer("/home/compf/data/uni/master/sem4/argouml/src","src/data-clumps-doctor/analyse/src/ignoreCoverage/astGenerator/",
"hello1","/home/compf/data/uni/master/sem4/argouml/src","java",resolve("./temp"),null,null,"ArgoUML",1.0,true,null)
let result=analyser.analyse(null).then((x)=>{
    console.log("finnish")
})
