import sys
import json
import os


input_dir=sys.argv[1]
stats={}
max_score=0
max_file=''
class RingBuffer:
    def __init__(self, size):
        self.size = size
        self.data = []
    def push(self, item):
        if len(self.data) == self.size:
            self.data.pop(0)
        self.data.append(item)
    def print(self):
        print(self.data)
class Metric:
    def evaluate(self, data):
        pass


class ChangedLinesMetric(Metric):
    def evaluate(self, data):
        refactorings = data['refactorings']
        lines=0
        for file in refactorings:
            for r in refactorings[file]:
                if "newContent" not in r:
                    continue
                diff=r["newContent"].split("\n")    
                lines+=len(diff)   
        return lines
    
class AffectedFilesMetric(Metric):
    def evaluate(self, data):
        refactorings = data['refactorings']
        return len(refactorings)
class ExtractedClassesMetric(Metric):
    def evaluate(self, data):
        if 'extractedClasses' not in data:
            return 0
        return len(data['extractedClasses'])
    
class FileSizeChangeMetric(Metric):
    def evaluate(self, data):
        refactorings = data['refactorings']
        lines=0
        old=0
        new=0
        for file in refactorings:
            for r in refactorings[file]:
                if "newContent" not in r:
                    continue
                old+=len(r["oldContent"])
                new+=len(r["newContent"])
        if old==0:
            return 0

        return new/old
    
DEBUG=False
MAX_SIZE=10
metrics=[ChangedLinesMetric(), AffectedFilesMetric(), ExtractedClassesMetric(),FileSizeChangeMetric()]
for m in metrics:
    max_score=0
    all_files=[]
    max_file=''
    count=0
    for p in os.listdir(input_dir):
        
        if not p.endswith(".txt") or not p.startswith("chat"):
            continue
        if os.path.isdir(os.path.join(input_dir, p)):
            continue
        count+=1
        if DEBUG:
            print("Checking", p)
        with open(os.path.join(input_dir, p)) as f:
            try:
                data = json.load(f)
                if "refactorings" not in data:
                    continue
                if "extractedClasses" not in data:
                    continue
            except:
                continue
            score=m.evaluate(data)
            if score>=max_score:
                max_score=score
               
                
                max_file=p
            all_files.append((score, p))
    print()
    print(count)
    print("Metric", m.__class__.__name__)
    print(max_file, max_score)
    all_files_sorted=sorted(all_files, reverse=True)[:MAX_SIZE]
    for f in all_files_sorted:
        print(f)
    print()