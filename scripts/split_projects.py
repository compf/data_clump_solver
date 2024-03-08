import json
json_obj={

}
with open('../github_projects_results.json') as f:
    json_obj = json.load(f)

compileable_projects=[key for key in json_obj if json_obj[key]["compilingResult"]]
for k in compileable_projects:
    print(k)
print(len(compileable_projects))