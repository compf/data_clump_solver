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
data_clumps_sorted=sorted(data_clumps,key=lambda x: len(x["data_clump_data"]),reverse=True)
for x in data_clumps_sorted[:5]:
    print(len(x["data_clump_data"]))
    print(len(x["data_clump_data"]))
covered_files.add(x["from_file_path"])
covered_files.add(x["to_file_path"])
covered_ids.add(x["key"])
for usg in usage_data[x["key"]]:
    if usg["filePath"].startswith("/"):
        usg["filePath"]=usg["filePath"][1:]
    covered_files.add(usg["filePath"])
    covered_ids.add(usg["originKey"])
curr_min=2**31
curr_min_paths=set()
min_data_clumps=[]
evaluator=PathsEvaluator()

while True:
    curr_data_clumps=set()
    paths=set()
    usages=set()
    while len(curr_data_clumps)<MIN_DATA_CLUMP:
        index=random.randint(0,len(data_clumps)-1)
        curr_data_clump=data_clumps[index]
        if curr_data_clump["key"] in curr_data_clumps:
            continue
        for usg in usage_data[curr_data_clump["key"]]:
            if usg["filePath"].startswith("/"):
                usg["filePath"]=usg["filePath"][1:]
            usages.add(usg["filePath"])
            paths.add(usg["filePath"])
        curr_data_clumps.add(data_clumps[index]["key"])
        paths.add(data_clumps[index]["from_file_path"])
        paths.add(data_clumps[index]["to_file_path"])
        score=evaluator.evaluate(paths)
        #usages=usages-paths
    if score<curr_min and len(paths)>4 and len(usages)>1:
        curr_min=score
        curr_min_paths=paths
        min_data_clumps=[dc_data["data_clumps"][k] for k in curr_data_clumps]
        print(score)
        print()
        print(usages)
        for x in min_data_clumps:
            print(x["key"])
            print(x["from_method_name"])
            print(x["to_method_name"])

        print()
        print()
        with open("../stuff/min_data_clumps.json","w+") as f:
            with open("../data/dataClumpDetectorContext.json") as f2:
                dc_data2 = json.load(f2)
                dc_data2[0]["data_clumps"]={}
                for x in min_data_clumps:
                    dc_data2[0]["data_clumps"][x["key"]]=x
            json.dump(dc_data2,f)



