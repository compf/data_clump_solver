import json
import os
import sys
import xml.etree.ElementTree as ET
import javalang
result_dict = {}
for p,dirs,files in os.walk(sys.argv[1]):
    for f in files:
        if f.endswith('.java'):
                print(f)
                with open(os.path.join(p,f), 'r') as file:
         
                    try:
                        tree = javalang.parse.parse(file.read())
                    except:
                         continue
                    classes=[t for t in tree if isinstance(t[1], javalang.tree.ClassDeclaration)]
                    for cls in classes:
                         for field in cls[1].fields:
                            if "static"  in field.modifiers:
                                  continue
                            for decl in field.declarators:
                                 
                                if decl.name not in result_dict:
                                    result_dict[decl.name] = set()
                                result_dict[decl.name].add(  cls[1].name)
                   
                  
                  

for key in result_dict:
    result_dict[key] = list(result_dict[key])
with open(sys.argv[2], 'w') as jsonFile:
    json.dump(result_dict, jsonFile, indent=4)