import json, sys
args=sys.argv[1:]
changes_path=args[1]
context_path=args[0]
if len(args)>2:
    out_path=args[2]
else:
    out_path=context_path
def print_return(x):
    print(x)
    return x
with open(args[0]) as f:
    data=json.load(f)

with open(args[1]) as f:
    changes=json.load(f)
for key in data["data_clumps"]:
    dc=data["data_clumps"][key]
    from_path=dc["from_file_path"]
    to_path=dc["to_file_path"]
    applicable=[x for x in changes["changes"] if x["path"]==from_path or x["path"]==to_path ]
    for change in applicable:
        for dcDataKey in dc["data_clump_data"]:
            dcData=dc["data_clump_data"][dcDataKey]
            dcDataAttribute="name"
            changeOldAttribute="oldName"
            changeNewAttribute="newName"
            if not "oldName" in change:
                dcDataAttribute="type"
                changeOldAttribute="oldType"
                changeNewAttribute="newType"

            if change[changeOldAttribute]==dcData[dcDataAttribute] and  from_path==change["path"] and change["line"]==dcData["position"]["startLine"]:
                print("change from", dcData)
                dcData[dcDataAttribute]=change[changeNewAttribute]
               
                print()
            elif change[changeOldAttribute]==dcData["to_variable"][dcDataAttribute] and  to_path==change["path"] and change["line"]==dcData["to_variable"]["position"]["startLine"]:
                print("change to",dcData)
                dcData["to_variable"][dcDataAttribute]=change[changeNewAttribute]
                dcDataKey=dcData["to_variable"]["key"]
            else:
               print(dcData,change)
               print( change[changeOldAttribute],dcData[dcDataAttribute] )
               print(  from_path,change["path"])
               print( change["line"],dcData["position"]["startLine"])
               print("#####")
               print(change[changeOldAttribute],dcData["to_variable"][dcDataAttribute])
               print(  to_path,change["path"] )
               print(change["line"],dcData["to_variable"]["position"]["startLine"])
               print("::::")
               print()
               pass
                
                
with open(out_path,"w+") as f:
    pass
    json.dump(data,f)
