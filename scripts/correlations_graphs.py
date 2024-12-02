import matplotlib.pyplot as plt
import os,json

categories=["detect","detectSyn","filter","refactot"]


for c in   categories:
    base_path=f"evalDataResults/{c}/FunctionFilterMetric/raw"

    for p in os.listdir(base_path):
        resolved=os.path.join(base_path,p)
        out_path=resolved.replace("evalDataResults","evalDataFigures")
        os.makedirs(out_path,exist_ok=True)
        with open(resolved) as f:
            data=json.load(f)
            for k1 in  data:
                for k2 in data:
                    if k1!=k2:
                        if len(data[k1])!=len(data[k2]):
                            continue
                        plt.scatter(data[k1],data[k2])
                        plt.xlabel(k1)
                        plt.ylabel(k2)
                        plt.savefig(os.path.join(out_path,f"{k1}_{k2}.svg"))

                        plt.close()