import * as fs from "fs";
import { data } from "./data"
import { detectAndRefactor, open, closed, fields_to_fields_data_clump, MAX_COUNTER_VALUE, nameSuggestion, parameters_to_parameters_data_clump, PR_Data, PR_Data_Entry, GenerializedCommentCategories, Disagree } from "./structures";
import { makeUnique, nop } from "../../../util/Utils";
import { createCompareObjects, EvalAnalyzer, EvalMetric, SubSetChecker } from "../base_analyzer";
import { Arrayified } from "../../base_eval";
import { dirname, resolve } from "path"
import { getRepoDataFromUrl } from "../../../util/vcs/VCS_Service";
import simpleGit, { SimpleGit } from "simple-git";
import { CloneObtainingStepHandler } from "../../../pipeline/stepHandler/codeObtaining/CloneObtainingStepHandler";
import { AutomaticValidationStepHandler } from "../../../pipeline/stepHandler/validation/AutomaticValidationStepHandler";
import { PipeLineStep } from "../../../pipeline/PipeLineStep";
import { DataClumpRefactoringContext } from "../../../context/DataContext";
import { concatenateResults, mean, MetricMapper } from "../utils";
let structures = require("./structures")


function hasCommentCategory(cat: string, d: PR_Data_Entry): boolean {
    let i = Object.keys(structures).indexOf(cat) + 1
    let b = d.generalComments.includes(i) || d.reviewComments.includes(i) ||
        d.generalComments.includes(-i) || d.reviewComments.includes(-i) ||
        (d.likertData != undefined &&
            d.likertData.some((it) => it.some((it) => it.comments != undefined
                && (it.keywords?.includes(i) || it.keywords?.includes(-i)))));
    return b;
}

function hasPositiveCommentCategory(cat: string, d: PR_Data_Entry): boolean {
    let i = Object.keys(structures).indexOf(cat) + 1
    let b = d.generalComments.includes(i) || d.reviewComments.includes(i) ||
        (d.likertData != undefined &&
            d.likertData.some((it) => it.some((it) => it.comments != undefined
                && it.keywords?.includes(i))));
    return b;
}

function hasNegativeCommentCategory(cat: string, d: PR_Data_Entry): boolean {
    let i = Object.keys(structures).indexOf(cat) + 1
    let b = d.generalComments.includes(-i) || d.reviewComments.includes(-i) ||
        (d.likertData != undefined &&
            d.likertData.some((it) => it.some((it) => it.comments != undefined
                && it.keywords?.includes(-i))));
    return b;
}




let metrics: MetricMapper = {}
let filters: { [key: string]: { (d: PR_Data_Entry): boolean; } } = {};
function init() {
    filters["all"] = () => true
    filters["PositiveComments=true"] = (d) => d.reviewComments.some((it) => it > 0) || d.generalComments.some((it) => it > 0)
    filters["PositiveComments=false"] = (d) => !(d.reviewComments.some((it) => it > 0) || d.generalComments.some((it) => it > 0))
    filters["meaningfulComments=true"] = (d) => d.reviewComments.length > 0 || d.generalComments.length > 0
    filters["meaningfulComments=false"] = (d) => !(d.reviewComments.length > 0 || d.generalComments.length > 0)
    let keys = Object.keys(structures).slice(0, MAX_COUNTER_VALUE - 1)
    for (let k of keys) {
        let k2 = k;
        filters[k] = (d) => hasCommentCategory(k2, d)
        filters[k + "+"] = (d) => hasPositiveCommentCategory(k2, d)
        filters[k + "-"] = (d) => hasNegativeCommentCategory(k2, d)
    }

    filters["merged=true"] = (d) => d.merged
    filters["merged=false"] = (d) => !d.merged
    filters["state=open"] = (d) => d.state == "open"
    filters["state=closed"] = (d) => d.state == "closed"
    filters["category=detectAndRefactor"] = (d) => d.category == detectAndRefactor
    filters["category=nameSuggestion"] = (d) => d.category == nameSuggestion
    filters["type=" + fields_to_fields_data_clump] = (d) => d.type == fields_to_fields_data_clump
    filters["type=" + parameters_to_parameters_data_clump] = (d) => d.type == parameters_to_parameters_data_clump








    for (let d of Object.values(data)) {

        (d as any).categorizedComments = []
        for (let c of d.generalComments) {
            c = Math.abs(c)
            for (let k of Object.keys(GenerializedCommentCategories)) {
                if (GenerializedCommentCategories[k].includes(c)) {
                    (d as any).categorizedComments!.push(Object.keys(GenerializedCommentCategories).indexOf(k))
                }
            }
            for (let c of d.reviewComments) {
                c = Math.abs(c)
                for (let k of Object.keys(GenerializedCommentCategories)) {
                    if (GenerializedCommentCategories[k].includes(c)) {
                        (d as any).categorizedComments!.push(Object.keys(GenerializedCommentCategories).indexOf(k))
                    }
                }
            }
        }


    }
    for (let k of Object.keys(GenerializedCommentCategories)) {
        let k2 = k;
        filters[k] = (d) => (d as any).categorizedComments!.includes(Object.keys(GenerializedCommentCategories).indexOf(k2))
    }
    for (let fKey of Object.keys(filters)) {
        let f = filters[fKey]
        metrics[fKey] = (instances) => instances.map((it) => f(it) ? 1 : 0)
    }
    metrics["size"] = (instances) => instances.map((it) => it.size)
    metrics["occurence"] = (instances) => instances.map((it) => Math.sqrt(it.occurence ?? 0))
    metrics["affected_files"] = (instances) => instances.map((it) => (it.affected_files ?? 0))

}
export function analyzeCommentData() {
    init()
    concatenateResults("PR", Object.values(data), filters, metrics)
}

function getTextRating(value: number, isNegativeTwoToTwo: boolean) {
    if (isNegativeTwoToTwo) {
        value += 2;
    }
    let ratings = ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
    let integerPart = Math.floor(value);
    let decimalPart = value - integerPart;
    let rating = ratings[integerPart]
    if (decimalPart < 0.3) {
        rating += "-"
    }
    else if (decimalPart > 0.7) {
        rating += "+"
    }
    return rating;

}
function likertData() {
    const numberQuestions = 6;;

    let likertZeroToFour = new Array(numberQuestions).fill(0)
    let likertNegativeTwoToTwo = new Array(numberQuestions).fill(0)
    let likertZeroToFourRaw= new Array(numberQuestions);
    for(let i=0;i<numberQuestions;i++){
        likertZeroToFourRaw[i]=[]
    }
    for (let d of Object.values(data)) {
        if (d.likertData) {

            for (let i = 0; i < d.likertData.length; i++) {
                console.log(d.likertData[i].length)
                for (let j = 0; j < d.likertData![i].length; j++) {
                    let val = d.likertData![i][j]
                    likertZeroToFour[j] += val.scale
                    likertZeroToFourRaw[j].push(val.scale)
                    likertNegativeTwoToTwo[j] += (val.scale - 2)
                }
            }
        }

    }
    for(let i=0; i< likertZeroToFourRaw.length;i++){
        console.log("[",i+1,"]")
        for(let j =0;j<likertZeroToFourRaw[i].length;j++){
            console.log(likertZeroToFourRaw[i][j])
        }
        console.log("####");
    }
    throw "test"
    const questions = [
        "Data clumps are a code smell that should be fixed.",
        "Using LLMs in software development can be helpful to improve code quality.",
        "The proposed refactoring maintains or improves the quality of the code.",
        "The proposed refactoring has  adequately identified and preserved the original functionality and intent of the code.",
        "The name of the new extracted class(es), fields and methods are well-chosen.",
        "The location of the extracted class(es) are well-chosen.",
        "For how long have you been contributing to this project?",
        "For how long have you been a developer in Java ? ",
        "Please input the URL of the GitHub project from where you got to this survey.",
    ]
    let withQuestionNullToFour = {}
    let withQuestionNegativeTwoToTwo = {}
    let withRatingNullToFour = {}
    let withRatingNegativeTwoToTwo = {}
    for (let i = 0; i < numberQuestions; i++) {
        likertZeroToFour[i] /= numberQuestions;
        likertNegativeTwoToTwo[i] /= numberQuestions;
        withQuestionNullToFour[questions[i]] = likertZeroToFour[i]
        withQuestionNegativeTwoToTwo[questions[i]] = likertNegativeTwoToTwo[i]
        withRatingNullToFour[questions[i]] = getTextRating(likertZeroToFour[i], false)
        withRatingNegativeTwoToTwo[questions[i]] = getTextRating(likertNegativeTwoToTwo[i], true)

    }
    let meanZeroToFour = mean(likertZeroToFour)
    let meanNegativeTwoToTwo = mean(likertNegativeTwoToTwo)

    let meanRatingNullToFour = getTextRating(meanZeroToFour as number, false)
    let meanRatingNegativeTwoToTwo = getTextRating(meanNegativeTwoToTwo as number, true)
    console.log("meanZeroToFour", meanZeroToFour)
    console.log("meanNegativeTwoToTwo", meanNegativeTwoToTwo)


    let resultObj = {
        likertZeroToFour: likertZeroToFour,
        likertNegativeTwoToTwo: likertNegativeTwoToTwo,
        meanZeroToFour: meanZeroToFour,
        meanNegativeTwoToTwo: meanNegativeTwoToTwo,
        withQuestionNullToFour: withQuestionNullToFour,
        withQuestionNegativeTwoToTwo: withQuestionNegativeTwoToTwo,
        withRatingNullToFour: withRatingNullToFour,
        withRatingNegativeTwoToTwo: withRatingNegativeTwoToTwo,
        meanRatingNullToFour: meanRatingNullToFour,
        meanRatingNegativeTwoToTwo: meanRatingNegativeTwoToTwo
    }
    fs.mkdirSync("evalDataResults/PR", { recursive: true })
    fs.writeFileSync("evalDataResults/PR/likert.json", JSON.stringify({
        resultObj: resultObj
    }, undefined, 2))


}
async function getDataclumpRefactoringCommit(git: SimpleGit): Promise<string> {
    const data_clump_filter = (it) => it.includes("refactor") && it.includes("data") && it.includes("clump") && !it.includes("merge") && !it.includes("Merge")
    let branches = await git.branch()
    let data_clump_branch = branches.all.filter((it) => data_clump_filter(it))[0]
    let e = await git.checkout(data_clump_branch)

    let log = await git.log()
    let data_clump_commit = log.all.filter((it) => data_clump_filter(it.message))

    if (data_clump_commit.length > 0) {
        return data_clump_commit[0].hash
    }
    else {
        console.log("could not find data clump", branches.all, log.all)
        throw "could not find data clump"
    }
}
let validAuthors = ["tschoemaker", "compf"]
async function getErrorCommit(git: SimpleGit, repoName: string): Promise<string[] | null> {
    let branches = await git.branch()
    let errorBranches = branches.all.filter((it) => it.includes("with") && it.includes("error"))
    if (errorBranches.length == 0) {

        return null;

    }
    let commits: string[] = []
    for (let b of errorBranches) {
        let c = await git.revparse(b)
        let data = await git.show(c)
        if (!validAuthors.some((it) => data.includes(it))) {
            console.log("skipping", c)
            console.log(data)
            console.log("skipping", c)
            fs.writeFileSync("stuff/reposWithNoError/" + repoName, data)
        }
        commits.push(c)
    }
    return commits
    console.log(branches.all)
    console.log()
}
async function validate(context, DataClumpRefactoringContext, url: string, errorCommits: string[], dataClumpCommit: string, git: SimpleGit) {
    let results = {}
    if (fs.existsSync("stuff/pr_errors.json")) {
        results = JSON.parse(fs.readFileSync("stuff/pr_errors.json").toString())
    }
    if (url in results) {
        return
    }
    results[url] = []
    let validator = new AutomaticValidationStepHandler({ skipTests: true })
    for (let c of errorCommits ?? []) {
        await git.checkout(c)
        let validationResult = await validator.validate(context);
        results[url].push({
            commit: c,
            validationResult: validationResult
        });
        fs.writeFileSync("stuff/pr_errors.json", JSON.stringify(results, undefined, 2))
        console.log(validationResult.errors)

    }

}
async function gitDiffInfo(context, DataClumpRefactoringContext, url: string, errorCommits: string[], dataClumpCommit: string, git: SimpleGit) {
    let results = {}
    if (fs.existsSync("stuff/pr_diff.json")) {
        results = JSON.parse(fs.readFileSync("stuff/pr_diff.json").toString())
    }
    if (url in results) {
        return
    }
    results[url] = []
    for (let c of errorCommits ?? []) {
        let diff = await git.diffSummary([c, dataClumpCommit])
        results[url].push({
            commit: c,
            diff: diff
        })


    }
    fs.writeFileSync("stuff/pr_diff.json", JSON.stringify(results, undefined, 2))

}
function shallIgnore(url: string) {
    let diffResults = JSON.parse(fs.readFileSync("stuff/pr_diff.json").toString())
    let errorResults = JSON.parse(fs.readFileSync("stuff/pr_errors.json").toString())
    return url in diffResults && url in errorResults
}
export async function analyzePRData() {
    let results = {}
    for (let url of Object.keys(data)) {
        if (shallIgnore(url)) {
            continue
        }

        results[url] = []
        let repoData = getRepoDataFromUrl(url)
        let changedUrl = "https://www.github.com/compf/" + repoData.repo
        let retriever = new CloneObtainingStepHandler({ url: changedUrl, alwaysClone: false })
        let context = await retriever.handle(PipeLineStep.CodeObtaining, new DataClumpRefactoringContext(), null)
        let git = simpleGit(context.getProjectPath())
        let errorCommits = await getErrorCommit(git, repoData.repo) ?? []
        let dataClumpCommit = await getDataclumpRefactoringCommit(git)
        console.log(url)
        results[url] = {
            errorData: await validate(context, DataClumpRefactoringContext, url, errorCommits, dataClumpCommit, git),
            diffData: await gitDiffInfo(context, DataClumpRefactoringContext, url, errorCommits, dataClumpCommit, git)
        }

        console.log(url)
        console.log("error", errorCommits)
        console.log("data clump", dataClumpCommit)


        fs.rmdirSync(context.getProjectPath(), { recursive: true })


    }
}

function textualFeedback() {
    fs.mkdirSync("evalDataResults/PR/textual", { recursive: true })
   
    for (let f in filters) {
         let text = ""
        for (let d of Object.values(data)) {
            if (!filters[f](d) || !f.includes("=")) {
                continue
            }
            for (let r1 of d.generalComments) {
                let key = Object.keys(structures)[Math.abs(r1) - 1]
                text += key + "\n"


            }
            for (let r1 of d.reviewComments) {

                let key = Object.keys(structures)[Math.abs(r1) - 1]
                text += key + "\n"


            }
            if (d.likertData) {
                for (let l1 of d.likertData!) {
                    for (let l2 of l1) {
                        if (l2.keywords) {
                            for (let k of l2.keywords) {
                                let key = Object.keys(structures)[Math.abs(k) - 1]
                                text += key + "\n"

                            }
                        }
                    }
                }
            }
            fs.writeFileSync("evalDataResults/PR/textual/" + f + ",txt", text)
        }
    }
}
if (require.main === module) {
    init()
    likertData()
    //analyzeCommentData()
    //analyzePRData()
    //loadData()
    //analyzeCommentData()
}

