import json
urls=[]
with open("stuff/github_projects_result.json") as f:
    data=json.load(f)
for key in data:
    urls.append(key)

with open("stuff/urls.txt","w") as f:
    for url in urls:
        f.write(url+"\n")