import os
import json,random
class PathsEvaluator:
    def evaluate(self,paths:set)->float:
        return len(paths)
class MinFileSizeEvaluator:
    def evaluate(self,files:set)->float:
        lengthSum=0
        for file in files:
            lengthSum+=os.path.getsize("/home/compf/data/uni/master/sem4/github_projects/junit-pioneer/"+file)
        return lengthSum
with open("../data/dataClumpDetectorContext.json") as f:
    dc_data = json.load(f)[0]
with open("../data/usageFindingContext.json") as f:
    usage_data = json.load(f)
covered_files=set()



covered_ids=set()
data_clumps=[dc_data["data_clumps"][k] for k in dc_data["data_clumps"]]
MIN_DATA_CLUMP=3

by_name_type_key={}
by_name_type_key_affected_files={}
data_clumps_sorted=sorted(data_clumps,key=lambda x: len(x["data_clump_data"]),reverse=True)
for x in data_clumps_sorted:

    name_type_key=",".join(sorted([(x["data_clump_data"][k]["type"] + " "+x["data_clump_data"][k]["name"]) for  k  in x["data_clump_data"]]))
    if name_type_key not in by_name_type_key:
        by_name_type_key[name_type_key]=0
    by_name_type_key[name_type_key]+=1
    if name_type_key not in by_name_type_key_affected_files:
        by_name_type_key_affected_files[name_type_key]=set()
    by_name_type_key_affected_files[name_type_key].add(x["from_file_path"])
    by_name_type_key_affected_files[name_type_key].add(x["to_file_path"])

    #print()

LENGTH_FACTOR=100
OCCURENCE_FACTOR=1
AFFECTED_FILES_FACTOR=1
by_name_type_key_importance={x:by_name_type_key[x]*OCCURENCE_FACTOR+len(x.split(","))*LENGTH_FACTOR+len(by_name_type_key_affected_files[x])*AFFECTED_FILES_FACTOR for x in by_name_type_key}
by_name_key_details={x:{"length":len(x.split(",")),"occurence":by_name_type_key[x],"affected_files":len(by_name_type_key_affected_files[x])} for x in by_name_type_key}
for x in sorted(by_name_type_key_importance,key=lambda x: by_name_type_key_importance[x],reverse=False):
    print()
    print(x)
    print(by_name_type_key_importance[x])
    print(by_name_key_details[x])
    print()
exit(0)


by_name_type_key=sorted([(by_name_type_key[x],x) for x in by_name_type_key],reverse=True)
for x in by_name_type_key[:5]:
    print(x)
    for affected in by_name_type_key_affected_files[x[1]]:
        print(affected)
    print()
print("#########Second part#########")
exit(0)
for x in data_clumps:
    from_path=x["from_file_path"]
    to_path=x["to_file_path"]
    if from_path not in by_path:
        by_path[from_path]=0

    if to_path not in by_path:
        by_path[to_path]=0

    by_path[from_path]+=1
    by_path[to_path]+=1


    affected_file_count=len(set([from_path,to_path]))
    usage_paths=set([usg["filePath"].strip("/") for usg in usage_data[x["key"]]])
    affected_file_count+=len(usage_paths)
    if from_path not in by_affected_file_count:
        by_affected_file_count[from_path]=0
    if to_path not in by_affected_file_count:
        by_affected_file_count[to_path]=0
    by_affected_file_count[from_path]=max(affected_file_count,by_affected_file_count[from_path])
    by_affected_file_count[to_path]=max(affected_file_count,by_affected_file_count[to_path])
    if from_path not in by_affected_files:
        by_affected_files[from_path]=set()
    if to_path not in by_affected_files:
        by_affected_files[to_path]=set()
    by_affected_files[from_path].add(from_path)
    by_affected_files[to_path].add(to_path)
    for u in usage_paths:
        by_affected_files[from_path].add(u)
        by_affected_files[to_path].add(u)
scores=[(by_path[x]-by_affected_file_count[x]**2,x) for x in by_path]
scores =sorted(scores,reverse=True)
for s in scores:
    print(s)
    for a in by_affected_files[s[1]]:
        print(a)
    print("----")

