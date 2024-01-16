import os,json,time
import shutil
from datetime import datetime
base_path="("""
for tuple in os.walk("llm_results"):
    for file in tuple[2]:
        if file.endswith("metadata.json"):
            
            full_path = os.path.join(tuple[0], file)
            print(full_path)
            with open(full_path) as f:
                s=f.read()
                print(s)
                data = json.loads(s)
              
                tm=datetime.fromtimestamp(data["time"]/1000)
                if tm.day<16 and "AllFilesHandler" not in full_path:
                    print(full_path)
                    shutil.rmtree(tuple[0])
                
             