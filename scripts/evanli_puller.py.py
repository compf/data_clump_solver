import requests
import csv
import datetime
import random
import time
all_found=set()
def load(year,month,day):
    content=requests.get(f"https://raw.githubusercontent.com/EvanLi/Github-Ranking/master/Data/github-ranking-{year}-{month:02d}-{day:02d}.csv")
    splitted=content.content.decode().split("\n")
    for line in splitted:
        line=line.split(",")
        if len(line)<=1:
            continue
        if line[1]=="Java" or line[5]=="Java":
            all_found.add(line[6])
            with open("stuff/github_urls_scrape","w+") as f:
                f.write("\n".join(all_found))
            print(line)
        

years=[2024,2023]
months=range(1,13)
days=range(1,32)
while True:
    y=random.randint(0,len(years)-1)
    m=random.randint(0,len(months)-1)
    d=random.randint(0,len(days)-1)

    y=years[y]
    m=months[m]
    d=days[d]
    try:
        dt=datetime.date(y,m,d)
        load(y,m,d)
    except:
        pass
    time.sleep(5)
    

    
