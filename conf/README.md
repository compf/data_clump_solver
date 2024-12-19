This folder contains some example configuration

## config_redcliff.json

Detect data clumps via the DataClumpDoctor, suggest a suitable name via an LLM, and performs the refactoring via Redcliff

## config_llm_snippets.json

Detect Detect data clumps via the DataClumpDoctor, use a LSP for reference finding and send code snippets to the LLM which performs the refactoring. Three proposals are generated, each one in a separate branch.


## config_llm_markup_out.json

Detect Detect data clumps via the DataClumpDoctor, use a LSP for reference finding and send code snippets to the LLM which performs the refactoring. In this case, the model uses markup for replying. Three proposals are generated, each one in a separate branch.

## config_llm_markup_out.json

Detect Detect data clumps via the DataClumpDoctor, use a LSP for reference finding and send full code files to the LLM which performs the refactoring. 

## config_llmfilter.json

Detect Detect data clumps via the DataClumpDoctor, and let the LLM suggest data clumps for refactoring but no refactoring is conducted.
One can use config_redcliff afterwards (without deleting the context) to perform refactoring


