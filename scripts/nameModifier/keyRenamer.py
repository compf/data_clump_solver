import json
PATH="/root/rocketmq_refactor/.data_clump_solver_data/dataClumpDetectorContext.json"
with open(PATH) as f:
    data=json.load(f)
    counter=0
    backup={
        "data_clumps":{},
        "report_summary":data["report_summary"]
    }
    for key in data["data_clumps"]:
        dc=data["data_clumps"][key]
        backup["data_clumps"][str(counter)]=dc
        dc["key"]=str(counter)
        counter+=1
with open(PATH,"w+") as f:
    json.dump(backup,f)