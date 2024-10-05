import matplotlib.pyplot as plt
import os
import os.path
import json
from collections import namedtuple
ValuePair = namedtuple('ValuePair', ['var1_name', 'var2_name',"var1_value","var2_value","value","one_variable"])
def get_stat_function(p):
    p=os.path.split(p)
    return p[-1]
def capitalize(s:str)->str:
    return s[0].upper()+s[1:].lower()
def draw_fig(base_path:str, fName:str):
    if not fName.endswith(".json"):
        return
    print(base_path,fName)
    with open(os.path.join(base_path,fName)) as f:
        obj=json.load(f)
    all_values=[]
    for key in obj:
        if "=" not in key:
            continue
        key_splitted=key.split(" , ")
        var1_name, var1_value=key_splitted[0].split("=")
        var1_name=var1_name.strip()
        var1_value=var1_value.strip()
        var2_name, var2_value=None,None
        one_variable = False
        if(len(key_splitted)>1):
           
            var2_name, var2_value=key_splitted[1].split("=")
            var2_name=var2_name.strip()
            var2_value=var2_value.strip()
            one_variable=False
        else:
            one_variable=True
            var2_name, var2_value=None,None
            print(key,var2_name, var2_value)
        value=obj[key]
        if not isinstance(value,float):
            continue
        all_values.append(ValuePair(var1_name,var2_name,var1_value,var2_value,value,one_variable))
    d=dict()
    for v in all_values:
       
        if v.one_variable:
            print(v)
            print()
            if v.var1_name not in d:
                d[v.var1_name]=[]
            d[v.var1_name].append((v.value,v.var1_value))

           
    for key in d:
        print(key,d[key])
        plt.figure()
        print(key)
        print(key)
        names=[n[1] for n in d[key]]
        values=[n[0] for n in d[key]]
        print(names)
        print(values)
        print()
        if not all([it>=0 for it in values]):
            continue
        plt.bar(names,values,label=names,width=0.1)
        category=capitalize(key)
        plt.title(capitalize(get_stat_function(base_path))+": "+category)
        p=os.path.abspath("../evalDataFigures/"+base_path.replace("./",""))
        os.makedirs(p,exist_ok=True)
        plt.savefig(p+"/"+fName.replace(".json","_"+key+".svg"), metadata={'Date': None})
        plt.close()
               







for tpl in os.walk("."):
    for f in tpl[2]:
        if f.endswith(".json"):
            draw_fig(tpl[0],f)
        
