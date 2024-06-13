import json 
import matplotlib.pyplot as plt

def meth1():
    data_simplified={}
    with open("stuff/github_pulls") as f:
        data=json.load(f)
    categories=[
    "detectAndRefactor",
    "detectAndRefactor",
    "detectAndRefactor",
    "nameSuggestion",
    "nameSuggestion",
    "nameSuggestion",
    "nameSuggestion",
    "detectAndRefactor",
    "detectAndRefactor",
    "detectAndRefactor",
    "detectAndRefactor",
    "detectAndRefactor",
    "nameSuggestion",
    "nameSuggestion",
    "nameSuggestion",
    "nameSuggestion",
    "detectAndRefactor",
    "nameSuggestion",
    "detectAndRefactor",
    "detectAndRefactor",
    "filterManual",
    "filterManual",
    "filterSnippet",
    "filterSnippet",
    "filterSnippet",
    "filterSnippet",
    "filterSnippet",
    "filterSnippet",

    ]
    index=0
    no_comments=0

    for url in data:
        data_simplified[url]={}
        print(url)
        counter=0
        comments=[]

        for comment in data[url]["prComments"]:
            if comment["user"]["login"]=="CLAassistant" or comment["user"]["type"]=="Bot" or "bot" in comment["user"]["login"] :
                continue
            comments.append(comment["body"])
        for comment in data[url]["prReviewComments"]:
            comments.append(comment["body"])
        if len(comments)==0:
            no_comments+=1
        data_simplified[url]["comments"]=comments
        data_simplified[url]["category"]=categories[index]
        index+=1
        #print(len(data[url]["prComments"]))
       # print(len(data[url]["prReviewComments"]))



    print(100-100*no_comments/index)
    exit(0)
    with open("stuff/github_simplified.json","w+") as f:
        json.dump(data_simplified,f)

def meth2():
     with open("stuff/github_simplified copy.json") as f:
        data=json.load(f)
        comments=set()
        by_category=dict()
        comment_count=dict()
        counter=0
        merged=0
        merged_by_cat=dict()
        for url in data:
            counter+=1
            
            category=data[url]["category"]
            if category not in by_category:
                by_category[category]=dict()
                merged_by_cat[category]=0
            if "merged" in data[url] and data[url]["merged"]:
                merged+=1
                merged_by_cat[category]+=1
            for c in data[url]["comments"]:
                if c not in comment_count:
                    comment_count[c]=0
                if c not in by_category[category]:
                    by_category[category][c]=0
                comment_count[c]+=1
                comments.add(c)
                by_category[category][c]+=1
        for c in comments:
            print(c,comment_count[c])

        for cat in by_category:
            print()#
            print("##",cat,"##")
            for c in by_category[cat]:
                print(c,by_category[cat][c])
            print("###")


            plt.figure()
            wedges=[ by_category[cat][x] for x in by_category[cat]]
            labels=by_category[cat].keys()
            plt.pie(wedges, labels=labels, autopct='%1.1f%%')
            plt.savefig("img/"+cat+".png")

        print(merged/counter*100)
        print(merged_by_cat)
meth2()

