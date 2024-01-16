import os,json,time
import shutil
from datetime import datetime
base_path="("""
for tuple in os.walk("llm_results"):
    if len(tuple[1])==0 and len(tuple[2])==0:
        if True:
            print("delete",tuple[0])
            shutil.rmtree(tuple[0])
        print(tuple[0])
        
   