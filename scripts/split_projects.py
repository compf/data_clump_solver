import json
def does_compile(project):
    result=project["compilingResult"]
    if "more" in project:
        more=project["more"]
        if "ignore" in more:
            result=False
        if "stillCompiles" in more:
            result=True
    return result
with open('../github_projects_results.json') as f:
    results = json.load(f)
with open('../github_projects_structured.json') as f:
    structured = json.load(f)

for s in structured:
    if s["url"] in results:
        results[s["url"]]["more"]=s

compileable_projects=[(key,results[key]) for key in results if does_compile(results[key])]

modi={
    "name suggestion":[],
    "detection only":[],
    "detection and refactoring":[],
    "refactoring only":[]
}
modi_keys=[k for k in modi]
sorted_by_lines=sorted(compileable_projects,key=lambda x: x[1]["lines"]["java"]["code"],reverse=True)
counter=0
for key,value in sorted_by_lines:
    modi[modi_keys[counter*4//len(sorted_by_lines)]].append((key))
    print(key,value["lines"]["java"]["code"]//1000*1000)
    counter+=1
print(len(compileable_projects))
for k in modi:
    print(k,len(modi[k]))
    print()