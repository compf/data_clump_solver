import json

data_restructured = {}
with open("github_data/github_projects_results copy.json") as f:
    data = json.load(f)


def store_stats(data_clumps):
    global data_restructured
    affected_files = data_clumps["AffectedFilesMetric"]
    data_clump_size = data_clumps["DataClumpSizeMetric"]
    size_key = "Size " + str(data_clump_size)
    affected_files_key = "Files " + str(affected_files)
    occurence_key = "Occurence " + (
        ">2" if data_clumps["DataClumpOccurenceMetric"] > 2 else "2"
    )
    if size_key not in data_restructured:
        data_restructured[size_key] = {}
        data_restructured[size_key][affected_files_key] = {}
    if affected_files_key not in data_restructured[size_key]:
        data_restructured[size_key][affected_files_key] = {}
    if occurence_key not in data_restructured[size_key][affected_files_key]:
        data_restructured[size_key][affected_files_key][occurence_key]=[]

    if affected_files_key not in data_restructured:
        data_restructured[affected_files_key] = {}
    if size_key not in data_restructured[affected_files_key]:
        data_restructured[affected_files_key][size_key] = {}
    if occurence_key not in data_restructured[affected_files_key][size_key]:
        data_restructured[affected_files_key][size_key][occurence_key]=[]
    value = {
        "AffectedFilesMetric": affected_files,
        "DataClumpSizeMetric": data_clump_size,
        "url": url,
        "DataClumpOccurenceMetric": data_clumps["DataClumpOccurenceMetric"],
        "Key": data_clumps["nameType"].split(";"),
    }
    # for k1 in data_restructured:
    # for k2 in data_restructured[k1]:
    # print(k1,k2,data_restructured[k1][k2])

    # print(size_key,affected_files_key,data_restructured)
    data_restructured[size_key][affected_files_key][occurence_key].append(value)
    data_restructured[affected_files_key][size_key][occurence_key].append(value)


for url in data:
    data_clumps = data[url]["dataClumps"]
    for weights in data_clumps:
        print(len(data_clumps[weights]))
        print("HELLO", data_clumps[weights])
        print()
        if "amount_classes_or_interfaces_with_data_clumps" in data_clumps[weights]:
            continue

        if "DataClumpSizeMetric" not in data_clumps[weights]:
            for dc in data_clumps[weights]:
                store_stats(data_clumps[weights][dc])
        else:
            store_stats(data_clumps[weights])

with open("github_data/github_projects_results_restructured.json", "w+") as f:
    json.dump(data_restructured, f, indent=4)
