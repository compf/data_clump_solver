

Title:  Refactored data clumps with the help of LLMs (research project)


Hello maintainers,

I am conducting a master thesis project focused on enhancing code quality through automated refactoring of data clumps, assisted by Large Language Models (LLMs).


<details>
  <summary>Data clump definition</summary>
  
A data clump exists if
1. two methods (in the same or in different classes) have at least 3 common parameters and one of those methods does not override the other,  or 
2. At least three fields in a class are common with the parameters of a method (in the same or in a different class), or
3. Two different classes have at least three common fields
  
See also the following UML diagram as an example
![Example data clump](https://raw.githubusercontent.com/compf/data_clump_eval_assets/main/data_clump_explained.svg)
</details>


I believe these refactoring can contribute to the project by reducing complexity and enhancing readability of your source code.

Pursuant to the EU AI Act, I fully disclose the use of LLMs in generating these refactorings, emphasizing that all changes have undergone human review for quality assurance. 


Even if you decide not to integrate my changes to your codebase (which is perfectly fine), I ask you to fill out a feedback survey, which will be scientifically evaluated to determine the acceptance of AI-supported refactorings. You can find the feedback survey under https://campus.lamapoll.de/Data-clump-refactoring/en


Thank you for considering my contribution. I look forward to your feedback. If you have any other questions or comments, feel free to write a comment, or email me under tschoemaker@uni-osnabrueck.de .


Best regards,
Timo Schoemaker
Department of Computer Science
University of Osnabrück


