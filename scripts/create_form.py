DEFAULT_ANSWERS = ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]
questions = {
    "Data clumps are a code smell that should be fixed": None,
    "Using LLMs in software development can be helpful to improve code quality": None,
    "The proposed refactoring maintains or improves the quality of the code.": None,
    "The proposed refactoring has adequately identified and preserved the original functionality and intent of the code.": None,

    "The name of the new extracted class(es), fields and methods are well-chosen": None,
    "The location of the extracted class(es) are well-chosen": None,
    #"Without prior knowledge, it would be difficult to decide whether the refactoring was performed by a human or an LLM.": None,
    


    "For how long have you been contributing to this project?": ["<  3 months", "<= 6 months ", "<= 1 years", "<= 2 years", ">  2 years"],
    "For how long have you been a developer in Java ?": ["<   1 year", "<=  3 years", "<=  5 years", "<= 10 years", ">  10 years"],
}



result=""
counter=1
for q in questions:
    if questions[q] is None:
        questions[q] = DEFAULT_ANSWERS
    result += f"### {counter}. {q}\n"
    for a in questions[q]:
        result += f"- [ ] {a}\n"
    result += "#### Comments: \n\n"
    counter+=1
print(result)
    
