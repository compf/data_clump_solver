import sys
import json
import os


input_dir=sys.argv[1]
stats={}
max_score=0
max_file=''
for p in os.listdir(input_dir):

    print(p)
    with open(os.path.join(input_dir, p)) as f:
        data = json.load(f)
        if "extractedClasses" not in data:
            continue
        refactorings = data['refactorings']
        affected_files=len(refactorings)
        lines=0
        for file in refactorings:
            for r in refactorings[file]:
                diff=r["newContent"].split("\n")    
                lines+=len(diff)   
        score=affected_files+lines
        if score>max_score:
            max_score=score
            max_file=p
print()
print(max_file, max_score)