The data_clump_solver finds and refactors data clumps using a modular pipeline. It can be supported by LLMs like ChatGPT

## usage

npm run run <project_path> <config_path>
Where <project_path> is a java project and config_path is a valid config.
Example configs can be found in the conf folder.
All context data are saved in the .data_clump_solver_data folder of the project
You can add another flag as a third parameter to delete the existing context

## important
In order to use ChatGPT, you must copy a valid OpenAI key in the tokens/CHATGPT_TOKEN file. Otherwise it won't work