import os
import zipfile
def get_git_commit_id(dir):
    os.chdir(dir)
    os.system("git log -n 1 > git_log.txt")
    with open("git_log.txt",encoding="utf-8") as f:
        lines = f.readlines()
        #print(lines)
    commit_id = lines[0].split(" ")[1]
    return commit_id

PATH="/home/compf/data/uni/master/sem4/github_projects"
with zipfile.ZipFile('../stuff/project_info.zip', 'w') as zip_object:
   # Adding files that need to be zipped
   
    tpl=os.listdir(PATH)
    for dir in tpl:
        data_path=os.path.join(PATH,dir,".data_clump_solver_data")
        if os.path.exists(data_path):
            print(dir,id)
            id = get_git_commit_id(os.path.join(PATH,dir))
            for root, dirs, files in os.walk(data_path):
                for file in files:
                    print(file)
                    zip_object.write(os.path.join(root, file))
            zip_object.writestr(os.path.join(dir,"commit"),id)
            


