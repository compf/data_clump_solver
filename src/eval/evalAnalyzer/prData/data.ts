import {
  PR_Data,
  IntentionalDesignChoice,
  Complexity,
  RefactoringNotWorthIt,
  
  Readability,
  parameters_to_parameters_data_clump,
  fields_to_fields_data_clump,
  LongLines,
  NotEnough,
  Performance,
  SmallerDataClump,
  DocumentationIssues,
  JavaRecordBetter,
  ExtractedClassLocation,
  LLM_Useful,
  ClassName,
  
  OverEngineered,
  SameBaseClass,
  ExtractedClassShouldNotBePublic,
  StyleAdaption,
  SemanticChanges,
  LicenseHeaderMissing,
  LLM_LegalIssues,
  LargerDataClump,
  
  Neutral,
  ImprovedMaintainability,
  StronglyAgree,
  StronglyDisagree,
  Agree,
  NEUTRAL_COMMENT,
  Disagree,
  Good_Idea,
  DeevloperMustOverseeLLM,
  NoMeaningfulFeedback,

  ImportsIssues,
  InvalidPR
} from "./structures";

export const data: PR_Data = {
  "https://github.com/junit-pioneer/junit-pioneer": {
    url: "https://github.com/junit-pioneer/junit-pioneer",
    state: "closed",
    merged: false,
    "key": "parameters_to_parameters_data_clump-src/test/java/org/junitpioneer/testkit/PioneerTestKit.java-org.junitpioneer.testkit.PioneerTestKit/method/executeTestMethodWithParameterTypesAndConfigurationParameters(java.util.Map<java.lang.String, java.lang.String> configurationParameters, java.lang.Class<?> testClass, java.lang.String testMethodName, java.lang.Class<?>[] methodParameterTypes)-org.junitpioneer.testkit.PioneerTestKit/method/executeTestMethodWithParameterTypes(java.lang.Class<?> testClass, java.lang.String testMethodName, java.lang.Class<?>[] methodParameterTypes)-testClasstestMethodNamemethodParameterTypes",
    size: 4,
    type: parameters_to_parameters_data_clump,
    category: "detectAndRefactor",
    generalComments: [-IntentionalDesignChoice],
    reviewComments: [],
    generalCommentsRaw: [
      [
        "Hey @compf ! Thank you for your interest in Pioneer (even if only as a research subject)",
        "\r\n\r\nUnfortunately, I don't think we will integrate your changes",
        " `ExecutionResults` and `PioneerTestKit` intentionally share parameter values as `PioneerTestKit` is a utility class, meant to make creating `ExecutionResults` easier",
        "\r\n\r\nAs the methods in `ExecutionResults` are package-private, the only way to create them is through `PioneerTestKit`",
        "\r\n\r\nHowever, this is mostly personal opinion - I will leave this PR open",
        "\r\nMaybe the other maintainers also want to express their opinion",
        "",
      ],
      [
        "Thank you very much",
        " As I said, it is absolutely fine not to integrate these changes",
        " It would also be great if more feedback is given",
        "\r\n\r\nYour project looks nevertheless very interesting and I will follow it",
        " Maybe I will  contribute in other ways :)",
      ],
      [
        "Hey @compf ,\r\nI've read you PR quite interested to get a glimpse about what AI is captable of nowadays and I positely noticed that you (r LLM ;) ) included an explanation what your ideas are behind your change",
        " Switching to my point of view as a maintainer I'm with @Michael1993  who already pointed out why we have done things the way we did",
        " And therefore I also vote against a merge (aside the formal aspect of not having an issue as a base for this PR)",
        "\r\n\r\nFurther I'll close the PR as a third maintainer (@beatngu13 ) has also reacted via an emoji to this PR and therefore there can't be a majority of maintainers to vote for a merge",
        " But free to grab an open issue if you want to contribute (now or in the future)!\r\n\r\nLast but not least I wish you all the best for your master thesis and feel free to reach out to me when you are done - would be happy to read it! ",
      ],
    ],
    likertData: [[
      {
        scale: Neutral,
        comments: `Data clumps can be a code smell, but only if it breaks principles - sometimes you can have data clumps that actually do not break any. Just because similar or the same data exists in different objects does not inherently constitute a problem - I asked ChatGPT for an example here (paraphrasing):
Consider the classes WeatherReport and FinancialStatement: both could have the following fields: LocalDate date, String location, double value (and any additional fields). These fields could be considered a 'data clump' by your definition but have vastly different applications and contexts. Can you extract these values in a meaningful way? Sure! Should you? Probably not - sharing these fields (even if it's through composition and not inheritence) would limit or hinder maintenance if any of these objects evolve in the future.
I believe it would be straightforward to come up with a counter-example where extracting fields from two rather similar objects that have the same (or almost the same) context is beneficial, so I'm not going to do that.`,
        keywords: [-RefactoringNotWorthIt, -IntentionalDesignChoice, -IntentionalDesignChoice]
      },
      {
        scale: StronglyAgree,
        comments: "Yes, LLMs can speed up (and already speed up!) work by helping search for documentation, explain things with examples, collating large data chunks, etc. I believe GitHub co-pilot is an LLM",
        keywords: [+LLM_Useful]
      },
      {
        scale: StronglyDisagree,
        comments: `Our project is very small and most parts are very isolated. This initiative is probably better suited for projects with lots of moving/interacting parts.
While the LLM did identify a 'data clump', extracting it did not improve readability or maintainability - in fact, it did the opposite. It added unnecessary boilerplate to code that was already very readable and straightforward to use.`,
        keywords: [-ImprovedMaintainability, -Readability]
      },
      {
        scale: Agree,
        comments: "It's rather clear that the exercise did not break any code or functionality - however it often adds unnecessary 'null' values and creates wrapper objects.",
        keywords: [-IntentionalDesignChoice]
      },
      {
        scale: StronglyAgree,
        comments: "Sure. If we needed the wrapper around the parameters, TestSelector is a good name for them.",
        keywords: [+ClassName, -DocumentationIssues]
      },
      {
        scale: StronglyAgree,
        comments: "Sure",
        keywords: []
      }
    ]],
    reviewCommentsRaw: [],
    experience: [{
      java: "<=5 years>",
      project: ">2 years"
    }]
  },
  "https://github.com/grpc/grpc-java": {
    url: "https://github.com/grpc/grpc-java",
    state: "closed",
    merged: false,
    size: 4,
    "key": "parameters_to_parameters_data_clump-api/src/main/java/io/grpc/InternalServiceProviders.java-io.grpc.InternalServiceProviders/method/load(java.lang.Class<T> klass, java.lang.Iterable<java.lang.Class<?>> hardcoded, java.lang.ClassLoader classLoader, io.grpc.InternalServiceProviders$PriorityAccessor<T> priorityAccessor)-io.grpc.InternalServiceProviders/method/loadAll(java.lang.Class<T> klass, java.lang.Iterable<java.lang.Class<?>> hardCodedClasses, java.lang.ClassLoader classLoader, io.grpc.InternalServiceProviders$PriorityAccessor<T> priorityAccessor)-klassclassLoaderpriorityAccessor",

    type: parameters_to_parameters_data_clump,
    category: "detectAndRefactor",
    generalComments: [-Complexity, -RefactoringNotWorthIt, -Performance],
    reviewComments: [],
    generalCommentsRaw: [
      [
        ' <a href="https://api',
        "easycla",
        "lfx",
        "linuxfoundation",
        'org/v2/repository-provider/github/sign/1656153/27729926/11100/#/?version=2"><img src="https://s3',
        "amazonaws",
        "com/cla-project-logo-prod/cla-missing-id",
        'svg" alt="CLA Missing ID" align="left" height="28" width="328"></a> <a href="https://api',
        "easycla",
        "lfx",
        "linuxfoundation",
        'org/v2/repository-provider/github/sign/1656153/27729926/11100/#/?version=2"><img src="https://s3',
        "amazonaws",
        "com/cla-project-logo-prod/cla-not-signed",
        'svg" alt="CLA Not Signed" align="left" height="28" width="328"></a><br/><br /><ul><li>:white_check_mark: login: compf  (b70ae8780fa76ddcefdafc3ddf96b95f5e87c9e0, 74b0b6f32f7f4daa2e728f620c791c105d9625d3)</li><li> :x: The email address for the commit (fd10722b8c6e79c04a6d443f41b8c3e657db7463) is not linked to the GitHub account, preventing the EasyCLA check',
        " Consult <a href='https://confluence",
        "linuxfoundation",
        "org/pages/viewpage",
        "action?pageId=86641302' target='_blank'>this Help Article</a> and <a href='https://help",
        "github",
        "com/en/github/committing-changes-to-your-project/why-are-my-commits-linked-to-the-wrong-user' target='_blank'>GitHub Help</a> to resolve",
        " (To view the commit's email address, add ",
        "patch at the end of this PR page's URL",
        ") For further assistance with EasyCLA, <a href='https://jira",
        "linuxfoundation",
        "org/servicedesk/customer/portal/4' target='_blank'>please submit a support request ticket</a>",
        "</li></ul>",
      ],
      [
        "I don't think this refactoring is meaningful, but this method only has 4 parameters",
        " We added a class to wrap the parameters, introduced more class constructions, and increased understanding complexity",
        "",
      ],
      [
        "\r\n\r\n\r\n\r\n> I don't think this refactoring is meaningful, but this method only has 4 parameters",
        " We added a class to wrap the parameters, introduced more class constructions, and increased understanding complexity",
        "\r\n\r\nThank you for the feedback :)",
      ],
      [
        "I don't think we are interested in this particular change",
        " It doesn't help the callers or implementation to swap from 4 arguments to a constructor with 4 arguments",
        " This is also an internal API, so we can add another argument and update callers simultaneously",
        "",
      ],
      [
        "Thank you very much",
        " This is absolutely fine",
        " I would appreciate if you fill out the feedback survey under https://campus",
        "lamapoll",
        "de/Data-clump-refactoring/en",
      ],
    ],
    reviewCommentsRaw: [],
  },
  "https://github.com/LibrePDF/OpenPDF": {
    url: "https://github.com/LibrePDF/OpenPDF",
    state: "closed",
    merged: true,
    size: 4,
    manualChanges: true,
    type: fields_to_fields_data_clump,
    category: "detectAndRefactor",
    generalComments: [+Readability],
    reviewComments: [-LongLines, -NotEnough, -SmallerDataClump],
    generalCommentsRaw: [
      [
        "Changes seem ok, but there are some findings",
        " And some thoughts from me",
        '\r\nCan you fix them? You may ignore the "complexity" findings from CodeFactor',
        "\r\n",
      ],
      [
        "## [![Quality Gate Passed](https://sonarsource",
        "github",
        "io/sonarcloud-github-static-resources/v2/checks/QualityGateBadge/qg-passed-20px",
        "png 'Quality Gate Passed')](https://sonarcloud",
        "io/dashboard?id=LibrePDF_OpenPDF&pullRequest=1140) **Quality Gate passed**  \nIssues  \n![](https://sonarsource",
        "github",
        "io/sonarcloud-github-static-resources/v2/common/passed-16px",
        "png '') [1 New issue](https://sonarcloud",
        "io/project/issues?id=LibrePDF_OpenPDF&pullRequest=1140&resolved=false&inNewCodePeriod=true)  \n![](https://sonarsource",
        "github",
        "io/sonarcloud-github-static-resources/v2/common/accepted-16px",
        "png '') [0 Accepted issues](https://sonarcloud",
        "io/component_measures?id=LibrePDF_OpenPDF&pullRequest=1140&metric=new_accepted_issues&view=list)\n\nMeasures  \n![](https://sonarsource",
        "github",
        "io/sonarcloud-github-static-resources/v2/common/passed-16px",
        "png '') [0 Security Hotspots](https://sonarcloud",
        "io/project/security_hotspots?id=LibrePDF_OpenPDF&pullRequest=1140&resolved=false&inNewCodePeriod=true)  \n![](https://sonarsource",
        "github",
        "io/sonarcloud-github-static-resources/v2/common/no-data-16px",
        "png '') No data about Coverage  \n![](https://sonarsource",
        "github",
        "io/sonarcloud-github-static-resources/v2/common/passed-16px",
        "png '') [0",
        "0% Duplication on New Code](https://sonarcloud",
        "io/component_measures?id=LibrePDF_OpenPDF&pullRequest=1140&metric=new_duplicated_lines_density&view=list)  \n  \n[See analysis details on SonarCloud](https://sonarcloud",
        "io/dashboard?id=LibrePDF_OpenPDF&pullRequest=1140)\n\n",
      ],
      [
        "I looks much better now",
        " And I have the impression it is really more readable, after your changes",
        "",
      ],
    ],
    likertData: [[
      {
        scale: Agree
      },
      {
        scale: Agree,
        comments: "It's important too keep the semantic and don't invent some crazy class with very mixed fields.",
        keywords: [SmallerDataClump]
      },
      {
        scale: Agree
      },
      {
        scale: Agree,
        comments: "The new Object was not initialized.",
        keywords: [-SemanticChanges]
      },
      {
        scale: Agree
      },
      {
        scale: Agree
      },
    ]],
    experience: [{
      project: ">2 years",
      java: ">10 years"
    }],
    reviewCommentsRaw: [
      [
        "These lines got really long, exploding the 180 chars limit",
        ' Maybe calling the variable only "dimensions" could do the trick',
        "\r\nAnd as the class alone is called `BarcodeDatamatrix`, having a field named `BarcodeDatamatrix#barcodeDimensions` is a little bit reduntant",
        "",
      ],
      ["ws could have been asigned just before line 589", ""],
      [
        'the ws fiel in BarcodeDimensions could be called "border", or "whitespaceBorder"?',
      ],
      [
        "height, width and ws (or border, or whitespaceBorder) are semantically part of a Dimension, but I don't see why options is also in this class",
        "",
      ],
      [
        "Thank you for the feedback",
        " I will try to solve these issues later",
        ' As explained above, a LLM has generated most of the source code and I tried to avoid human intervention as much as possible, so some refactorings may look "strange", but to improve this, is one focus of my master thesis',
        " \r\n\r\nIf you find time, you can complete the survey linked in the original post",
        " It should take not more than 5-10 minutes to complete",
        "\r\n\r\nAgain, thank you very much",
      ],
      [
        "Here is important, that public methods are not simply renamed, as some users may  be using it",
        " I'll merge anyway and add the getWs() and setWs() methods back, which will call the get/setBorder() methods",
        "",
      ],
    ],
  },
  "https://github.com/JabRef/jabref": {
    url: "https://github.com/JabRef/jabref",
    state: "closed",
    merged: true,
    manualChanges: true,
    size: 4,
    type: parameters_to_parameters_data_clump,
    category: "nameSuggestion",
    generalComments: [
      -DocumentationIssues,
      -JavaRecordBetter,
      -NotEnough,
      -ExtractedClassLocation,
    ],
    "key": "org.jabref.model.openoffice.uno.UnoNamed/method/insertNamedTextContent(org.jabref.model.openoffice.uno.com.sun.star.text.XTextDocument doc, java.lang.String service, java.lang.String name, org.jabref.model.openoffice.uno.com.sun.star.text.XTextRange range, boolean absorb)/parameter/absorb",

    reviewComments: [],
    generalCommentsRaw: [
      [
        "@compf please cite JabRef in your thesis",
        " Use the citation as provided at https://docs",
        "jabref",
        "org/faq",
      ],
      [
        "@compf We have guideline to setup IntelliJ so that checkstyle won't complain at https://devdocs",
        "jabref",
        "org/getting-into-the-code/guidelines-for-setting-up-a-local-workspace/intellij-13-code-style",
        "html",
        " - Sorry, that this is such an effort",
        " We did not dare to check in IntelliJ configs, because we fear that for each update of IntelliJ, the configs will change",
        " We do not want to force our dozens of student contributors to fiddle around with their IntelliJ",
        "",
      ],
      [
        "Thank you very much for the feedback",
        " I will certainly cite Jabref",
        "\r\n\r\nSomehow my Checkstyle was buggy so it didn't spot these formatting issues",
        " After reinstalling, it worked",
      ],
      [
        "> Some more comments :)\r\n> \r\n> I think, I should re-do the survey",
        " The LLM is very bad in keeping `@param` comments",
        " I, formyself, understood it now:\r\n> \r\n> * There are `@param` comments for interpretation of the given object at each method\r\n> * They explain how the method behaves\r\n> * Thus, the comment should be moved into a newly created `@param` annotation for the called method",
        "\r\n> * If the `@param` describes the parameter (and not the treatment of the parameter inside the method), it should be moved to the newly created class\r\n> \r\n> (I hope, this was somehow clear)\r\n\r\nI think your first survey was fine",
        " I have to admit that not everything was done by an LLM, in your case many things were performed by a tool I wrote, and which has still some strange bugs I need to fix, so I had to do a little manual refactoring (with associated mistakes), so you should not blame the LLM",
        " :)\r\nI can try to fix the other issues if I find time, but keep in mind that I do not have an insight in your project like you do, and the feedback to the first commit is what's important for my study",
        " Nevertheless, your projects is very interesting and I use Jabref often for managing  scientific sources, so maybe I will contribute in other ways :)",
      ],
      [
        "@compf Happy start into a new week",
        " May I ask if you'll find time to finish this PR? 😅",
      ],
      [
        "Oh, I totally forgot",
        " I will finish the pull request by the end of this week if that's ok :) ",
      ],
    ],
    reviewCommentsRaw: [
      ["The comments should moved to the new class"],
      ["This can be a record, cant it?"],
      ["Check whether these comments can be moved to the new class, too", ""],
      [
        "For a good refactoring `true` and `false` would be replaced by an `enum` containing `ABSORB` and (probably) `KEEP`",
        " This is out of scope of this project, just as hint",
        "",
      ],
      [
        "Ah, LOL, the LLM puts different variable name for same variable types (`docAnn` versus `annotation` versus `documentAnnotation` below)",
        " I would propose to use always the full class name ( `documentAnnotation`) consistently",
        "\r\n\r\nA good LLM could recognize which variable name style is used and apply that style",
      ],
      [
        "Can be removed, because the variable name also says that",
        "\r\n\r\n(Moreover, `@param` should have been put above `@return`",
        " Our checkstyle seems to miss that configuration :p)",
      ],
      [
        "Please move the comment \r\n\r\n    For the ReferenceMark, Bookmark, TextSection",
        " If the name is already in use, LibreOffice may change the name",
        "\r\n\r\nto here",
        "",
      ],
      [
        "Move the class one level up",
        " It just consists of classes residing in package `com",
        "sun",
        "star",
        "text` and therefore is not directly part of `uno`, is it?\r\n\r\nIf it is, add a small comment to the package to explain why the class resides here",
        "\r\n\r\n(Your survery asked about that and therefore I am thinking more about it than I should :p)",
      ],
      [
        "Some comments say: `If an XTextSection by that name already exists, LibreOffice (6",
        "4",
        "6",
        '2) creates a section with a name different from what we requested, in "Section {number}" format',
        "`",
        " Maybe, that should be put here, too? Or to the method getting this new object as parameter? - In all cases, the comment of the parameter should not get lost",
        "",
      ],
      [
        "https://devdocs",
        "jabref",
        "org/code-howtos/openoffice/code-reorganization",
        "html\r\nuno : helpers for various tasks via UNO",
        "\r\nThese are conceptually independent of JabRef code and logic",
        "",
      ],
    ],
    likertData: [[
      {
        scale: Agree,
      },
      {
        scale: Agree,
        comments: `A developer needs to have the tool available in the IDE - or creating pull requests. Similar to OpenRewrite of Moderne. In contrast to OpenRewrite, code created by LLMs needs to have oversights.`,
        keywords: [-DeevloperMustOverseeLLM]
      },
      {
        scale: Disagree,
        comments: `- Good, because new class factored out
- Neutral, because a comparison to IntelliJs feature "Extract prameter object" (https://www.jetbrains.com/help/idea/extract-into-class-refactorings.html#extract_parameter_object) is missing. I think, IntelliJ's algorithm might be better. Your thesis needs to include that as comparison! Maybe, an LLM can be used to identify places where to refactor and let IntelliJ do the work!
- Bad, because Comments have not been moved
- Bad, because basic checkstyle checks fail
- Bad, because Java "record" data type not used`,
        keywords: [-JavaRecordBetter, -NotEnough, -DocumentationIssues, +Good_Idea, -ExtractedClassLocation]
      },
      {
        scale: StronglyAgree
      },
      {
        scale: Disagree
      }


    ]],
    experience: [{
      project: ">20 years",
      java: ">=10 years",
    }]
  },
  "https://github.com/karatelabs/karate": {
    url: "https://github.com/karatelabs/karate",
    state: "closed",
    merged: false,
    size: 7,
    "key": "fields_to_fields_data_clump-karate-core/src/main/java/com/intuit/karate/core/Scenario.java-com.intuit.karate.core.Scenario-com.intuit.karate.core.ScenarioOutline-sectionnamedescriptiontagslinestepsfeature",

    type: fields_to_fields_data_clump,
    category: "nameSuggestion",
    generalComments: [-Readability, -IntentionalDesignChoice, -Complexity],
    reviewComments: [],
    generalCommentsRaw: [
      [
        "@compf thanks for the details",
        " I do not find the changes helpful",
        " the original code is less verbose and more readable and maintainable (in my opinion)",
        " `Scenario` and `ScenarioOutline` are separate to mirror parts of a file format parsed by ANTLR",
        ' they may be "similar" but they have subtle differences in how they are used, I will take a look at the survey if I can fill it',
      ],
      [
        "That's perfectly fine",
        " Thank you nevertheless for the feedback",
        " If would be great if you can fill out the survey :)",
      ],
      ["@compf yes I have filled out the survey"],
    ],
    reviewCommentsRaw: [],
    likertData: [[
      {
        scale: Disagree,
        comments: `They may exist to represent real-word aspects, for example a) objects in the real world that may have similar properties - but need to be treated differently or that behave differently b) generated code that should not be edited by humans

Also code is structured to suit the convenience of the original author or maintainers - so I personally give that preference.`,
        keywords: [-IntentionalDesignChoice]
      },
      {
        scale: Disagree,
      },
      {
        scale: Disagree
      },
      {
        scale: StronglyDisagree,
        comments: "I did not like 'TestScenario' as a name."
      },
      {
        scale: Agree,
        comments: "I most cases, side-by-side with original code is the right choice, which is what was observed."
      }

    ]],
    experience: [{
      project: ">2 years",
      java: ">10 years"
    }]
  },
  "https://github.com/flyway/flyway": {
    url: "https://github.com/flyway/flyway",
    state: "open",
    merged: false,
    "key": "fields_to_fields_data_clump-flyway-core/src/main/java/org/flywaydb/core/internal/command/DbValidate.java-org.flywaydb.core.internal.command.DbValidate-org.flywaydb.core.internal.command.DbMigrate-configurationmigrationResolverschemadatabasecallbackExecutorschemaHistory",

    type: fields_to_fields_data_clump,
    size: 5,
    category: "nameSuggestion",
    generalComments: [],
    reviewComments: [],
    generalCommentsRaw: [
      [
        "[![CLA assistant check](https://cla-assistant",
        "io/pull/badge/signed)](https://cla-assistant",
        "io/flyway/flyway?pullRequest=3870) <br/>All committers have signed the CLA",
        "",
      ],
    ],
    reviewCommentsRaw: [],
  },
  "https://github.com/liquibase/liquibase": {
    url: "https://github.com/liquibase/liquibase",
    state: "closed",
    merged: true,
    size: 3,
    key:"fields_to_fields_data_clump-liquibase-standard/src/main/java/liquibase/statement/core/UpdateStatement.java-liquibase.statement.core.UpdateStatement-liquibase.statement.core.AddAutoIncrementStatement-tableNamecatalogNameschemaName",

    type: fields_to_fields_data_clump,
    category: "nameSuggestion",
    generalComments: [],
    reviewComments: [-StyleAdaption],
    generalCommentsRaw: [
      [
        "@compf, thank you for your submission",
        " I'll pass this to engineering for review in the next sprint",
        "",
      ],
      [
        "Hi @compf,\r\n\r\nI think it's a nice readability enhancement, good job! I just left a small review comment in case you want to apply as well",
        " \r\n\r\nThanks,\r\nDaniel",
        "  ",
      ],
      [
        "Thank you very much for the feedback",
        " I can apply your feedback by the end of this week if this is ok :)",
      ],
      [
        "@MalloD12 In have simplified the DataBaseTableIdentifier class as suggested",
        " According to the email notification, You have written more comments but they seem to be deleted or I can't find them anymore",
        " If they are still relevant, I can address them as well :)",
      ],
      [
        "> @MalloD12 In have simplified the DataBaseTableIdentifier class as suggested",
        " According to the email notification, You have written more comments but they seem to be deleted or I can't find them anymore",
        " If they are still relevant, I can address them as well :)\r\n\r\nThank you, @compf! I don't have any additional comments, I posted some other questions I thought some changes couldn't be needed but I realized afterward they were right",
        "\r\n\r\n ",
      ],
    ],
    reviewCommentsRaw: [
      [
        "Since we are using Lombok in some other classes, I think we can also applied to this class",
        " I think adding:\r\n```\r\n- @Getter\r\n- @Setter\r\n- @AllArgsConstructor\r\n```\r\nwould be fine",
        "",
      ],
    ],
  },
  "https://github.com/opensearch-project/data-prepper": {
    url: "https://github.com/opensearch-project/data-prepper",
    state: "open",
    merged: false,
    size: 3,
    "key": "fields_to_fields_data_clump-data-prepper-expression/src/main/java/org/opensearch/dataprepper/expression/AddBinaryOperator.java-org.opensearch.dataprepper.expression.AddBinaryOperator-org.opensearch.dataprepper.expression.ArithmeticBinaryOperator-operandsToOperationMapdisplayNamesymbol",
    
    type: fields_to_fields_data_clump,
    category: "detectAndRefactor",
    generalComments: [-NotEnough],
    reviewComments: [],
    generalCommentsRaw: [
      [
        "@compf Thanks a lot for your contribution",
        " It is an interesting innovation project and idea to apply LLM to improve our project code quality",
        " I have the following questions:\r\n\r\n1",
        " What is the LLM you have applied? any reference or links?\r\n2",
        " For long term (not necessary in this PR), is it possible to integrate it into GitHub automated CI/CD workflow?",
      ],
      [
        "@compf Excellent! Thank you very much for your contribution",
        " Will take a look at the diff and provide the feedback",
        "",
      ],
      [
        "> @compf Thanks a lot for your contribution",
        " It is an interesting innovation project and idea to apply LLM to improve our project code quality",
        " I have the following questions:\r\n> \r\n> 1",
        " What is the LLM you have applied? any reference or links?\r\n> 2",
        " For long term (not necessary in this PR), is it possible to integrate it into GitHub automated CI/CD workflow?\r\n\r\nThank you for the questions\r\n1) For your project I used GPT-4-1106 from OpenAI\r\n2) This is not the main part of my master thesis",
        " However, the general idea of my project should be integrable to Github Action or similar CI/CD processes",
        " The issue is that using LLM very often leads to uncompileable code that must be fixed by a human in a loop",
        " Currently, The only reliable integration would be to only suggest the name of the extracted class by an LLM and perform the refactoring by another tool",
        " But I am hopeful that in the future, LLMs will be improved to better handle the refactoring",
      ],
      [
        "> Thanks for the contribution",
        " I am a little doubtful on this refactoring",
        " It creates a new very abstract class `OperationParameters`, that is just a container of two abstract maps",
        " I outlined, what functions would introduce some more meaning for me",
        "\r\n> \r\n> A possible extension would be, to wrap `BiFunction<Object, Object, Number>` and similar into functional interfaces:\r\n> \r\n> ```java\r\n> @FunctionalInterface\r\n> interface Operation extends BiFunction<Object, Object, Number> {\r\n> ```\r\n> \r\n> These kind of extensions would make the new class `OperationParameters` more readable aiding the understanding of the code",
        " Just the extraction of the class falls a little short in my opinion",
        "\r\n\r\nThank you very much for the feedback :)",
      ],
    ],
    reviewCommentsRaw: [
      ["```suggestion\r\n```"],
      [
        "Would be nice, if `getStrategy` would directly take `args[0]",
        "getClass()` as an argument",
        "",
      ],
      [
        "Would be nice, if `operatorParameters` had a direct method `containsOperand`",
        "",
      ],
      [
        "Would be nice, if `operatorParameters` had a direct method `getOperation`",
        "",
      ],
      [
        "Would be nice, if there was at least an overloaded version of the constructor, that did not require the explicit `null` parameter",
        "",
      ],
      [
        "This class was extracted as an implementation detail of the binary operators in this package",
        " I think, it should be package private and not public",
        "\r\n```suggestion\r\nclass OperatorParameters {\r\n```",
      ],
    ],
  },
  "https://github.com/elastic/logstash": {
    url: "https://github.com/elastic/logstash",
    state: "closed",
    merged: false,
    category: "detectAndRefactor",
    generalComments: [RefactoringNotWorthIt],
    reviewComments: [],
    size: 6,
    type: fields_to_fields_data_clump,
    generalCommentsRaw: [
      [
        "<!-- CLA-CHECK:16097 -->\n&#10060; Author of the following commits did not sign a [Contributor Agreement](https://www",
        "elastic",
        "co/contributor-agreement):\n   2ac79061126de7a239422709d96bd282446743ed\n\n   Please, read and sign the above mentioned agreement if you want to contribute to this project",
      ],
      ["I'm not sure what value/improvements this PR adds"],
    ],
    reviewCommentsRaw: [],
  },
  "https://github.com/kestra-io/kestra": {
    url: "https://github.com/kestra-io/kestra",
    state: "closed",
    merged: false,
    "key": "parameters_to_parameters_data_clump-core/src/main/java/io/kestra/core/runners/FlowableUtils.java-io.kestra.core.runners.FlowableUtils/method/resolveState(io.kestra.core.runners.io.kestra.core.models.executions.Execution execution, java.util.List<io.kestra.core.runners.io.kestra.core.models.tasks.ResolvedTask> tasks, java.util.List<io.kestra.core.runners.io.kestra.core.models.tasks.ResolvedTask> errors, io.kestra.core.runners.io.kestra.core.models.executions.TaskRun parentTaskRun, io.kestra.core.runners.RunContext runContext, boolean allowFailure)-io.kestra.core.runners.FlowableUtils/method/resolveParallelNexts(io.kestra.core.runners.io.kestra.core.models.executions.Execution execution, java.util.List<io.kestra.core.runners.io.kestra.core.models.tasks.ResolvedTask> tasks, java.util.List<io.kestra.core.runners.io.kestra.core.models.tasks.ResolvedTask> errors, io.kestra.core.runners.io.kestra.core.models.executions.TaskRun parentTaskRun, java.lang.Integer concurrency, java.util.function.BiFunction<java.util.stream.Stream<io.kestra.core.runners.io.kestra.core.models.executions.NextTaskRun>, java.util.List<io.kestra.core.runners.io.kestra.core.models.executions.TaskRun>, java.util.stream.Stream<io.kestra.core.runners.io.kestra.core.models.executions.NextTaskRun>> nextTaskRunFunction)-executiontaskserrorsparentTaskRun",

    category: "detectAndRefactor",
    size: 6,
    type: parameters_to_parameters_data_clump,
    generalComments: [-NoMeaningfulFeedback],
    reviewComments: [],
    generalCommentsRaw: [
      [
        "Hey, we appreciate your contribution",
        " Currently, we cannot merge this",
        " If you want to become a contributor, feel free to join our Slack community and we can next time discuss what would be the best way to pursue such projects",
        " ",
      ],
    ],
    reviewCommentsRaw: [],
  },
  "https://github.com/skylot/jadx": {
    url: "https://github.com/skylot/jadx",
    state: "open",
    "key": "parameters_to_parameters_data_clump-jadx-core/src/main/java/jadx/core/dex/visitors/typeinference/TypeUpdate.java-jadx.core.dex.visitors.typeinference.TypeUpdate/method/applyWithWiderIgnSame(jadx.core.dex.visitors.typeinference.jadx.core.dex.nodes.MethodNode mth, jadx.core.dex.visitors.typeinference.jadx.core.dex.instructions.args.SSAVar ssaVar, jadx.core.dex.visitors.typeinference.jadx.core.dex.instructions.args.ArgType candidateType)-jadx.core.dex.visitors.typeinference.TypeUpdate/method/apply(jadx.core.dex.visitors.typeinference.jadx.core.dex.nodes.MethodNode mth, jadx.core.dex.visitors.typeinference.jadx.core.dex.instructions.args.SSAVar ssaVar, jadx.core.dex.visitors.typeinference.jadx.core.dex.instructions.args.ArgType candidateType, jadx.core.dex.visitors.typeinference.TypeUpdateFlags flags)-mthssaVarcandidateType",

    merged: false,
    category: "detectAndRefactor",
    size: 3,
    type: parameters_to_parameters_data_clump,
    generalComments: [],
    reviewComments: [],
    generalCommentsRaw: [],
    reviewCommentsRaw: [],
  },
  "https://github.com/dbeaver/dbeaver": {
    url: "https://github.com/dbeaver/dbeaver",
    state: "closed",
    merged: false,
    type: parameters_to_parameters_data_clump,
    size: 4,
    category: "detectAndRefactor",
    generalComments: [-JavaRecordBetter, -NotEnough],
    reviewComments: [],
    generalCommentsRaw: [
      [
        "Thanks for the contribution.Unfortunately, all I see is formatted code and questionable code extraction that doesn't even use the newest Java features, such as records. Moreover, the code added doesn't include the copyright header or uses nullability annotations as in the rest of the codebase.",
        "You still can help us make DBeaver better by:\r\n- Fixing a bug https://github",
        "com/dbeaver/dbeaver/issues?q=is%3Aissue+is%3Aopen+label%3Abug\r\n- Localizing it to your native language or improving existing localization https://github",
        "com/dbeaver/dbeaver/wiki/Localization",
      ],
      ["Thank you for the feedback"],
    ],
    reviewCommentsRaw: [],
  },
  "https://github.com/plantuml/plantuml": {
    url: "https://github.com/plantuml/plantuml",
    state: "open",
    merged: false,
    category: "nameSuggestion",
    generalComments: [
      -NotEnough,
      +LLM_Useful,
      +Readability,
      -ClassName,
      -ImportsIssues,
    ],
    size: 4,
    key:"parameters_to_parameters_data_clump-src/net/sourceforge/plantuml/activitydiagram3/ftile/Worm.java-net.sourceforge.plantuml.activitydiagram3.ftile.Worm/method/drawLine(net.sourceforge.plantuml.activitydiagram3.ftile.net.sourceforge.plantuml.klimt.drawing.UGraphic ug, double x1, double y1, double x2, double y2, net.sourceforge.plantuml.activitydiagram3.ftile.net.sourceforge.plantuml.utils.Direction direction)-net.sourceforge.plantuml.braille.BrailleGrid/method/line(double x1, double y1, double x2, double y2)-x1y1x2y2",
    type: parameters_to_parameters_data_clump,
    reviewComments: [],
    generalCommentsRaw: [
      [
        "Thanks for your contribution! Use of LLM is indeed very useful",
        "\r\nThe creation of `RectangleCoordinates` is a good point",
        " However, I would probably set the class as immutable (that is, without any setter)",
        "\r\nWe are not going to integrate your change asis, however, we will probably go for your suggestion (that is, an `RectangleCoordinates` immutable class), maybe with a shorter name for the class",
        "\r\n\r\nYour MR will be very useful to see all impact of this change on your code",
        "\r\nThanks again!\r\n",
      ],
      [
        "> Thanks for your contribution! Use of LLM is indeed very useful",
        " The creation of `RectangleCoordinates` is a good point",
        " However, I would probably set the class as immutable (that is, without any setter)",
        " We are not going to integrate your change asis, however, we will probably go for your suggestion (that is, an `RectangleCoordinates` immutable class), maybe with a shorter name for the class",
        "\r\n> \r\n> Your MR will be very useful to see all impact of this change on your code",
        " Thanks again!\r\n\r\nThank you very much for the feedback :)",
      ],
    ],
    reviewCommentsRaw: [
      [
        "Here is a minor remark:\r\n- Be careful with global imports `import xxx",
        "*;`\r\n\r\n[FYI @arnaudroques]",
      ],
      [
        "> Here is a minor remark:\r\n> \r\n>     * Be careful with global imports `import xxx",
        "*;`\r\n> \r\n> \r\n> [FYI @arnaudroques]\r\n\r\nThank you for the feedback :)",
      ],
    ],
  },
  "https://github.com/dtinit/data-transfer-project": {
    url: "https://github.com/dtinit/data-transfer-project",
    state: "open",
    merged: false,
    size: 3,
    "key": "parameters_to_parameters_data_clump-portability-api-launcher/src/main/java/org/datatransferproject/api/launcher/DtpInternalMetricRecorder.java-org.datatransferproject.api.launcher.DtpInternalMetricRecorder/method/importPageFinished(org.datatransferproject.api.launcher.org.datatransferproject.types.common.models.DataVertical dataType, java.lang.String service, boolean success, java.time.Duration duration)-org.datatransferproject.api.launcher.DtpInternalMetricRecorder/method/importPageAttemptFinished(org.datatransferproject.api.launcher.org.datatransferproject.types.common.models.DataVertical dataType, java.lang.String service, boolean success, java.time.Duration duration)-dataTypeservicesuccessduration",

    type: parameters_to_parameters_data_clump,
    category: "nameSuggestion",
    generalComments: [],
    reviewComments: [],
    generalCommentsRaw: [
      [
        "[![CLA assistant check](https://cla-assistant",
        "io/pull/badge/signed)](https://cla-assistant",
        "io/dtinit/data-transfer-project?pullRequest=1355) <br/>All committers have signed the CLA",
        "",
      ],
    ],
    reviewCommentsRaw: [],
  },
  "https://github.com/alibaba/Sentinel": {
    url: "https://github.com/alibaba/Sentinel",
    state: "closed",
    merged: false,
    "key": "fields_to_fields_data_clump-sentinel-transport/sentinel-transport-common/src/main/java/com/alibaba/csp/sentinel/command/vo/NodeVo.java-com.alibaba.csp.sentinel.command.vo.NodeVo-com.alibaba.csp.sentinel.dashboard.domain.ResourceTreeNode-resourceblockQpsidthreadNumparentIdsuccessQpsaverageRtoneMinuteBlockoneMinuteExceptiontotalQpspassQpsoneMinuteTotalexceptionQpsoneMinutePass",

    category: "nameSuggestion",
    size: 14,
    type: fields_to_fields_data_clump,
    generalComments: [+Complexity, -Readability],
    reviewComments: [],
    generalCommentsRaw: [
      [
        "Very useful research project, thanks for including Sentinel as one of the experimental subjects, but in my opinion, the extraction of public fields does reduce complexity, but is not necessarily good for readability",
        "",
      ],
      ["Thank you for the feedback :)"],
    ],
    reviewCommentsRaw: [],
  },
  "https://github.com/Netflix/zuul": {
    url: "https://github.com/Netflix/zuul",
    state: "open",
    merged: false,
    "key": "parameters_to_parameters_data_clump-zuul-core/src/main/java/com/netflix/netty/common/throttle/RejectionUtils.java-com.netflix.netty.common.throttle.RejectionUtils/method/notifyHandlers(com.netflix.netty.common.throttle.io.netty.channel.ChannelHandlerContext ctx, com.netflix.netty.common.throttle.com.netflix.zuul.stats.status.StatusCategory nfStatus, com.netflix.netty.common.throttle.io.netty.handler.codec.http.HttpResponseStatus status, java.lang.String reason, com.netflix.netty.common.throttle.io.netty.handler.codec.http.HttpRequest request)-com.netflix.netty.common.throttle.RejectionUtils/method/rejectByClosingConnection(com.netflix.netty.common.throttle.io.netty.channel.ChannelHandlerContext ctx, com.netflix.netty.common.throttle.com.netflix.zuul.stats.status.StatusCategory nfStatus, java.lang.String reason, com.netflix.netty.common.throttle.io.netty.handler.codec.http.HttpRequest request, java.lang.Integer injectedLatencyMillis)-ctxnfStatusreasonrequest",

    size: 5,
    type: parameters_to_parameters_data_clump,

    category: "nameSuggestion",
    generalComments: [],
    reviewComments: [],
    generalCommentsRaw: [
      [
        "This PR is stale because it has been open 60 days with no activity",
        " Remove stale label or comment or this will be closed in 7 days",
        "",
      ],
      [
        "Small push to prevent closing",
        " I still appreciate any feedback even if you do not want to merge these changes :)",
      ],
    ],
    reviewCommentsRaw: [],
  },
  "https://github.com/pmd/pmd": {
    url: "https://github.com/pmd/pmd",
    state: "closed",
    merged: false,
    "key": "parameters_to_parameters_data_clump-pmd-core/src/main/java/net/sourceforge/pmd/cache/internal/CachedRuleMapper.java-net.sourceforge.pmd.cache.internal.CachedRuleMapper/method/getRuleForClass(java.lang.String className, java.lang.String ruleName, java.lang.String languageName)-net.sourceforge.pmd.cache.internal.CachedRuleMapper/method/getRuleKey(java.lang.String className, java.lang.String ruleName, java.lang.String languageName)-classNameruleNamelanguageName",

    category: "detectAndRefactor",
    size: 3,
    type: parameters_to_parameters_data_clump,
    generalComments: [
      -SemanticChanges,
      -Performance,
      +ClassName,
      +ExtractedClassLocation,
    ],
    reviewComments: [],
    likertData: [[
      {
        scale: Agree
      },
      {
        scale: Neutral
      },
      {
        scale: StronglyDisagree,
        comments: `It adds object instantiations without adding additional value, as we are replacing a getter to create a key with a constructor of an object + toString to obtain the same thing. It's not even type-enforced, as the key of the map remains a String rather than trying to leverage the newly introduced type.

Overall, this is 100% overhead`,
        keywords: [-Performance, -NotEnough,]
      },
      {
        scale: StronglyAgree
      },
      {
        scale: StronglyAgree
      },
      {
        scale: StronglyAgree
      },
    ]],
    experience: [{
      project: ">2 years",
      java: ">10 years"
    }],

    generalCommentsRaw: [
      [
        "Thanks for the PR",
        "\r\n\r\nI've completed the form, but would like to give some feedback and context here",
        "\r\n\r\n**Pros:**\r\n* appropriate names and class location\r\n* no breaking public APIs, as all changes are on internal classes\r\n* logic is not broken\r\n\r\n**Cons:**\r\n* This change doesn't really improve the code… We have ~30 more lines of code, we are constantly creating and destroying new objects only to replace a method that created a String key with a class that is used as key through `toString()`",
        "\r\n* The usage of `toString()` is poor, as it implies the String should be unique AND consistent based on ALL attributes, which is not the standard behavior of this method in Java",
        " A more appropriate (semantic) change would have been to change the type of `cachedRulesInstances` to `Map<RuleKey, Rule>`, and implement `hashCode` and `equals`, where the behavior of such methods are better defined AND the type system would enforce the usage of `RuleKey`",
        " Notice that this would still not prevent the previous item regarding added complexity / object creation/destruction overhead",
        "\r\n\r\nOverall, considering the extra complexity, and that `cachedRulesInstances` is a local field whose existence is hidden from the outside world, it's only used twice within the class, and through a single helper method to get the key, I don't feel this changeset actually makes the code better / easier to understand and maintain",
        "",
      ],
      [
        "<!--\n  0 Errors\n  0 Warnings\n  1 Message: Compared to master:<br />\nThis",
        "",
        "",
        '\n  0 Markdowns\n-->\n<table>\n  <thead>\n    <tr>\n      <th width="50"></th>\n      <th width="100%" data-danger-table="true" data-kind="Message">\n          1 Message\n      </th>\n     </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td>:book:</td>\n      <td data-sticky="true">Compared to master:<br />\nThis changeset changes 0 violations,<br />\nintroduces 0 new violations, 0 new errors and 0 new configuration errors,<br />\nremoves 0 violations, 0 errors and 0 configuration errors',
        '<br />\n<a href="https://github',
        'com/pmd/pmd/actions/runs/9017023675?pr=5001">Download full report as build artifact</a></td>\n    </tr>\n  </tbody>\n</table>\n\n<p align="right" data-meta="generated_by_danger">\n  Generated by :no_entry_sign: <a href="https://danger',
        'systems/">Danger</a>\n</p>\n',
      ],
      [
        "Thank you very much for the feedback",
        " Your input  is appreciated :)",
      ],
    ],
    reviewCommentsRaw: [],
  },
  "https://github.com/traccar/traccar": {
    url: "https://github.com/traccar/traccar",
    state: "closed",
    merged: false,
    size: 5,
    "key": "parameters_to_parameters_data_clump-src/main/java/org/traccar/reports/TripsReportProvider.java-org.traccar.reports.TripsReportProvider/method/getObjects(long userId, java.util.Collection<java.lang.Long> deviceIds, java.util.Collection<java.lang.Long> groupIds, java.util.Date from, java.util.Date to)-org.traccar.reports.TripsReportProvider/method/getExcel(java.io.OutputStream outputStream, long userId, java.util.Collection<java.lang.Long> deviceIds, java.util.Collection<java.lang.Long> groupIds, java.util.Date from, java.util.Date to)-userIddeviceIdsgroupIdsfromto",

    type: parameters_to_parameters_data_clump,
    category: "nameSuggestion",
    generalComments: [-Complexity, -RefactoringNotWorthIt],
    reviewComments: [],
    generalCommentsRaw: [
      [
        "I think this just adds more complexity",
        " It doesn't really improve anything",
        "",
      ],
      ["Thank you for the feedback :)"],
    ],
    reviewCommentsRaw: [],
  },
  "https://github.com/apache/linkis": {
    url: "https://github.com/apache/linkis",
    state: "closed",
    merged: true,
    manualChanges: false,
    size: 17,
    "key": "fields_to_fields_data_clump-linkis-extensions/linkis-et-monitor/src/main/java/org/apache/linkis/monitor/jobhistory/entity/JobHistory.java-org.apache.linkis.monitor.jobhistory.entity.JobHistory-org.apache.linkis.jobhistory.entity.JobHistory-logPatherrorDescmetricsengineTypeobserveInfoparamserrorCodesubmitUserupdatedTimestatusupdateTimeMillsexecutionCodejobReqIdcreatedTimelabelsprogressidinstancesexecuteUsersource",
    type: fields_to_fields_data_clump,
    category: "detectAndRefactor",
    generalComments: [],
    reviewComments: [],
    generalCommentsRaw: [
      [
        "Thank you for your refactoring PR, we will review it and give feedback",
        "",
      ],
    ],
    reviewCommentsRaw: [],
  },
  "https://github.com/micrometer-metrics/micrometer": {
    url: "https://github.com/micrometer-metrics/micrometer",
    state: "closed",
    merged: false,
    category: "detectAndRefactor",
    size: 8,
    type: fields_to_fields_data_clump,
    generalComments: [],
    reviewComments: [
      -Readability,
      -Complexity,
      -Performance,
      -DocumentationIssues,
      -SameBaseClass,
      -ExtractedClassShouldNotBePublic,
    ],
    generalCommentsRaw: [
      [
        "Thank you very much for the constructive feedback",
        " The wrong header year is my fault",
        " the LLM didn't generate it and I had to copy",
        " On the other points you are absolutely right and it is also true that not every data clump should be refactored like the LLM suggested :)\r\n",
      ],
    ],
    reviewCommentsRaw: [
      [
        "I think in this particular case having a common `GrpcObservationContext` might be a better solution",
        "\r\n\r\nAlso, I don't think the automated refactoring tool does what you claim:\r\n>reducing complexity and enhancing readability of your source code",
        "\r\n\r\nI think this code is more complex and less readable than it was before",
        " _In some cases_, if we need to change things, this could be an improvement though (in some other cases I thin it is a drawback)",
        "\r\n\r\nAlso now that there is an extra object inside of this class that is heavily used for very short-lived object, introducing this could also mean worse performance (didn't measure)",
        "\r\n\r\n",
      ],
      [
        "Was this really reviewed by a human before opening the PR?\r\nThese mistakes are easy to make even for humans (or miss them during reviews) but it does not help me trusting the PR more",
        "",
      ],
      [
        "I guess this is a completely internal detail and it should not be public",
        "",
      ],
      [
        "Reordering the methods makes this PR hard to review and also, it is not what the PR claims as its goal",
        " If you want to increase readability by reordering the methods, I think that should be a separate PR or it should not do such thing",
        "\r\n\r\nAlso, removing javadoc is something that the automation should not do, it is removing valuable information",
        "",
      ],
    ],
  },
  "https://github.com/uber/NullAway": {
    url: "https://github.com/uber/NullAway",
    state: "closed",
    merged: true,
    manualChanges: true,
    size: 3,
    type: parameters_to_parameters_data_clump,
    category: "filterManual",
    generalComments: [],
    likertData: [[
      {
        scale: Neutral
      },
      {
        scale: Agree
      },
      {
        scale: Disagree
      },
      {
        scale: Agree
      },
      {
        scale: Agree
      },
      {
        scale: Agree
      },

    ]],
    experience: [{
      project: ">2 years",
      java: ">10 years"
    }],
    reviewComments: [
      -JavaRecordBetter,
      -Performance,
      -StyleAdaption,
      -NotEnough,
      -DocumentationIssues,
    ],
    generalCommentsRaw: [
      [
        "[![CLA assistant check](https://cla-assistant",
        "io/pull/badge/signed)](https://cla-assistant",
        "io/uber/NullAway?pullRequest=960) <br/>All committers have signed the CLA",
        "",
      ],
      [
        "Also note that I merged in the latest main branch so best to pull before making further changes",
      ],
      [
        "## [Codecov](https://app",
        "codecov",
        "io/gh/uber/NullAway/pull/960?dropdown=coverage&src=pr&el=h1&utm_medium=referral&utm_source=github&utm_content=comment&utm_campaign=pr+comments&utm_term=uber) Report\nAttention: Patch coverage is `83",
        "05085%` with `10 lines` in your changes missing coverage",
        " Please review",
        "\n> Project coverage is 85",
        "88%",
        " Comparing base [(`c4aed81`)](https://app",
        "codecov",
        "io/gh/uber/NullAway/commit/c4aed81aa6663e1b96182fca980420c807fcfdab?dropdown=coverage&el=desc&utm_medium=referral&utm_source=github&utm_content=comment&utm_campaign=pr+comments&utm_term=uber) to head [(`bbedf7b`)](https://app",
        "codecov",
        "io/gh/uber/NullAway/commit/bbedf7b4b728bb01c9d23e71a15272e321871647?dropdown=coverage&el=desc&utm_medium=referral&utm_source=github&utm_content=comment&utm_campaign=pr+comments&utm_term=uber)",
        "\n\n| [Files](https://app",
        "codecov",
        "io/gh/uber/NullAway/pull/960?dropdown=coverage&src=pr&el=tree&utm_medium=referral&utm_source=github&utm_content=comment&utm_campaign=pr+comments&utm_term=uber) | Patch % | Lines |\n|---|---|---|\n| [",
        "",
        "",
        "/uber/nullaway/handlers/MethodAnalysisContext",
        "java](https://app",
        "codecov",
        "io/gh/uber/NullAway/pull/960?src=pr&el=tree&filepath=nullaway%2Fsrc%2Fmain%2Fjava%2Fcom%2Fuber%2Fnullaway%2Fhandlers%2FMethodAnalysisContext",
        "java&utm_medium=referral&utm_source=github&utm_content=comment&utm_campaign=pr+comments&utm_term=uber#diff-bnVsbGF3YXkvc3JjL21haW4vamF2YS9jb20vdWJlci9udWxsYXdheS9oYW5kbGVycy9NZXRob2RBbmFseXNpc0NvbnRleHQuamF2YQ==) | 44",
        "44% | [10 Missing :warning: ](https://app",
        "codecov",
        "io/gh/uber/NullAway/pull/960?src=pr&el=tree&utm_medium=referral&utm_source=github&utm_content=comment&utm_campaign=pr+comments&utm_term=uber) |\n\n<details><summary>Additional details and impacted files</summary>\n\n\n```diff\n@@             Coverage Diff              @@\n##             master     #960      +/-   ##\n============================================\n- Coverage     85",
        "94%   85",
        "88%   -0",
        "07%     \n- Complexity     2047     2051       +4     \n============================================\n  Files            81       82       +1     \n  Lines          6765     6806      +41     \n  Branches       1305     1312       +7     \n============================================\n+ Hits           5814     5845      +31     \n- Misses          537      547      +10     \n  Partials        414      414              \n```\n\n\n\n</details>\n\n[:umbrella: View full report in Codecov by Sentry](https://app",
        "codecov",
        "io/gh/uber/NullAway/pull/960?dropdown=coverage&src=pr&el=continue&utm_medium=referral&utm_source=github&utm_content=comment&utm_campaign=pr+comments&utm_term=uber)",
        "   \n:loudspeaker: Have feedback on the report? [Share it here](https://about",
        "codecov",
        "io/codecov-pr-comment-feedback/?utm_medium=referral&utm_source=github&utm_content=comment&utm_campaign=pr+comments&utm_term=uber)",
        "\n",
      ],
    ],
    reviewCommentsRaw: [
      [
        "`getMethodSymbol()` used multiple times in this method and should be stored in a local variable",
      ],
      ["Similarly `getState()` is used multiple times"],
      ["`getState()` and `getAnalysis()` used multiple times here"],
      [
        "If we were able to use Java 17 features, I think a record would be perfect for this use case",
        "  Since we cannot use records, I think several changes would help here:\r\n\r\n* This type should be immutable (`final` fields and no setters)",
        "\r\n* It should implement equals, hashCode, and toString",
        " \r\n* Like records, I would avoid the `get` prefix on getter methods; so just have them be `analysis()`, `state()`, and `methodSymbol()`",
        "  \r\n* The type also needs top-level Javadoc",
        "",
      ],
      [
        "Thank you very much for the feedback",
        " I can implement your suggestions in the coming days :)",
      ],
      ["done"],
      [
        "Our convention is to name the `VisitorState` local variables / parameters `state`",
        "  Could we stick to that?  That will actually significantly reduce the size of this PR and make it more readable",
        "",
      ],
      [
        "We can just do `analysis",
        "equals(that",
        "analysis)`, etc",
        " rather than using `Objects",
        "equals` here as none of the fields in this class should ever be null (and we run NullAway on itself to check this)",
      ],
    ],
  },
  "https://github.com/spockframework/spock": {
    url: "https://github.com/spockframework/spock",
    state: "closed",
    merged: false,
    size: 6,
    type: fields_to_fields_data_clump,
    category: "filterManual",
    generalComments: [],
    reviewComments: [
      -SemanticChanges,
      -StyleAdaption,
      -NotEnough,
      -Readability,
    ],
    generalCommentsRaw: [
      [
        "Thank you very much for the feedback",
        " It is absolutely fine if you do not want these changes to be merged",
        " You feedback is still very valuable and I appreciate your time",
      ],
    ],
    reviewCommentsRaw: [
      [
        "This makes the object mutable due the non immutable object and non final field",
        "",
      ],
      [
        "This makes the object mutable due the non immutable object and non final field",
        "",
      ],
      [
        'Also the code change is not better readable then the other one, also the removed "code duplication" increases the overall code size => This does not make the code more maintainable',
        "",
      ],
      [
        "This class does not adhere the formatting rule, code positions e",
        "g",
        " fields before constructor, qualified names  instead of imports etc",
        "\r\nNor is it Immutable, nor has a toString (for debugging purpose) + equal+ hashcode for POJO, etc",
        "\r\n\r\nSo this new class does not make the original code more readable nor is this class maintainable",
        "\r\n",
      ],
      [
        "Nullable annotations are missing, or null checks in the constructor/setter missing",
        "",
      ],
    ],
  },
  "https://github.com/projectlombok/lombok": {
    url: "https://github.com/projectlombok/lombok",
    state: "closed",
    merged: false,
    type: parameters_to_parameters_data_clump,
    size: 8,
    category: "filterSnippet",
    generalComments: [-LLM_Useful],
    reviewComments: [],
    generalCommentsRaw: [
      [
        "> on enhancing code quality through automated refactoring of data clumps, assisted by Large Language Models (LLMs)",
        "\r\n\r\nThe official position of team lombok: That is a masterful sentence that strikes me idiotic",
        "\r\n\r\nNo",
        " Please no",
        " LLMs can, at best, tell you where human eyeballs might wanna have a look",
        " Blanket blasting a boatload of github projects with automated tooling like this is not a good idea",
        "\r\n\r\nPR summarily rejected",
        "\r\n\r\n> Even if you decide not to integrate my changes to your codebase (which is perfectly fine), I ask you to fill out a feedback survey\r\n\r\nWow, so, you write one script and blast a boatload of projects, but all the maintainers are asked to contribute their time to your research project? Oof",
        "\r\n\r\nDid you run your research past an ethics committee? Please provide the contact details for them so I can contact them and explain where they went wrong in allowing this",
        " Thanks!\r\n\r\nNB: Not replying to this is going to help make my case over at your uni's ethics committee",
        "",
      ],
      [
        "Aw, man",
        " Sucky day",
        " I reported you to your uni's ethics committee - see your email",
        " This is",
        "",
        " so not okay",
        " PR, of course, denied",
        "",
      ],
    ],
    reviewCommentsRaw: [],
  },
  "https://github.com/bitcoinj/bitcoinj": {
    url: "https://github.com/bitcoinj/bitcoinj",
    state: "closed",
    merged: false,
    size: 5,
    type: parameters_to_parameters_data_clump,

    category: "filterSnippet",
    generalComments: [],
    reviewComments: [],
    generalCommentsRaw: [],
    reviewCommentsRaw: [],
  },
  "https://github.com/jenkinsci/jenkins": {
    url: "https://github.com/jenkinsci/jenkins",
    state: "open",
    merged: false,
    size: 3,
    type: fields_to_fields_data_clump,
    category: "filterSnippet",
    generalComments: [-SameBaseClass],
    reviewComments: [-ExtractedClassShouldNotBePublic, -NotEnough, -LicenseHeaderMissing],
    generalCommentsRaw: [
      [
        "Yay, your first pull request towards Jenkins core was created successfully! Thank you so much! <br> <br> A contributor will provide feedback soon",
        " Meanwhile, you can join the [chats](https://app",
        "gitter",
        "im/#/room/#jenkins-ci:matrix",
        "org) and [community forums](https://community",
        "jenkins",
        "io/) to connect with other Jenkins users, developers, and maintainers",
        "\n",
      ],
      [
        "> What is common to all classes were you added the ProcessProperties is that they inherit from UnixProcess",
        " So instead adding a new class just for the properties wouldn't it be better to just define the things in UnixProcess?\r\n\r\nThank you for the feedback",
        " In your particular case, that might be a better solution",
        " But the LLM chooses the approach that always works, But I agree that pulling up those fields can also be a solution to solve data clumps :)",
      ],
      [
        "Thank you very much for the feedback",
        " @daniel-beck  You are correct that your proposal is better",
        " I haven't encountered this corner case where fields are shared in derived classes before so it is interesting that the LLM did not spot this",
        ' I can update this PR to use your "pulling fields up proposal" when I find time :)',
      ],
    ],
    reviewCommentsRaw: [
      [
        "Just wondering, in all other places the ProcessProperties are defined transient, why not here?",
      ],
      [
        "Thats seems to be a oversight by me",
        " Spotbug complained that I should add transient everywhere and when it stopped complaining I didn't look more",
        " Strange :)",
      ],
      ["Why is this a public class?"],
      [
        "It's unclear to me why the fields are being made transient",
        " If it's `SE_BAD_FIELD`, wouldn't making `ProcessProperties` `Serializable` address this without potentially causing serialization trouble?\r\n\r\n(FWIW removing the `transient` doesn't fail Spotbugs for me locally",
        ")",
      ],
      ["Please add license header", ""],
      [
        "`OSProcess` is already `Serializable`",
        "\r\n```suggestion\r\n    public abstract class UnixProcess extends OSProcess {\r\n```",
      ],
      ["```suggestion\r\n        protected List<String> arguments;\r\n```"],
      ["Oh sorry, that should not have happened"],
    ],
  },
  "https://github.com/real-logic/aeron": {
    url: "https://github.com/real-logic/aeron",
    state: "closed",
    merged: false,
    size: 6,
    type: parameters_to_parameters_data_clump,
    category: "filterSnippet",
    generalComments: [-LLM_Useful, -RefactoringNotWorthIt],
    reviewComments: [],
    generalCommentsRaw: [
      [
        "We've decided that we will not be taking this PR forward",
        "  The refactoring included does not bring any particular value and at this time we think that LLM and not yet mature enough to be using on projects with the uniqueness and complexity of Aeron",
        "",
      ],
      [
        "Thank you nevertheless for the feedback",
        " If you find time to fill out the survey, it would be really appreciated :)",
      ],
    ],
    reviewCommentsRaw: [],
  },
  "https://github.com/Stirling-Tools/Stirling-PDF": {
    url: "https://github.com/Stirling-Tools/Stirling-PDF",
    state: "closed",
    merged: false,
    size: 5,
    type: parameters_to_parameters_data_clump,
    category: "filterSnippet",
    generalComments: [-JavaRecordBetter],
    reviewComments: [],
    generalCommentsRaw: [
      [
        "## [![Quality Gate Passed](https://sonarsource",
        "github",
        "io/sonarcloud-github-static-resources/v2/checks/QualityGateBadge/qg-passed-20px",
        "png 'Quality Gate Passed')](https://sonarcloud",
        "io/dashboard?id=Stirling-Tools_Stirling-PDF&pullRequest=1395) **Quality Gate passed**  \nIssues  \n![](https://sonarsource",
        "github",
        "io/sonarcloud-github-static-resources/v2/common/passed-16px",
        "png '') [1 New issue](https://sonarcloud",
        "io/project/issues?id=Stirling-Tools_Stirling-PDF&pullRequest=1395&resolved=false&sinceLeakPeriod=true)  \n![](https://sonarsource",
        "github",
        "io/sonarcloud-github-static-resources/v2/common/accepted-16px",
        "png '') [0 Accepted issues](https://sonarcloud",
        "io/project/issues?id=Stirling-Tools_Stirling-PDF&pullRequest=1395&resolutions=WONTFIX)\n\nMeasures  \n![](https://sonarsource",
        "github",
        "io/sonarcloud-github-static-resources/v2/common/passed-16px",
        "png '') [0 Security Hotspots](https://sonarcloud",
        "io/project/security_hotspots?id=Stirling-Tools_Stirling-PDF&pullRequest=1395&resolved=false&sinceLeakPeriod=true)  \n![](https://sonarsource",
        "github",
        "io/sonarcloud-github-static-resources/v2/common/no-data-16px",
        "png '') No data about Coverage  \n![](https://sonarsource",
        "github",
        "io/sonarcloud-github-static-resources/v2/common/passed-16px",
        "png '') [0",
        "0% Duplication on New Code](https://sonarcloud",
        "io/component_measures?id=Stirling-Tools_Stirling-PDF&pullRequest=1395&metric=new_duplicated_lines_density&view=list)  \n  \n[See analysis details on SonarCloud](https://sonarcloud",
        "io/dashboard?id=Stirling-Tools_Stirling-PDF&pullRequest=1395)\n\n",
      ],
      [
        "@compf  id suggest using\r\nhttps://www",
        "baeldung",
        "com/java-record-keyword\r\nfor this",
      ],
      [
        "Thank you for the feedback",
        " Are there other reasons why you have not merged this PR",
        " As I said this i perfectly fine but to improve my tool and further research I need constructive feedback :)",
      ],
    ],
    reviewCommentsRaw: [],
  },
  "https://github.com/jOOQ/jOOQ": {
    url: "https://github.com/jOOQ/jOOQ",
    state: "closed",
    merged: false,
    size: 6,
    type: parameters_to_parameters_data_clump,

    category: "filterSnippet",
    generalComments: [],
    reviewComments: [],
    generalCommentsRaw: [
      [
        "> I ask you to fill out a feedback survey\r\n\r\nI can give you my hourly rate?",
      ],
      [
        "> > I ask you to fill out a feedback survey\r\n> \r\n> I can give you my hourly rate?\r\n\r\nOf course this is voluntary and I don't want to waste anybody's time, if they do not want to participate",
        " My hope is that these refactorings can be the first step to improve the codebase",
        " Giving feedback via GitHub would also be okay :)",
      ],
      [
        "> Giving feedback via GitHub would also be okay :)\r\n\r\nSure I can give it here",
        " What's your budget for my consultancy services?",
      ],
    ],
    reviewCommentsRaw: [],
  },
  "https://github.com/junit-team/junit5": {
    url: "https://github.com/junit-team/junit5",
    state: "closed",
    merged: true,
    size: 4,
    type: parameters_to_parameters_data_clump,
    category: "filterSnippet",
    generalComments: [],
    reviewComments: [
      -ExtractedClassLocation,
      -ExtractedClassShouldNotBePublic,
      -NotEnough,
      -OverEngineered,
    ],
    generalCommentsRaw: [
      [
        "Thank you very much for the feedback",
        "  @marcphilipp I have just applied the suggested changes",
        "\r\n\r\n@mpkorstanje While I like your reasoning, I think this  should  be part of a larger redesign of the test classes",
        " I haven't implement your proposal  for now but I would be happy to do so if others concur",
      ],
      ["@compf Thanks! :+1: "],
    ],
    reviewCommentsRaw: [
      [
        "Please make this a nested class of `LifecycleMethodExecutionExceptionHandlerTests` since it's only used there",
        "",
      ],
      [
        "Since this class is only a local test helper, I don't think we need to encapsulate the fields",
        " Therefore, I think these methods should be inlined",
        "",
      ],
      [
        "As this class isn't used outside of `LifecycleMethodExecutionExceptionHandlerTests` it can be an inner class",
        " This keeps the test contained to its own file, removing the need to consider the counter outside of the context in which it is used",
        "",
      ],
      [
        "With the introduction of the `HandlerCallCounter` there is no need to store the counts as a field in the handler",
        " You could now declare a `HandlerCallCounter rethrowCounter` as a static field on `LifecycleMethodExecutionExceptionHandlerTests` and reference that everywhere",
        " I",
        "e",
        "\r\n\r\n```\r\nassertEquals(1, rethrowCounter",
        'getBeforeAllCalls(), "Exception should handled in @BeforeAll");\r\n```\r\n\r\nWith some thoughtfully chosen method and field names this would reduce the verbosity of the code a bit and keep the whole assertion on a single line',
        "",
      ],
    ],
  },
  "https://github.com/apache/logging-log4j2": {
    url: "https://github.com/apache/logging-log4j2",
    state: "closed",
    merged: false,
    size: 4,
    likertData: [[
      {
        scale: Neutral
      },
      {
        scale: Agree
      },
      {
        scale: StronglyDisagree,

      },
      {
        scale: Agree

      },
      {
        scale: Disagree,
        comments: "`BasicAppenderConfiguration` or `CommonAppenderElements` would be a better choice IMHO.",
        keywords: [-ClassName]
      },
      { scale: Agree },
    ],
    [
      {
        scale: Agree
      },
      {
        scale: Agree
      },
      {
        scale: Neutral
      },
      {
        scale: Agree
      },
      {
        scale: Agree
      },
      {
        scale: Agree

      }
    ]

    ],
    experience: [{
      project: ">2 years",
      java: "<=10 years"

    },
    {
      project: ">2 years",
      java: ">10 years"
    }],
    type: fields_to_fields_data_clump,
    category: "filterManual",
    generalComments: [-RefactoringNotWorthIt, -LLM_LegalIssues],
    reviewComments: [],
    generalCommentsRaw: [
      ["Thank you very much the feedback :)"],
      [
        "@compf,\r\n\r\nI agree with Gary: the refactoring itself doesn't have much value",
        "\r\n\r\nIt would be however interesting to know:\r\n\r\n- why your LLM specifically found this data clump",
        " The group of parameters `Level, Marker, Throwable, String` that starts from `Logger` seems easier to spot",
        "\r\n- did you architecture your model to take into account breaking API changes? I noticed that your refactoring only refactors `private` methods",
        "\r\n- did you publish your model somewhere on Github?",
      ],
      [
        "> @compf,\r\n> \r\n> I agree with Gary: the refactoring itself doesn't have much value",
        "\r\n> \r\n> It would be however interesting to know:\r\n> \r\n>     * why your LLM specifically found this data clump",
        " The group of parameters `Level, Marker, Throwable, String` that starts from `Logger` seems easier to spot",
        "\r\n> \r\n>     * did you architecture your model to take into account breaking API changes? I noticed that your refactoring only refactors `private` methods",
        "\r\n> \r\n>     * did you publish your model somewhere on Github?\r\n\r\nThank you also for the feedback: About your questions\r\n\r\n1 and 2) The LLM chooses the data clumps based on many information",
        " Particularly how many method parameters/ fields are part of the data clump, how often it is repeated in a single file or  in how in many files",
        " Also as you noted the fact that the public interface should not be refactored is important",
        " Since LLMs are blackboxes I cannot say why it has chosen this data clump",
        " However, all this information is  considered, and then there is some manual review by me whether the refactoring would be difficult to achieve",
        " So your Logger example is an important part of the Core API and would never be refactored unless someone really wants to do this :)\r\n\r\n3) I am not training my own LLM",
        " I am using GPT4-1106 from OpenAI",
        " If you mean my source code, you can find it in my GitHub repo (data_clump_solver), but it still in a WIP state and I am continuously using your feedback to improve it if the chosen architecture allows it easily :)",
      ],
      [
        "> I am not training my own LLM",
        " I am using GPT4-1106 from OpenAI\r\n\r\nThat's the basic problem here: You do not know if the end result contains a copy of code under a license that is not allowed in Apache projects",
        "\r\n\r\nUsing a model that trains on open source code would solve that issue for you",
        "\r\n",
      ],
      [
        "> > I am not training my own LLM",
        " I am using GPT4-1106 from OpenAI\r\n> \r\n> That's the basic problem here: You do not know if the end result contains a copy of code under a license that is not allowed in Apache projects",
        "\r\n> \r\n> Using a model that trains on open source code would solve that issue for you",
        "\r\n\r\nThat's a fair point, but I think this would be more relevant if the LLM improved an algorithm or otherwise improve the functionality of software",
        " Such simple refactoring, as was done here, is not very creative and could have been performed by a human or an automated tool",
        "\r\n Nevertheless, I fully agree that one should be absolutely transparent about the use of LLMs and I can understand that this can be a reason to reject such pull requests",
      ],
      [
        "@compf, I am closing this issue due to shared concerns by maintainers",
        " Feel free to re-submit it with requested changes",
        "",
      ],
    ],
    reviewCommentsRaw: [],
  },
  "https://github.com/apache/iceberg": {
    url: "https://github.com/apache/iceberg",
    state: "closed",
    merged: false,
    size: 6,
    type: fields_to_fields_data_clump,
    category: "filterManual",
    generalComments: [
      -Readability,
      -RefactoringNotWorthIt,
      -StyleAdaption,
      -LargerDataClump,
    ],
    reviewComments: [],
    generalCommentsRaw: [
      [
        "I'm also reluctant to do this refactoring",
        " The stats that it pulls are are actual properties on the DataFile: https://iceberg",
        "apache",
        "org/spec/#manifests So I would expect them inside of that class",
        " I don't think this really improves readability or has a major advantage in terms of readability since it adds another layer",
        "",
      ],
      [
        "Thank you very much for this valuable feedback",
        " As I said initially, it is perfectly fine if you reject this pull request",
        " You input is nevertheless appreciated :)",
      ],
    ],
    reviewCommentsRaw: [
      [
        "Iceberg follows its own naming conventions which is agreed by the community\r\nhttps://iceberg",
        "apache",
        "org/contribute/?h=contribute#method-naming\r\n\r\nCan LLM learn this? :D ",
      ],
      [
        "on what basis `fileSizeInBytes` was not included for the `fileStatistics`?",
      ],
    ],
  },
  "https://github.com/google/error-prone": {
    url: "https://github.com/google/error-prone",
    state: "open",
    merged: false,
    size: 3,
    type: parameters_to_parameters_data_clump,
    category: "filterManual",
    generalComments: [],
    reviewComments: [],
    generalCommentsRaw: [],
    reviewCommentsRaw: [],
  },
  "https://github.com/apache/gravitino": {
    url: "https://github.com/apache/gravitino",
    state: "open",
    merged: false,
    size: 4,
    type: fields_to_fields_data_clump,
    category: "filterManual",
    generalComments: [-RefactoringNotWorthIt, -Readability],
    reviewComments: [],
    generalCommentsRaw: [
      [
        "Thanks for your contribution, but I'm not entirely sure these changes add a lot of value",
        " In some cases, I think WET is better than DRY for understandability, but others on the project may have a different view",
        " Perhaps you can explain some more about how the changes might help?",
      ],
      [
        "> Thanks for your contribution, but I'm not entirely sure these changes add a lot of value",
        " In some cases, I think WET is better than DRY for understandability, but others on the project may have a different view",
        " Perhaps you can explain some more about how the changes might help?\r\n\r\nThank you for the feedback",
        " You are right that this refactoring might not always improve readability/usability",
        " In many cases it does however",
        "   Nevertheless, it would be absolutely fine if you decide not to integrate these changes",
        "\r\n I would appreciate  any other feedback on this proposed refactoring or in which cases a similar refactoring might be useful :)",
      ],
    ],
    reviewCommentsRaw: [],
  },
  "https://github.com/eclipse-vertx/vert.x": {
    url: "https://github.com/eclipse-vertx/vert.x",
    state: "closed",
    merged: false,
    size: 5,
    type: parameters_to_parameters_data_clump,
    category: "filterManual",
    generalComments: [-InvalidPR],
    reviewComments: [],
    generalCommentsRaw: [],
    reviewCommentsRaw: [],
  },
  "https://github.com/spring-io/initializr": {
    url: "https://github.com/spring-io/initializr",
    state: "closed",
    merged: false,
    size: 7,
    type: fields_to_fields_data_clump,
    category: "filterManual",
    generalComments: [-LLM_LegalIssues, -Readability],
    reviewComments: [],
    generalCommentsRaw: [
      [
        "Thanks for the PR and for the disclosure that the code was generated by an LLM",
        " Unfortunately, the copyright situation around LLM-generated code is sufficiently unclear that the risks of accepting this contribution outweigh the potential benefits",
        "\r\n\r\nFWIW, I'm not sure that this change is for the better, irrespective of how it was written",
        " Perhaps if the project data was exposed directly rather than through numerous delegate methods, it would have been an improvement",
        " As things stand, it's really only reduced the number of field declarations while making the code that accesses those fields more verbose due to the additional indirection",
        "",
      ],
      ["Thank you very much for the feedback :)"],
    ],
    reviewCommentsRaw: [],
  },
  "https://github.com/AutoMQ/automq": {
    url: "https://github.com/AutoMQ/automq",
    state: "closed",
    merged: true,
    size: 7,
    type: parameters_to_parameters_data_clump,
    category: "filterSnippet",
    generalComments: [],
    reviewComments: [],
    generalCommentsRaw: [
      [
        "[![CLA assistant check](https://cla-assistant",
        "io/pull/badge/signed)](https://cla-assistant",
        "io/AutoMQ/automq?pullRequest=1663) <br/>All committers have signed the CLA",
        "",
      ],
      [
        "@compf Hi, thanks for your commit, could you please look at the failed check and fix the pr title as per specified in https://www",
        "conventionalcommits",
        "org/en/v1",
        "0",
        "0/#summary",
      ],
      [
        "The check seems not to trigger again, but I amended the commit as requested :)",
      ],
    ],
    reviewCommentsRaw: [],
  },
  "https://github.com/thingsboard/thingsboard": {
    url: "https://github.com/thingsboard/thingsboard",
    state: "closed",
    merged: false,
    size: 21,
    type: fields_to_fields_data_clump,
    category: "filterManual",
    generalComments: [-RefactoringNotWorthIt],
    reviewComments: [],
    generalCommentsRaw: [
      [
        "I don't like the proposed changes and have no idea why to change this part of the code",
        " so I am declining the PR",
        " ",
      ],
      ["Thank you nevertheless for the feedback :)"],
    ],
    reviewCommentsRaw: [],
  },
  "https://github.com/OpenRefine/OpenRefine": {
    url: "https://github.com/OpenRefine/OpenRefine",
    state: "closed",
    merged: false,
    size: 3,
    type: fields_to_fields_data_clump,
    category: "filterSnippet",
    generalComments: [-InvalidPR],
    reviewComments: [],
    generalCommentsRaw: [
      [
        "Thanks for the contribution! It's always interesting to see what types of refactorings are proposed, so we'll definitely review this",
        " \r\n\r\nIn the mean time, can you please address the lint failures? Running `",
        "/refine lint` and committing the result should do the trick",
        "",
      ],
      [
        "It looks like there are a couple of tests failing",
        " You can run the unit tests locally with `",
        "/refine test`",
      ],
      [
        "Ok, it seems that the refactoring as suggested by the LLM does not work as nicely as hoped",
        " I will note that and close this PR because it is not the purpose of the master thesis to make many manual correction in order for all unit tests to pass",
        " Thank you again for your feedback :)",
      ],
      [
        "@compf may I suggest that you could already check on your side whether the test suite still succeeds after your changes, before opening your pull request?\r\nFor most projects, you'll find that running the test suite is reasonably well documented",
        " That would spare a lot of time from project maintainers",
        "",
      ],
      [
        "> @compf may I suggest that you could already check on your side whether the test suite still succeeds after your changes, before opening your pull request? For most projects, you'll find that running the test suite is reasonably well documented",
        " That would spare a lot of time from project maintainers",
        "\r\n\r\nI am already doing this and I am very sure that I did not spot a failing test or linting problem before I opened the PR",
        " I don't know what went wrong in this case (maybe a cache issue)  but it should not have happened",
        " This is the first instance in about 40 projects where my carefulness seems to be not enough",
        " So I am very sorry for wasting anybody's time ",
      ],
    ],
    reviewCommentsRaw: [],
  },
  "https://github.com/mybatis/mybatis-3": {
    url: "https://github.com/mybatis/mybatis-3",
    state: "closed",
    merged: false,
    size: 6,
    type: parameters_to_parameters_data_clump,
    category: "filterManual",
    generalComments: [-Performance, +Complexity, +Readability],
    reviewComments: [],
    generalCommentsRaw: [
      [
        "Hello @compf ,\r\n\r\nWe currently do not accept auto-generated PRs",
        "\r\nWe simply don't have enough resources to review them",
        "\r\nWe'll let you know if we reconsider it in the future",
        "\r\n\r\nThank you and good luck with your project!",
      ],
      [
        "Thank you nevertheless for the quick feedback",
        " I tried to minimize the number of affected files  and this would be my only PR, but I totally understand your policy",
        " If you find still time to give a short feedback (without necessarily merging the PR), it would be greatly appreciated but of course I do not want to be a burden on you :)",
      ],
      [
        "Mapping is the most demanding part in terms of performance",
        "\r\nI obviously didn't do proper profiling etc",
        " to evaluate, but the change seems to be less efficient as it introduces a new class to create",
        "\r\nReducing complexity/improving readability is great, but it does not have the highest priority in this part",
        "\r\n",
      ],
      ["Thank you very much for the feedback :)"],
    ],
    reviewCommentsRaw: [],
  },
  "https://github.com/OpenFeign/feign": {
    url: "https://github.com/OpenFeign/feign",
    state: "closed",
    merged: true,
    size: 9,
    type: fields_to_fields_data_clump,
    category: "filterManual",
    generalComments: [-NotEnough],
    reviewComments: [],
    generalCommentsRaw: [
      ["I would love to see this on https://github", "com/OpenFeign/querydsl"],
      [
        "> I would love to see this on https://github",
        "com/OpenFeign/querydsl\r\n\r\nI could not compile this project (e",
        "g class QEntityTest_Entity1 cannot be found), but when this is solved I am happy to make a separate PR for this project :)",
      ],
      [
        "This pull request sets up GitHub code scanning for this repository",
        " Once the scans have completed and the checks have passed, the analysis results for this pull request branch will appear on [this overview](/OpenFeign/feign/security/code-scanning?query=pr%3A2497+is%3Aopen)",
        " Once you merge this pull request, the 'Security' tab will show more code scanning analysis results (for example, for the default branch)",
        " Depending on your configuration and choice of analysis tool, future pull requests will be annotated with code scanning analysis results",
        " For more information about GitHub code scanning, check out [the documentation](https://docs",
        "github",
        "com/code-security/code-scanning/automatically-scanning-your-code-for-vulnerabilities-and-errors/about-code-scanning)",
        " ",
      ],
      [
        "> > I would love to see this on https://github",
        "com/OpenFeign/querydsl\r\n> \r\n> I could not compile this project (e",
        "g class QEntityTest_Entity1 cannot be found), but when this is solved I am happy to make a separate PR for this project :)\r\n\r\nYou need java 21 and can run a quick build by running:\r\n\r\n```\r\n",
        "/mvnw -Dtoolchain",
        "skip=true  -P examples,quickbuild,dev clean install\r\n```\r\n\r\nThis will skip tests, code formatter and other checks",
      ],
    ],
    reviewCommentsRaw: [],
  },
};
