import { DataClumpsTypeContext } from "data-clumps-type-context";
import { AST_Class } from "../src/context/AST_Type";

export const AST_DATA:{[path:string]:AST_Class}={
   "src/main/java/org/example/dogData/DogHelper.java": {
        "name" : "DogHelper",
        "key" : "org.example.dogData.DogHelper",
        "type" : "class",
        "hasTypeVariable" : false,
        "position" : {
          "startLine" : 8,
          "startColumn" : 8,
          "endLine" : 8,
          "endColumn" : 13
        },
        "modifiers" : [ "PUBLIC" ],
        "fields" : { },
        "methods" : {
          "org.example.dogData.DogHelper/method/isAdult(int birthYear, int birthMonth, int birthDay)" : {
            "name" : "isAdult",
            "key" : "org.example.dogData.DogHelper/method/isAdult(int birthYear, int birthMonth, int birthDay)",
            "type" : "boolean",
            "classOrInterfaceKey": "org.example.dogData.DogHelper",
            "hasTypeVariable" : false,
            "position" : {
              "startLine" : 9,
              "startColumn" : 20,
              "endLine" : 9,
              "endColumn" : 27
            },
            "returnType" : "boolean",
            "modifiers" : [ "PUBLIC" ],
            "overrideAnnotation" : false,
            "parameters" : [ {
              "name" : "birthYear",
              "key" : "org.example.dogData.DogHelper/method/isAdult(int birthYear, int birthMonth, int birthDay)/parameter/birthYear",
              "type" : "int",
              "hasTypeVariable" : false,
              "position" : {
                "startLine" : 9,
                "startColumn" : 32,
                "endLine" : 9,
                "endColumn" : 41
              },
              "modifiers" : [ ],
              "ignore" : false,
              "methodKey" : "org.example.dogData.DogHelper/method/isAdult(int birthYear, int birthMonth, int birthDay)"
            }, {
              "name" : "birthMonth",
              "key" : "org.example.dogData.DogHelper/method/isAdult(int birthYear, int birthMonth, int birthDay)/parameter/birthMonth",
              "type" : "int",
              "hasTypeVariable" : false,
              "position" : {
                "startLine" : 9,
                "startColumn" : 46,
                "endLine" : 9,
                "endColumn" : 56
              },
              "modifiers" : [ ],
              "ignore" : false,
              "methodKey" : "org.example.dogData.DogHelper/method/isAdult(int birthYear, int birthMonth, int birthDay)"
            }, {
              "name" : "birthDay",
              "key" : "org.example.dogData.DogHelper/method/isAdult(int birthYear, int birthMonth, int birthDay)/parameter/birthDay",
              "type" : "int",
              "hasTypeVariable" : false,
              "position" : {
                "startLine" : 9,
                "startColumn" : 61,
                "endLine" : 9,
                "endColumn" : 69
              },
              "modifiers" : [ ],
              "ignore" : false,
              "methodKey" : "org.example.dogData.DogHelper/method/isAdult(int birthYear, int birthMonth, int birthDay)"
            } ],
          }
        },
        "file_path" : "src/main/java/org/example/dogData/DogHelper.java",
        "anonymous" : false,
        "auxclass" : false,
        "implements_" : [ "org.example.dogData.org.example.interfaces.AgeChecker" ],
        "extends_" : [ ],
        "definedInClassOrInterfaceTypeKey" : null,
        "innerDefinedClasses" : {
          "org.example.dogData.DogHelper.MySecondByte" : {
            "name" : "MySecondByte",
            "key" : "org.example.dogData.DogHelper.MySecondByte",
            "type" : "class",
            "hasTypeVariable" : false,
            "position" : {
              "startLine" : 13,
              "startColumn" : 19,
              "endLine" : 13,
              "endColumn" : 24
            },
            "modifiers" : [ "PUBLIC", "STATIC" ],
            "fields" : {
              "org.example.dogData.DogHelper.MySecondByte/memberField/b7" : {
                "name" : "b7",
                "key" : "org.example.dogData.DogHelper.MySecondByte/memberField/b7",
                "type" : "boolean",
                "hasTypeVariable" : false,
                "position" : {
                  "startLine" : 21,
                  "startColumn" : 24,
                  "endLine" : 21,
                  "endColumn" : 26
                },
                "modifiers" : [ "PUBLIC" ],
                "ignore" : false,
                "memberFieldKey" : null,
                "classOrInterfaceKey" : "org.example.dogData.DogHelper.MySecondByte"
              },
              "org.example.dogData.DogHelper.MySecondByte/memberField/b6" : {
                "name" : "b6",
                "key" : "org.example.dogData.DogHelper.MySecondByte/memberField/b6",
                "type" : "boolean",
                "hasTypeVariable" : false,
                "position" : {
                  "startLine" : 20,
                  "startColumn" : 24,
                  "endLine" : 20,
                  "endColumn" : 26
                },
                "modifiers" : [ "PUBLIC" ],
                "ignore" : false,
                "memberFieldKey" : null,
                "classOrInterfaceKey" : "org.example.dogData.DogHelper.MySecondByte"
              },
              "org.example.dogData.DogHelper.MySecondByte/memberField/b3" : {
                "name" : "b3",
                "key" : "org.example.dogData.DogHelper.MySecondByte/memberField/b3",
                "type" : "boolean",
                "hasTypeVariable" : false,
                "position" : {
                  "startLine" : 17,
                  "startColumn" : 24,
                  "endLine" : 17,
                  "endColumn" : 26
                },
                "modifiers" : [ "PUBLIC" ],
                "ignore" : false,
                "memberFieldKey" : null,
                "classOrInterfaceKey" : "org.example.dogData.DogHelper.MySecondByte"
              },
              "org.example.dogData.DogHelper.MySecondByte/memberField/b2" : {
                "name" : "b2",
                "key" : "org.example.dogData.DogHelper.MySecondByte/memberField/b2",
                "type" : "boolean",
                "hasTypeVariable" : false,
                "position" : {
                  "startLine" : 16,
                  "startColumn" : 24,
                  "endLine" : 16,
                  "endColumn" : 26
                },
                "modifiers" : [ "PUBLIC" ],
                "ignore" : false,
                "memberFieldKey" : null,
                "classOrInterfaceKey" : "org.example.dogData.DogHelper.MySecondByte"
              },
              "org.example.dogData.DogHelper.MySecondByte/memberField/b5" : {
                "name" : "b5",
                "key" : "org.example.dogData.DogHelper.MySecondByte/memberField/b5",
                "type" : "boolean",
                "hasTypeVariable" : false,
                "position" : {
                  "startLine" : 19,
                  "startColumn" : 24,
                  "endLine" : 19,
                  "endColumn" : 26
                },
                "modifiers" : [ "PUBLIC" ],
                "ignore" : false,
                "memberFieldKey" : null,
                "classOrInterfaceKey" : "org.example.dogData.DogHelper.MySecondByte"
              },
              "org.example.dogData.DogHelper.MySecondByte/memberField/b4" : {
                "name" : "b4",
                "key" : "org.example.dogData.DogHelper.MySecondByte/memberField/b4",
                "type" : "boolean",
                "hasTypeVariable" : false,
                "position" : {
                  "startLine" : 18,
                  "startColumn" : 24,
                  "endLine" : 18,
                  "endColumn" : 26
                },
                "modifiers" : [ "PUBLIC" ],
                "ignore" : false,
                "memberFieldKey" : null,
                "classOrInterfaceKey" : "org.example.dogData.DogHelper.MySecondByte"
              },
              "org.example.dogData.DogHelper.MySecondByte/memberField/b1" : {
                "name" : "b1",
                "key" : "org.example.dogData.DogHelper.MySecondByte/memberField/b1",
                "type" : "boolean",
                "hasTypeVariable" : false,
                "position" : {
                  "startLine" : 15,
                  "startColumn" : 24,
                  "endLine" : 15,
                  "endColumn" : 26
                },
                "modifiers" : [ "PUBLIC" ],
                "ignore" : false,
                "memberFieldKey" : null,
                "classOrInterfaceKey" : "org.example.dogData.DogHelper.MySecondByte"
              },
              "org.example.dogData.DogHelper.MySecondByte/memberField/b0" : {
                "name" : "b0",
                "key" : "org.example.dogData.DogHelper.MySecondByte/memberField/b0",
                "type" : "boolean",
                "hasTypeVariable" : false,
                "position" : {
                  "startLine" : 14,
                  "startColumn" : 24,
                  "endLine" : 14,
                  "endColumn" : 26
                },
                "modifiers" : [ "PUBLIC" ],
                "ignore" : false,
                "memberFieldKey" : null,
                "classOrInterfaceKey" : "org.example.dogData.DogHelper.MySecondByte"
              }
            },
            "methods" : { },
            "file_path" : "src/main/java/org/example/dogData/DogHelper.java",
            "anonymous" : false,
            "auxclass" : false,
            "implements_" : [ ],
            "extends_" : [ ],
            "definedInClassOrInterfaceTypeKey" : "org.example.dogData.DogHelper",
            "innerDefinedClasses" : { },
            "innerDefinedInterfaces" : { }
          }
        },
        "innerDefinedInterfaces" : { }
      },
      "src/main/java/org/example/interfaces/AgeChecker.java": {
        "name" : "AgeChecker",
        "key" : "org.example.interfaces.AgeChecker",
        "type" : "interface",
        "hasTypeVariable" : false,
        "position" : {
          "startLine" : 3,
          "startColumn" : 8,
          "endLine" : 3,
          "endColumn" : 17
        },
        "modifiers" : [ "PUBLIC", "ABSTRACT" ],
        "fields" : { },
        "methods" : {
          "org.example.interfaces.AgeChecker/method/isAdult(int birthYear, int birthMonth, int birthDay)" : {
            "name" : "isAdult",
            "key" : "org.example.interfaces.AgeChecker/method/isAdult(int birthYear, int birthMonth, int birthDay)",
            "type" : "boolean",
            "hasTypeVariable" : false,
            "position" : {
              "startLine" : 4,
              "startColumn" : 13,
              "endLine" : 4,
              "endColumn" : 20
            },
            "modifiers" : [ "PUBLIC", "ABSTRACT" ],
            "overrideAnnotation" : false,
            "returnType" : null,
            "parameters" : [ {
              "name" : "birthYear",
              "key" : "org.example.interfaces.AgeChecker/method/isAdult(int birthYear, int birthMonth, int birthDay)/parameter/birthYear",
              "type" : "int",
              "hasTypeVariable" : false,
              "position" : {
                "startLine" : 4,
                "startColumn" : 25,
                "endLine" : 4,
                "endColumn" : 34
              },
              "modifiers" : [ ],
              "ignore" : false,
              "methodKey" : "org.example.interfaces.AgeChecker/method/isAdult(int birthYear, int birthMonth, int birthDay)"
            }, {
              "name" : "birthMonth",
              "key" : "org.example.interfaces.AgeChecker/method/isAdult(int birthYear, int birthMonth, int birthDay)/parameter/birthMonth",
              "type" : "int",
              "hasTypeVariable" : false,
              "position" : {
                "startLine" : 4,
                "startColumn" : 39,
                "endLine" : 4,
                "endColumn" : 49
              },
              "modifiers" : [ ],
              "ignore" : false,
              "methodKey" : "org.example.interfaces.AgeChecker/method/isAdult(int birthYear, int birthMonth, int birthDay)"
            }, {
              "name" : "birthDay",
              "key" : "org.example.interfaces.AgeChecker/method/isAdult(int birthYear, int birthMonth, int birthDay)/parameter/birthDay",
              "type" : "int",
              "hasTypeVariable" : false,
              "position" : {
                "startLine" : 4,
                "startColumn" : 54,
                "endLine" : 4,
                "endColumn" : 62
              },
              "modifiers" : [ ],
              "ignore" : false,
              "methodKey" : "org.example.interfaces.AgeChecker/method/isAdult(int birthYear, int birthMonth, int birthDay)"
            } ],
            "classOrInterfaceKey" : "org.example.interfaces.AgeChecker"
          }
        },
        "file_path" : "src/main/java/org/example/interfaces/AgeChecker.java",
        "anonymous" : false,
        "auxclass" : false,
        "implements_" : [ ],
        "extends_" : [ ],
        "definedInClassOrInterfaceTypeKey" : null,
        "innerDefinedClasses" : { },
        "innerDefinedInterfaces" : { }
      },
      "src/main/java/org/example/DaysCalculator.java": {
        "name" : "DaysCalculator",
        "key" : "org.example.interfaces.DaysCalculator",
        "type" : "interface",
        "hasTypeVariable" : false,
        "position" : {
          "startLine" : 3,
          "startColumn" : 8,
          "endLine" : 3,
          "endColumn" : 17
        },
        "modifiers" : [ "PUBLIC", "ABSTRACT" ],
        "fields" : { },
        "methods" : {
          "org.example.interfaces.DaysCalculator/method/getAgeInDays(int birthYear, int birthDay, int birthMonth)" : {
            "name" : "getAgeInDays",
            "key" : "org.example.interfaces.DaysCalculator/method/getAgeInDays(int birthYear, int birthDay, int birthMonth)",
            "type" : "int",
            "hasTypeVariable" : false,
            "position" : {
              "startLine" : 4,
              "startColumn" : 9,
              "endLine" : 4,
              "endColumn" : 21
            },
            "modifiers" : [ "PUBLIC", "ABSTRACT" ],
            "overrideAnnotation" : false,
            "returnType" : null,
            "parameters" : [ {
              "name" : "birthYear",
              "key" : "org.example.interfaces.DaysCalculator/method/getAgeInDays(int birthYear, int birthDay, int birthMonth)/parameter/birthYear",
              "type" : "int",
              "hasTypeVariable" : false,
              "position" : {
                "startLine" : 4,
                "startColumn" : 26,
                "endLine" : 4,
                "endColumn" : 35
              },
              "modifiers" : [ ],
              "ignore" : false,
              "methodKey" : "org.example.interfaces.DaysCalculator/method/getAgeInDays(int birthYear, int birthDay, int birthMonth)"
            }, {
              "name" : "birthDay",
              "key" : "org.example.interfaces.DaysCalculator/method/getAgeInDays(int birthYear, int birthDay, int birthMonth)/parameter/birthDay",
              "type" : "int",
              "hasTypeVariable" : false,
              "position" : {
                "startLine" : 4,
                "startColumn" : 40,
                "endLine" : 4,
                "endColumn" : 48
              },
              "modifiers" : [ ],
              "ignore" : false,
              "methodKey" : "org.example.interfaces.DaysCalculator/method/getAgeInDays(int birthYear, int birthDay, int birthMonth)"
            }, {
              "name" : "birthMonth",
              "key" : "org.example.interfaces.DaysCalculator/method/getAgeInDays(int birthYear, int birthDay, int birthMonth)/parameter/birthMonth",
              "type" : "int",
              "hasTypeVariable" : false,
              "position" : {
                "startLine" : 4,
                "startColumn" : 53,
                "endLine" : 4,
                "endColumn" : 63
              },
              "modifiers" : [ ],
              "ignore" : false,
              "methodKey" : "org.example.interfaces.DaysCalculator/method/getAgeInDays(int birthYear, int birthDay, int birthMonth)"
            } ],
            "classOrInterfaceKey" : "org.example.interfaces.DaysCalculator"
          }
        },
        "file_path" : "src/main/java/org/example/interfaces/DaysCalculator.java",
        "anonymous" : false,
        "auxclass" : false,
        "implements_" : [ ],
        "extends_" : [ ],
        "definedInClassOrInterfaceTypeKey" : null,
        "innerDefinedClasses" : { },
        "innerDefinedInterfaces" : { }
      },
      "src/test/java/org/example/MainTest.java":{
        "name" : "DaysCalculator",
        "key" : "org.example.interfaces.DaysCalculator",
        "type" : "interface",
        "hasTypeVariable" : false,
        "position" : {
          "startLine" : 3,
          "startColumn" : 8,
          "endLine" : 3,
          "endColumn" : 17
        },
        "modifiers" : [ "PUBLIC", "ABSTRACT" ],
        "fields" : { },
        "methods" : {
          "org.example.interfaces.DaysCalculator/method/getAgeInDays(int birthYear, int birthDay, int birthMonth)" : {
            "name" : "getAgeInDays",
            "key" : "org.example.interfaces.DaysCalculator/method/getAgeInDays(int birthYear, int birthDay, int birthMonth)",
            "type" : "int",
            "hasTypeVariable" : false,
            "position" : {
              "startLine" : 4,
              "startColumn" : 9,
              "endLine" : 4,
              "endColumn" : 21
            },
            "modifiers" : [ "PUBLIC", "ABSTRACT" ],
            "overrideAnnotation" : false,
            "returnType" : null,
            "parameters" : [ {
              "name" : "birthYear",
              "key" : "org.example.interfaces.DaysCalculator/method/getAgeInDays(int birthYear, int birthDay, int birthMonth)/parameter/birthYear",
              "type" : "int",
              "hasTypeVariable" : false,
              "position" : {
                "startLine" : 4,
                "startColumn" : 26,
                "endLine" : 4,
                "endColumn" : 35
              },
              "modifiers" : [ ],
              "ignore" : false,
              "methodKey" : "org.example.interfaces.DaysCalculator/method/getAgeInDays(int birthYear, int birthDay, int birthMonth)"
            }, {
              "name" : "birthDay",
              "key" : "org.example.interfaces.DaysCalculator/method/getAgeInDays(int birthYear, int birthDay, int birthMonth)/parameter/birthDay",
              "type" : "int",
              "hasTypeVariable" : false,
              "position" : {
                "startLine" : 4,
                "startColumn" : 40,
                "endLine" : 4,
                "endColumn" : 48
              },
              "modifiers" : [ ],
              "ignore" : false,
              "methodKey" : "org.example.interfaces.DaysCalculator/method/getAgeInDays(int birthYear, int birthDay, int birthMonth)"
            }, {
              "name" : "birthMonth",
              "key" : "org.example.interfaces.DaysCalculator/method/getAgeInDays(int birthYear, int birthDay, int birthMonth)/parameter/birthMonth",
              "type" : "int",
              "hasTypeVariable" : false,
              "position" : {
                "startLine" : 4,
                "startColumn" : 53,
                "endLine" : 4,
                "endColumn" : 63
              },
              "modifiers" : [ ],
              "ignore" : false,
              "methodKey" : "org.example.interfaces.DaysCalculator/method/getAgeInDays(int birthYear, int birthDay, int birthMonth)"
            } ],
            "classOrInterfaceKey" : "org.example.interfaces.DaysCalculator"
          }
        },
        "file_path" : "src/main/java/org/example/interfaces/DaysCalculator.java",
        "anonymous" : false,
        "auxclass" : false,
        "implements_" : [ ],
        "extends_" : [ ],
        "definedInClassOrInterfaceTypeKey" : null,
        "innerDefinedClasses" : { },
        "innerDefinedInterfaces" : { }
      },
      "src/main/java/org/example/personData/PersonHelper.java": {
        "name" : "PersonHelper",
        "key" : "org.example.personData.PersonHelper",
        "type" : "class",
        "hasTypeVariable" : false,
        "position" : {
          "startLine" : 8,
          "startColumn" : 8,
          "endLine" : 8,
          "endColumn" : 13
        },
        "modifiers" : [ "PUBLIC" ],
        "fields" : { },
        "methods" : {
          "org.example.personData.PersonHelper/method/getAgeInDays(int birthYear, int birthDay, int birthMonth)" : {
            "name" : "getAgeInDays",
            "key" : "org.example.personData.PersonHelper/method/getAgeInDays(int birthYear, int birthDay, int birthMonth)",
            "type" : "int",
            "hasTypeVariable" : false,
            "position" : {
              "startLine" : 29,
              "startColumn" : 16,
              "endLine" : 29,
              "endColumn" : 28
            },
            "modifiers" : [ "PUBLIC" ],
            "overrideAnnotation" : true,
            "returnType" : null,
            "parameters" : [ {
              "name" : "birthYear",
              "key" : "org.example.personData.PersonHelper/method/getAgeInDays(int birthYear, int birthDay, int birthMonth)/parameter/birthYear",
              "type" : "int",
              "hasTypeVariable" : false,
              "position" : {
                "startLine" : 29,
                "startColumn" : 33,
                "endLine" : 29,
                "endColumn" : 42
              },
              "modifiers" : [ ],
              "ignore" : false,
              "methodKey" : "org.example.personData.PersonHelper/method/getAgeInDays(int birthYear, int birthDay, int birthMonth)"
            }, {
              "name" : "birthDay",
              "key" : "org.example.personData.PersonHelper/method/getAgeInDays(int birthYear, int birthDay, int birthMonth)/parameter/birthDay",
              "type" : "int",
              "hasTypeVariable" : false,
              "position" : {
                "startLine" : 29,
                "startColumn" : 48,
                "endLine" : 29,
                "endColumn" : 56
              },
              "modifiers" : [ ],
              "ignore" : false,
              "methodKey" : "org.example.personData.PersonHelper/method/getAgeInDays(int birthYear, int birthDay, int birthMonth)"
            }, {
              "name" : "birthMonth",
              "key" : "org.example.personData.PersonHelper/method/getAgeInDays(int birthYear, int birthDay, int birthMonth)/parameter/birthMonth",
              "type" : "int",
              "hasTypeVariable" : false,
              "position" : {
                "startLine" : 29,
                "startColumn" : 62,
                "endLine" : 29,
                "endColumn" : 72
              },
              "modifiers" : [ ],
              "ignore" : false,
              "methodKey" : "org.example.personData.PersonHelper/method/getAgeInDays(int birthYear, int birthDay, int birthMonth)"
            } ],
            "classOrInterfaceKey" : "org.example.personData.PersonHelper"
          },
          "org.example.personData.PersonHelper/method/isAdult(int birthYear, int birthMonth, int birthDay)" : {
            "name" : "isAdult",
            "key" : "org.example.personData.PersonHelper/method/isAdult(int birthYear, int birthMonth, int birthDay)",
            "type" : "boolean",
            "hasTypeVariable" : false,
            "position" : {
              "startLine" : 9,
              "startColumn" : 20,
              "endLine" : 9,
              "endColumn" : 27
            },
            "modifiers" : [ "PUBLIC" ],
            "overrideAnnotation" : false,
            "returnType" : null,
            "parameters" : [ {
              "name" : "birthYear",
              "key" : "org.example.personData.PersonHelper/method/isAdult(int birthYear, int birthMonth, int birthDay)/parameter/birthYear",
              "type" : "int",
              "hasTypeVariable" : false,
              "position" : {
                "startLine" : 9,
                "startColumn" : 32,
                "endLine" : 9,
                "endColumn" : 41
              },
              "modifiers" : [ ],
              "ignore" : false,
              "methodKey" : "org.example.personData.PersonHelper/method/isAdult(int birthYear, int birthMonth, int birthDay)"
            }, {
              "name" : "birthMonth",
              "key" : "org.example.personData.PersonHelper/method/isAdult(int birthYear, int birthMonth, int birthDay)/parameter/birthMonth",
              "type" : "int",
              "hasTypeVariable" : false,
              "position" : {
                "startLine" : 9,
                "startColumn" : 46,
                "endLine" : 9,
                "endColumn" : 56
              },
              "modifiers" : [ ],
              "ignore" : false,
              "methodKey" : "org.example.personData.PersonHelper/method/isAdult(int birthYear, int birthMonth, int birthDay)"
            }, {
              "name" : "birthDay",
              "key" : "org.example.personData.PersonHelper/method/isAdult(int birthYear, int birthMonth, int birthDay)/parameter/birthDay",
              "type" : "int",
              "hasTypeVariable" : false,
              "position" : {
                "startLine" : 9,
                "startColumn" : 61,
                "endLine" : 9,
                "endColumn" : 69
              },
              "modifiers" : [ ],
              "ignore" : false,
              "methodKey" : "org.example.personData.PersonHelper/method/isAdult(int birthYear, int birthMonth, int birthDay)"
            } ],
            "classOrInterfaceKey" : "org.example.personData.PersonHelper"
          }
        },
        "file_path" : "src/main/java/org/example/personData/PersonHelper.java",
        "anonymous" : false,
        "auxclass" : false,
        "implements_" : [ "org.example.personData.org.example.interfaces.AgeChecker", "org.example.personData.org.example.interfaces.DaysCalculator" ],
        "extends_" : [ ],
        "definedInClassOrInterfaceTypeKey" : null,
        "innerDefinedClasses" : { },
        "innerDefinedInterfaces" : { }
      },
      "src/main/java/org/example/Player.java": {
        "name" : "Player",
        "key" : "org.example.Player",
        "type" : "class",
        "hasTypeVariable" : false,
        "position" : {
          "startLine" : 5,
          "startColumn" : 8,
          "endLine" : 5,
          "endColumn" : 13
        },
        "modifiers" : [ "PUBLIC" ],
        "fields" : {
          "org.example.Player/memberField/x" : {
            "name" : "x",
            "key" : "org.example.Player/memberField/x",
            "type" : "int",
            "hasTypeVariable" : false,
            "position" : {
              "startLine" : 6,
              "startColumn" : 17,
              "endLine" : 6,
              "endColumn" : 18
            },
            "modifiers" : [ "PRIVATE" ],
            "ignore" : false,
            "memberFieldKey" : null,
            "classOrInterfaceKey" : "org.example.Player"
          },
          "org.example.Player/memberField/y" : {
            "name" : "y",
            "key" : "org.example.Player/memberField/y",
            "type" : "int",
            "hasTypeVariable" : false,
            "position" : {
              "startLine" : 6,
              "startColumn" : 19,
              "endLine" : 6,
              "endColumn" : 20
            },
            "modifiers" : [ "PRIVATE" ],
            "ignore" : false,
            "memberFieldKey" : null,
            "classOrInterfaceKey" : "org.example.Player"
          },
          "org.example.Player/memberField/z" : {
            "name" : "z",
            "key" : "org.example.Player/memberField/z",
            "type" : "int",
            "hasTypeVariable" : false,
            "position" : {
              "startLine" : 6,
              "startColumn" : 21,
              "endLine" : 6,
              "endColumn" : 22
            },
            "modifiers" : [ "PRIVATE" ],
            "ignore" : false,
            "memberFieldKey" : null,
            "classOrInterfaceKey" : "org.example.Player"
          },
          "org.example.Player/memberField/name" : {
            "name" : "name",
            "key" : "org.example.Player/memberField/name",
            "type" : "java.lang.String",
            "hasTypeVariable" : false,
            "position" : {
              "startLine" : 7,
              "startColumn" : 20,
              "endLine" : 7,
              "endColumn" : 24
            },
            "modifiers" : [ "PRIVATE" ],
            "ignore" : false,
            "memberFieldKey" : null,
            "classOrInterfaceKey" : "org.example.Player"
          }
        },
        "methods" : {
          "org.example.Player/method/teleport(int x, int y, int z)" : {
            "name" : "teleport",
            "key" : "org.example.Player/method/teleport(int x, int y, int z)",
            "type" : "void",
            "hasTypeVariable" : false,
            "position" : {
              "startLine" : 8,
              "startColumn" : 17,
              "endLine" : 8,
              "endColumn" : 25
            },
            "modifiers" : [ "PUBLIC" ],
            "overrideAnnotation" : false,
            "returnType" : null,
            "parameters" : [ {
              "name" : "x",
              "key" : "org.example.Player/method/teleport(int x, int y, int z)/parameter/x",
              "type" : "int",
              "hasTypeVariable" : false,
              "position" : {
                "startLine" : 8,
                "startColumn" : 30,
                "endLine" : 8,
                "endColumn" : 31
              },
              "modifiers" : [ ],
              "ignore" : false,
              "methodKey" : "org.example.Player/method/teleport(int x, int y, int z)"
            }, {
              "name" : "y",
              "key" : "org.example.Player/method/teleport(int x, int y, int z)/parameter/y",
              "type" : "int",
              "hasTypeVariable" : false,
              "position" : {
                "startLine" : 8,
                "startColumn" : 37,
                "endLine" : 8,
                "endColumn" : 38
              },
              "modifiers" : [ ],
              "ignore" : false,
              "methodKey" : "org.example.Player/method/teleport(int x, int y, int z)"
            }, {
              "name" : "z",
              "key" : "org.example.Player/method/teleport(int x, int y, int z)/parameter/z",
              "type" : "int",
              "hasTypeVariable" : false,
              "position" : {
                "startLine" : 8,
                "startColumn" : 44,
                "endLine" : 8,
                "endColumn" : 45
              },
              "modifiers" : [ ],
              "ignore" : false,
              "methodKey" : "org.example.Player/method/teleport(int x, int y, int z)"
            } ],
            "classOrInterfaceKey" : "org.example.Player"
          },
          "org.example.Player/method/walk()" : {
            "name" : "walk",
            "key" : "org.example.Player/method/walk()",
            "type" : "void",
            "hasTypeVariable" : false,
            "position" : {
              "startLine" : 19,
              "startColumn" : 17,
              "endLine" : 19,
              "endColumn" : 21
            },
            "modifiers" : [ "PUBLIC" ],
            "overrideAnnotation" : false,
            "returnType" : null,
            "parameters" : [ ],
            "classOrInterfaceKey" : "org.example.Player"
          },
          "org.example.Player/method/getX()" : {
            "name" : "getX",
            "key" : "org.example.Player/method/getX()",
            "type" : "int",
            "hasTypeVariable" : false,
            "position" : {
              "startLine" : 42,
              "startColumn" : 16,
              "endLine" : 42,
              "endColumn" : 20
            },
            "modifiers" : [ "PUBLIC" ],
            "overrideAnnotation" : false,
            "returnType" : null,
            "parameters" : [ ],
            "classOrInterfaceKey" : "org.example.Player"
          },
          "org.example.Player/method/getY()" : {
            "name" : "getY",
            "key" : "org.example.Player/method/getY()",
            "type" : "int",
            "hasTypeVariable" : false,
            "position" : {
              "startLine" : 46,
              "startColumn" : 16,
              "endLine" : 46,
              "endColumn" : 20
            },
            "modifiers" : [ "PUBLIC" ],
            "overrideAnnotation" : false,
            "returnType" : null,
            "parameters" : [ ],
            "classOrInterfaceKey" : "org.example.Player"
          },
          "org.example.Player/method/getZ()" : {
            "name" : "getZ",
            "key" : "org.example.Player/method/getZ()",
            "type" : "int",
            "hasTypeVariable" : false,
            "position" : {
              "startLine" : 49,
              "startColumn" : 16,
              "endLine" : 49,
              "endColumn" : 20
            },
            "modifiers" : [ "PUBLIC" ],
            "overrideAnnotation" : false,
            "returnType" : null,
            "parameters" : [ ],
            "classOrInterfaceKey" : "org.example.Player"
          },
          "org.example.Player/method/walkBy(int dx, int dy, int dz)" : {
            "name" : "walkBy",
            "key" : "org.example.Player/method/walkBy(int dx, int dy, int dz)",
            "type" : "void",
            "hasTypeVariable" : false,
            "position" : {
              "startLine" : 24,
              "startColumn" : 17,
              "endLine" : 24,
              "endColumn" : 23
            },
            "modifiers" : [ "PUBLIC" ],
            "overrideAnnotation" : false,
            "returnType" : null,
            "parameters" : [ {
              "name" : "dx",
              "key" : "org.example.Player/method/walkBy(int dx, int dy, int dz)/parameter/dx",
              "type" : "int",
              "hasTypeVariable" : false,
              "position" : {
                "startLine" : 24,
                "startColumn" : 28,
                "endLine" : 24,
                "endColumn" : 30
              },
              "modifiers" : [ ],
              "ignore" : false,
              "methodKey" : "org.example.Player/method/walkBy(int dx, int dy, int dz)"
            }, {
              "name" : "dy",
              "key" : "org.example.Player/method/walkBy(int dx, int dy, int dz)/parameter/dy",
              "type" : "int",
              "hasTypeVariable" : false,
              "position" : {
                "startLine" : 24,
                "startColumn" : 36,
                "endLine" : 24,
                "endColumn" : 38
              },
              "modifiers" : [ ],
              "ignore" : false,
              "methodKey" : "org.example.Player/method/walkBy(int dx, int dy, int dz)"
            }, {
              "name" : "dz",
              "key" : "org.example.Player/method/walkBy(int dx, int dy, int dz)/parameter/dz",
              "type" : "int",
              "hasTypeVariable" : false,
              "position" : {
                "startLine" : 24,
                "startColumn" : 44,
                "endLine" : 24,
                "endColumn" : 46
              },
              "modifiers" : [ ],
              "ignore" : false,
              "methodKey" : "org.example.Player/method/walkBy(int dx, int dy, int dz)"
            } ],
            "classOrInterfaceKey" : "org.example.Player"
          }
        },
        "file_path" : "src/main/java/org/example/Player.java",
        "anonymous" : false,
        "auxclass" : false,
        "implements_" : [ ],
        "extends_" : [ ],
        "definedInClassOrInterfaceTypeKey" : null,
        "innerDefinedClasses" : { },
        "innerDefinedInterfaces" : { }
      },
      "src/main/java/org/example/World.java": {
        "name" : "World",
        "key" : "org.example.World",
        "type" : "class",
        "hasTypeVariable" : false,
        "position" : {
          "startLine" : 5,
          "startColumn" : 8,
          "endLine" : 5,
          "endColumn" : 13
        },
        "modifiers" : [ "PUBLIC" ],
        "fields" : {
          "org.example.World/memberField/world" : {
            "name" : "world",
            "key" : "org.example.World/memberField/world",
            "type" : "java.lang.String[][][]",
            "hasTypeVariable" : false,
            "position" : {
              "startLine" : 6,
              "startColumn" : 26,
              "endLine" : 6,
              "endColumn" : 31
            },
            "modifiers" : [ "PRIVATE" ],
            "ignore" : false,
            "memberFieldKey" : null,
            "classOrInterfaceKey" : "org.example.World"
          }
        },
        "methods" : {
          "org.example.World/method/printDarkerColor(int r, int g, int b)" : {
            "name" : "printDarkerColor",
            "key" : "org.example.World/method/printDarkerColor(int r, int g, int b)",
            "type" : "void",
            "hasTypeVariable" : false,
            "position" : {
              "startLine" : 10,
              "startColumn" : 17,
              "endLine" : 10,
              "endColumn" : 33
            },
            "modifiers" : [ "PUBLIC" ],
            "overrideAnnotation" : false,
            "returnType" : null,
            "parameters" : [ {
              "name" : "r",
              "key" : "org.example.World/method/printDarkerColor(int r, int g, int b)/parameter/r",
              "type" : "int",
              "hasTypeVariable" : false,
              "position" : {
                "startLine" : 10,
                "startColumn" : 38,
                "endLine" : 10,
                "endColumn" : 39
              },
              "modifiers" : [ ],
              "ignore" : false,
              "methodKey" : "org.example.World/method/printDarkerColor(int r, int g, int b)"
            }, {
              "name" : "g",
              "key" : "org.example.World/method/printDarkerColor(int r, int g, int b)/parameter/g",
              "type" : "int",
              "hasTypeVariable" : false,
              "position" : {
                "startLine" : 10,
                "startColumn" : 44,
                "endLine" : 10,
                "endColumn" : 45
              },
              "modifiers" : [ ],
              "ignore" : false,
              "methodKey" : "org.example.World/method/printDarkerColor(int r, int g, int b)"
            }, {
              "name" : "b",
              "key" : "org.example.World/method/printDarkerColor(int r, int g, int b)/parameter/b",
              "type" : "int",
              "hasTypeVariable" : false,
              "position" : {
                "startLine" : 10,
                "startColumn" : 51,
                "endLine" : 10,
                "endColumn" : 52
              },
              "modifiers" : [ ],
              "ignore" : false,
              "methodKey" : "org.example.World/method/printDarkerColor(int r, int g, int b)"
            } ],
            "classOrInterfaceKey" : "org.example.World"
          },
          "org.example.World/method/setBlock(int x, int y, int z, int r, int g, int b)" : {
            "name" : "setBlock",
            "key" : "org.example.World/method/setBlock(int x, int y, int z, int r, int g, int b)",
            "type" : "void",
            "hasTypeVariable" : false,
            "position" : {
              "startLine" : 7,
              "startColumn" : 17,
              "endLine" : 7,
              "endColumn" : 25
            },
            "modifiers" : [ "PUBLIC" ],
            "overrideAnnotation" : false,
            "returnType" : null,
            "parameters" : [ {
              "name" : "x",
              "key" : "org.example.World/method/setBlock(int x, int y, int z, int r, int g, int b)/parameter/x",
              "type" : "int",
              "hasTypeVariable" : false,
              "position" : {
                "startLine" : 7,
                "startColumn" : 30,
                "endLine" : 7,
                "endColumn" : 31
              },
              "modifiers" : [ ],
              "ignore" : false,
              "methodKey" : "org.example.World/method/setBlock(int x, int y, int z, int r, int g, int b)"
            }, {
              "name" : "y",
              "key" : "org.example.World/method/setBlock(int x, int y, int z, int r, int g, int b)/parameter/y",
              "type" : "int",
              "hasTypeVariable" : false,
              "position" : {
                "startLine" : 7,
                "startColumn" : 36,
                "endLine" : 7,
                "endColumn" : 37
              },
              "modifiers" : [ ],
              "ignore" : false,
              "methodKey" : "org.example.World/method/setBlock(int x, int y, int z, int r, int g, int b)"
            }, {
              "name" : "z",
              "key" : "org.example.World/method/setBlock(int x, int y, int z, int r, int g, int b)/parameter/z",
              "type" : "int",
              "hasTypeVariable" : false,
              "position" : {
                "startLine" : 7,
                "startColumn" : 42,
                "endLine" : 7,
                "endColumn" : 43
              },
              "modifiers" : [ ],
              "ignore" : false,
              "methodKey" : "org.example.World/method/setBlock(int x, int y, int z, int r, int g, int b)"
            }, {
              "name" : "r",
              "key" : "org.example.World/method/setBlock(int x, int y, int z, int r, int g, int b)/parameter/r",
              "type" : "int",
              "hasTypeVariable" : false,
              "position" : {
                "startLine" : 7,
                "startColumn" : 48,
                "endLine" : 7,
                "endColumn" : 49
              },
              "modifiers" : [ ],
              "ignore" : false,
              "methodKey" : "org.example.World/method/setBlock(int x, int y, int z, int r, int g, int b)"
            }, {
              "name" : "g",
              "key" : "org.example.World/method/setBlock(int x, int y, int z, int r, int g, int b)/parameter/g",
              "type" : "int",
              "hasTypeVariable" : false,
              "position" : {
                "startLine" : 7,
                "startColumn" : 54,
                "endLine" : 7,
                "endColumn" : 55
              },
              "modifiers" : [ ],
              "ignore" : false,
              "methodKey" : "org.example.World/method/setBlock(int x, int y, int z, int r, int g, int b)"
            }, {
              "name" : "b",
              "key" : "org.example.World/method/setBlock(int x, int y, int z, int r, int g, int b)/parameter/b",
              "type" : "int",
              "hasTypeVariable" : false,
              "position" : {
                "startLine" : 7,
                "startColumn" : 60,
                "endLine" : 7,
                "endColumn" : 61
              },
              "modifiers" : [ ],
              "ignore" : false,
              "methodKey" : "org.example.World/method/setBlock(int x, int y, int z, int r, int g, int b)"
            } ],
            "classOrInterfaceKey" : "org.example.World"
          }
        },
        "file_path" : "src/main/java/org/example/World.java",
        "anonymous" : false,
        "auxclass" : false,
        "implements_" : [ ],
        "extends_" : [ ],
        "definedInClassOrInterfaceTypeKey" : null,
        "innerDefinedClasses" : {
          "org.example.World.MyByte" : {
            "name" : "MyByte",
            "key" : "org.example.World.MyByte",
            "type" : "class",
            "hasTypeVariable" : false,
            "position" : {
              "startLine" : 20,
              "startColumn" : 19,
              "endLine" : 20,
              "endColumn" : 24
            },
            "modifiers" : [ "PUBLIC", "STATIC" ],
            "fields" : {
              "org.example.World.MyByte/memberField/b4" : {
                "name" : "b4",
                "key" : "org.example.World.MyByte/memberField/b4",
                "type" : "boolean",
                "hasTypeVariable" : false,
                "position" : {
                  "startLine" : 25,
                  "startColumn" : 24,
                  "endLine" : 25,
                  "endColumn" : 26
                },
                "modifiers" : [ "PUBLIC" ],
                "ignore" : false,
                "memberFieldKey" : null,
                "classOrInterfaceKey" : "org.example.World.MyByte"
              },
              "org.example.World.MyByte/memberField/b5" : {
                "name" : "b5",
                "key" : "org.example.World.MyByte/memberField/b5",
                "type" : "boolean",
                "hasTypeVariable" : false,
                "position" : {
                  "startLine" : 26,
                  "startColumn" : 24,
                  "endLine" : 26,
                  "endColumn" : 26
                },
                "modifiers" : [ "PUBLIC" ],
                "ignore" : false,
                "memberFieldKey" : null,
                "classOrInterfaceKey" : "org.example.World.MyByte"
              },
              "org.example.World.MyByte/memberField/b2" : {
                "name" : "b2",
                "key" : "org.example.World.MyByte/memberField/b2",
                "type" : "boolean",
                "hasTypeVariable" : false,
                "position" : {
                  "startLine" : 23,
                  "startColumn" : 24,
                  "endLine" : 23,
                  "endColumn" : 26
                },
                "modifiers" : [ "PUBLIC" ],
                "ignore" : false,
                "memberFieldKey" : null,
                "classOrInterfaceKey" : "org.example.World.MyByte"
              },
              "org.example.World.MyByte/memberField/b3" : {
                "name" : "b3",
                "key" : "org.example.World.MyByte/memberField/b3",
                "type" : "boolean",
                "hasTypeVariable" : false,
                "position" : {
                  "startLine" : 24,
                  "startColumn" : 24,
                  "endLine" : 24,
                  "endColumn" : 26
                },
                "modifiers" : [ "PUBLIC" ],
                "ignore" : false,
                "memberFieldKey" : null,
                "classOrInterfaceKey" : "org.example.World.MyByte"
              },
              "org.example.World.MyByte/memberField/b6" : {
                "name" : "b6",
                "key" : "org.example.World.MyByte/memberField/b6",
                "type" : "boolean",
                "hasTypeVariable" : false,
                "position" : {
                  "startLine" : 27,
                  "startColumn" : 24,
                  "endLine" : 27,
                  "endColumn" : 26
                },
                "modifiers" : [ "PUBLIC" ],
                "ignore" : false,
                "memberFieldKey" : null,
                "classOrInterfaceKey" : "org.example.World.MyByte"
              },
              "org.example.World.MyByte/memberField/b7" : {
                "name" : "b7",
                "key" : "org.example.World.MyByte/memberField/b7",
                "type" : "boolean",
                "hasTypeVariable" : false,
                "position" : {
                  "startLine" : 28,
                  "startColumn" : 24,
                  "endLine" : 28,
                  "endColumn" : 26
                },
                "modifiers" : [ "PUBLIC" ],
                "ignore" : false,
                "memberFieldKey" : null,
                "classOrInterfaceKey" : "org.example.World.MyByte"
              },
              "org.example.World.MyByte/memberField/b0" : {
                "name" : "b0",
                "key" : "org.example.World.MyByte/memberField/b0",
                "type" : "boolean",
                "hasTypeVariable" : false,
                "position" : {
                  "startLine" : 21,
                  "startColumn" : 24,
                  "endLine" : 21,
                  "endColumn" : 26
                },
                "modifiers" : [ "PUBLIC" ],
                "ignore" : false,
                "memberFieldKey" : null,
                "classOrInterfaceKey" : "org.example.World.MyByte"
              },
              "org.example.World.MyByte/memberField/b1" : {
                "name" : "b1",
                "key" : "org.example.World.MyByte/memberField/b1",
                "type" : "boolean",
                "hasTypeVariable" : false,
                "position" : {
                  "startLine" : 22,
                  "startColumn" : 24,
                  "endLine" : 22,
                  "endColumn" : 26
                },
                "modifiers" : [ "PUBLIC" ],
                "ignore" : false,
                "memberFieldKey" : null,
                "classOrInterfaceKey" : "org.example.World.MyByte"
              }
            },
            "methods" : { },
            "file_path" : "src/main/java/org/example/World.java",
            "anonymous" : false,
            "auxclass" : false,
            "implements_" : [ ],
            "extends_" : [ ],
            "definedInClassOrInterfaceTypeKey" : "org.example.World",
            "innerDefinedClasses" : { },
            "innerDefinedInterfaces" : { }
          }
        },
        "innerDefinedInterfaces" : { }
      }



}
export const DATA_CLUMP_DATA:DataClumpsTypeContext={
  "report_version": "unknown",
  "report_timestamp": "2024-03-09T14:22:22.223Z",
  "target_language": "java",
  "report_summary": {
    "additional": null,
    "amount_classes_or_interfaces_with_data_clumps": 6,
    "amount_files_with_data_clumps": 5,
    "amount_methods_with_data_clumps": 5,
    "fields_to_fields_data_clump": 2,
    "parameters_to_fields_data_clump": 2,
    "parameters_to_parameters_data_clump": 6,
    "amount_data_clumps": 10
  },
  "project_info": {
    "project_url": "git@github.com:compf/javaTest",
    "project_name": "unknown_project_name",
    "project_version": "1",
    "project_commit_hash": "unknown",
    "project_tag": null,
    "project_commit_date": null,
    "additional": {},
    "number_of_files": 11,
    "number_of_classes_or_interfaces": 13,
    "number_of_methods": 48,
    "number_of_data_fields": 32,
    "number_of_method_parameters": 47
  },
  "detector": {
    "name": "data-clumps-doctor",
    "url": "https://github.com/NilsBaumgartner1994/data-clumps-doctor",
    "version": "unknown",
    "options": {
      "typeVariablesConsidered": false,
      "similarityModifierOfVariablesWithUnknownType": 0,
      "fieldsOfClassesWithUnknownHierarchyProbabilityModifier": 0,
      "sharedFieldsToFieldsAmountMinimum": 3,
      "analyseFieldsInClassesOrInterfacesInheritedFromSuperClassesOrInterfaces": false,
      "sharedParametersToParametersAmountMinimum": 3,
      "sharedParametersToFieldsAmountMinimum": 3,
      "methodsOfClassesOrInterfacesWithUnknownHierarchyProbabilityModifier": 0
    }
  },
  "data_clumps": {
    "parameters_to_parameters_data_clump-src/main/java/org/example/Player.java-org.example.Player/method/teleport(int x, int y, int z)-org.example.World/method/setBlock(int x, int y, int z, int r, int g, int b)-xyz": {
      "type": "data_clump",
      "key": "parameters_to_parameters_data_clump-src/main/java/org/example/Player.java-org.example.Player/method/teleport(int x, int y, int z)-org.example.World/method/setBlock(int x, int y, int z, int r, int g, int b)-xyz",
      "probability": 1,
      "from_file_path": "src/main/java/org/example/Player.java",
      "from_class_or_interface_name": "Player",
      "from_class_or_interface_key": "org.example.Player",
      "from_method_name": "teleport",
      "from_method_key": "org.example.Player/method/teleport(int x, int y, int z)",
      "to_file_path": "src/main/java/org/example/World.java",
      "to_class_or_interface_name": "World",
      "to_class_or_interface_key": "org.example.World",
      "to_method_name": "setBlock",
      "to_method_key": "org.example.World/method/setBlock(int x, int y, int z, int r, int g, int b)",
      "data_clump_type": "parameters_to_parameters_data_clump",
      "data_clump_data": {
        "org.example.Player/method/teleport(int x, int y, int z)/parameter/x": {
          "key": "org.example.Player/method/teleport(int x, int y, int z)/parameter/x",
          "name": "x",
          "type": "int",
          "probability": 1,
          "modifiers": [],
          "to_variable": {
            "key": "org.example.World/method/setBlock(int x, int y, int z, int r, int g, int b)/parameter/x",
            "name": "x",
            "type": "int",
            "modifiers": [],
            "position": {
              "startLine": 7,
              "startColumn": 30,
              "endLine": 7,
              "endColumn": 31
            }
          },
          "position": {
            "startLine": 8,
            "startColumn": 30,
            "endLine": 8,
            "endColumn": 31
          }
        },
        "org.example.Player/method/teleport(int x, int y, int z)/parameter/y": {
          "key": "org.example.Player/method/teleport(int x, int y, int z)/parameter/y",
          "name": "y",
          "type": "int",
          "probability": 1,
          "modifiers": [],
          "to_variable": {
            "key": "org.example.World/method/setBlock(int x, int y, int z, int r, int g, int b)/parameter/y",
            "name": "y",
            "type": "int",
            "modifiers": [],
            "position": {
              "startLine": 7,
              "startColumn": 36,
              "endLine": 7,
              "endColumn": 37
            }
          },
          "position": {
            "startLine": 8,
            "startColumn": 37,
            "endLine": 8,
            "endColumn": 38
          }
        },
        "org.example.Player/method/teleport(int x, int y, int z)/parameter/z": {
          "key": "org.example.Player/method/teleport(int x, int y, int z)/parameter/z",
          "name": "z",
          "type": "int",
          "probability": 1,
          "modifiers": [],
          "to_variable": {
            "key": "org.example.World/method/setBlock(int x, int y, int z, int r, int g, int b)/parameter/z",
            "name": "z",
            "type": "int",
            "modifiers": [],
            "position": {
              "startLine": 7,
              "startColumn": 42,
              "endLine": 7,
              "endColumn": 43
            }
          },
          "position": {
            "startLine": 8,
            "startColumn": 44,
            "endLine": 8,
            "endColumn": 45
          }
        }
      }
    },
    "parameters_to_fields_data_clump-src/main/java/org/example/Player.java-org.example.Player/method/teleport(int x, int y, int z)-org.example.Player-xyz": {
      "type": "data_clump",
      "key": "parameters_to_fields_data_clump-src/main/java/org/example/Player.java-org.example.Player/method/teleport(int x, int y, int z)-org.example.Player-xyz",
      "probability": 1,
      "from_file_path": "src/main/java/org/example/Player.java",
      "from_class_or_interface_name": "Player",
      "from_class_or_interface_key": "org.example.Player",
      "from_method_name": "teleport",
      "from_method_key": "org.example.Player/method/teleport(int x, int y, int z)",
      "to_file_path": "src/main/java/org/example/Player.java",
      "to_class_or_interface_name": "Player",
      "to_class_or_interface_key": "org.example.Player",
      "to_method_name": null,
      "to_method_key": null,
      "data_clump_type": "parameters_to_fields_data_clump",
      "data_clump_data": {
        "org.example.Player/method/teleport(int x, int y, int z)/parameter/x": {
          "key": "org.example.Player/method/teleport(int x, int y, int z)/parameter/x",
          "name": "x",
          "type": "int",
          "probability": 1,
          "modifiers": [],
          "to_variable": {
            "key": "org.example.Player/memberField/x",
            "name": "x",
            "type": "int",
            "modifiers": [
              "PRIVATE"
            ],
            "position": {
              "startLine": 6,
              "startColumn": 17,
              "endLine": 6,
              "endColumn": 18
            }
          },
          "position": {
            "startLine": 8,
            "startColumn": 30,
            "endLine": 8,
            "endColumn": 31
          }
        },
        "org.example.Player/method/teleport(int x, int y, int z)/parameter/y": {
          "key": "org.example.Player/method/teleport(int x, int y, int z)/parameter/y",
          "name": "y",
          "type": "int",
          "probability": 1,
          "modifiers": [],
          "to_variable": {
            "key": "org.example.Player/memberField/y",
            "name": "y",
            "type": "int",
            "modifiers": [
              "PRIVATE"
            ],
            "position": {
              "startLine": 6,
              "startColumn": 19,
              "endLine": 6,
              "endColumn": 20
            }
          },
          "position": {
            "startLine": 8,
            "startColumn": 37,
            "endLine": 8,
            "endColumn": 38
          }
        },
        "org.example.Player/method/teleport(int x, int y, int z)/parameter/z": {
          "key": "org.example.Player/method/teleport(int x, int y, int z)/parameter/z",
          "name": "z",
          "type": "int",
          "probability": 1,
          "modifiers": [],
          "to_variable": {
            "key": "org.example.Player/memberField/z",
            "name": "z",
            "type": "int",
            "modifiers": [
              "PRIVATE"
            ],
            "position": {
              "startLine": 6,
              "startColumn": 21,
              "endLine": 6,
              "endColumn": 22
            }
          },
          "position": {
            "startLine": 8,
            "startColumn": 44,
            "endLine": 8,
            "endColumn": 45
          }
        }
      }
    },
    "parameters_to_parameters_data_clump-src/main/java/org/example/World.java-org.example.World/method/printDarkerColor(int r, int g, int b)-org.example.World/method/setBlock(int x, int y, int z, int r, int g, int b)-rgb": {
      "type": "data_clump",
      "key": "parameters_to_parameters_data_clump-src/main/java/org/example/World.java-org.example.World/method/printDarkerColor(int r, int g, int b)-org.example.World/method/setBlock(int x, int y, int z, int r, int g, int b)-rgb",
      "probability": 1,
      "from_file_path": "src/main/java/org/example/World.java",
      "from_class_or_interface_name": "World",
      "from_class_or_interface_key": "org.example.World",
      "from_method_name": "printDarkerColor",
      "from_method_key": "org.example.World/method/printDarkerColor(int r, int g, int b)",
      "to_file_path": "src/main/java/org/example/World.java",
      "to_class_or_interface_name": "World",
      "to_class_or_interface_key": "org.example.World",
      "to_method_name": "setBlock",
      "to_method_key": "org.example.World/method/setBlock(int x, int y, int z, int r, int g, int b)",
      "data_clump_type": "parameters_to_parameters_data_clump",
      "data_clump_data": {
        "org.example.World/method/printDarkerColor(int r, int g, int b)/parameter/r": {
          "key": "org.example.World/method/printDarkerColor(int r, int g, int b)/parameter/r",
          "name": "r",
          "type": "int",
          "probability": 1,
          "modifiers": [],
          "to_variable": {
            "key": "org.example.World/method/setBlock(int x, int y, int z, int r, int g, int b)/parameter/r",
            "name": "r",
            "type": "int",
            "modifiers": [],
            "position": {
              "startLine": 7,
              "startColumn": 48,
              "endLine": 7,
              "endColumn": 49
            }
          },
          "position": {
            "startLine": 10,
            "startColumn": 38,
            "endLine": 10,
            "endColumn": 39
          }
        },
        "org.example.World/method/printDarkerColor(int r, int g, int b)/parameter/g": {
          "key": "org.example.World/method/printDarkerColor(int r, int g, int b)/parameter/g",
          "name": "g",
          "type": "int",
          "probability": 1,
          "modifiers": [],
          "to_variable": {
            "key": "org.example.World/method/setBlock(int x, int y, int z, int r, int g, int b)/parameter/g",
            "name": "g",
            "type": "int",
            "modifiers": [],
            "position": {
              "startLine": 7,
              "startColumn": 54,
              "endLine": 7,
              "endColumn": 55
            }
          },
          "position": {
            "startLine": 10,
            "startColumn": 44,
            "endLine": 10,
            "endColumn": 45
          }
        },
        "org.example.World/method/printDarkerColor(int r, int g, int b)/parameter/b": {
          "key": "org.example.World/method/printDarkerColor(int r, int g, int b)/parameter/b",
          "name": "b",
          "type": "int",
          "probability": 1,
          "modifiers": [],
          "to_variable": {
            "key": "org.example.World/method/setBlock(int x, int y, int z, int r, int g, int b)/parameter/b",
            "name": "b",
            "type": "int",
            "modifiers": [],
            "position": {
              "startLine": 7,
              "startColumn": 60,
              "endLine": 7,
              "endColumn": 61
            }
          },
          "position": {
            "startLine": 10,
            "startColumn": 51,
            "endLine": 10,
            "endColumn": 52
          }
        }
      }
    },
    "parameters_to_parameters_data_clump-src/main/java/org/example/World.java-org.example.World/method/setBlock(int x, int y, int z, int r, int g, int b)-org.example.Player/method/teleport(int x, int y, int z)-xyz": {
      "type": "data_clump",
      "key": "parameters_to_parameters_data_clump-src/main/java/org/example/World.java-org.example.World/method/setBlock(int x, int y, int z, int r, int g, int b)-org.example.Player/method/teleport(int x, int y, int z)-xyz",
      "probability": 1,
      "from_file_path": "src/main/java/org/example/World.java",
      "from_class_or_interface_name": "World",
      "from_class_or_interface_key": "org.example.World",
      "from_method_name": "setBlock",
      "from_method_key": "org.example.World/method/setBlock(int x, int y, int z, int r, int g, int b)",
      "to_file_path": "src/main/java/org/example/Player.java",
      "to_class_or_interface_name": "Player",
      "to_class_or_interface_key": "org.example.Player",
      "to_method_name": "teleport",
      "to_method_key": "org.example.Player/method/teleport(int x, int y, int z)",
      "data_clump_type": "parameters_to_parameters_data_clump",
      "data_clump_data": {
        "org.example.World/method/setBlock(int x, int y, int z, int r, int g, int b)/parameter/x": {
          "key": "org.example.World/method/setBlock(int x, int y, int z, int r, int g, int b)/parameter/x",
          "name": "x",
          "type": "int",
          "probability": 1,
          "modifiers": [],
          "to_variable": {
            "key": "org.example.Player/method/teleport(int x, int y, int z)/parameter/x",
            "name": "x",
            "type": "int",
            "modifiers": [],
            "position": {
              "startLine": 8,
              "startColumn": 30,
              "endLine": 8,
              "endColumn": 31
            }
          },
          "position": {
            "startLine": 7,
            "startColumn": 30,
            "endLine": 7,
            "endColumn": 31
          }
        },
        "org.example.World/method/setBlock(int x, int y, int z, int r, int g, int b)/parameter/y": {
          "key": "org.example.World/method/setBlock(int x, int y, int z, int r, int g, int b)/parameter/y",
          "name": "y",
          "type": "int",
          "probability": 1,
          "modifiers": [],
          "to_variable": {
            "key": "org.example.Player/method/teleport(int x, int y, int z)/parameter/y",
            "name": "y",
            "type": "int",
            "modifiers": [],
            "position": {
              "startLine": 8,
              "startColumn": 37,
              "endLine": 8,
              "endColumn": 38
            }
          },
          "position": {
            "startLine": 7,
            "startColumn": 36,
            "endLine": 7,
            "endColumn": 37
          }
        },
        "org.example.World/method/setBlock(int x, int y, int z, int r, int g, int b)/parameter/z": {
          "key": "org.example.World/method/setBlock(int x, int y, int z, int r, int g, int b)/parameter/z",
          "name": "z",
          "type": "int",
          "probability": 1,
          "modifiers": [],
          "to_variable": {
            "key": "org.example.Player/method/teleport(int x, int y, int z)/parameter/z",
            "name": "z",
            "type": "int",
            "modifiers": [],
            "position": {
              "startLine": 8,
              "startColumn": 44,
              "endLine": 8,
              "endColumn": 45
            }
          },
          "position": {
            "startLine": 7,
            "startColumn": 42,
            "endLine": 7,
            "endColumn": 43
          }
        }
      }
    },
    "parameters_to_parameters_data_clump-src/main/java/org/example/World.java-org.example.World/method/setBlock(int x, int y, int z, int r, int g, int b)-org.example.World/method/printDarkerColor(int r, int g, int b)-rgb": {
      "type": "data_clump",
      "key": "parameters_to_parameters_data_clump-src/main/java/org/example/World.java-org.example.World/method/setBlock(int x, int y, int z, int r, int g, int b)-org.example.World/method/printDarkerColor(int r, int g, int b)-rgb",
      "probability": 1,
      "from_file_path": "src/main/java/org/example/World.java",
      "from_class_or_interface_name": "World",
      "from_class_or_interface_key": "org.example.World",
      "from_method_name": "setBlock",
      "from_method_key": "org.example.World/method/setBlock(int x, int y, int z, int r, int g, int b)",
      "to_file_path": "src/main/java/org/example/World.java",
      "to_class_or_interface_name": "World",
      "to_class_or_interface_key": "org.example.World",
      "to_method_name": "printDarkerColor",
      "to_method_key": "org.example.World/method/printDarkerColor(int r, int g, int b)",
      "data_clump_type": "parameters_to_parameters_data_clump",
      "data_clump_data": {
        "org.example.World/method/setBlock(int x, int y, int z, int r, int g, int b)/parameter/r": {
          "key": "org.example.World/method/setBlock(int x, int y, int z, int r, int g, int b)/parameter/r",
          "name": "r",
          "type": "int",
          "probability": 1,
          "modifiers": [],
          "to_variable": {
            "key": "org.example.World/method/printDarkerColor(int r, int g, int b)/parameter/r",
            "name": "r",
            "type": "int",
            "modifiers": [],
            "position": {
              "startLine": 10,
              "startColumn": 38,
              "endLine": 10,
              "endColumn": 39
            }
          },
          "position": {
            "startLine": 7,
            "startColumn": 48,
            "endLine": 7,
            "endColumn": 49
          }
        },
        "org.example.World/method/setBlock(int x, int y, int z, int r, int g, int b)/parameter/g": {
          "key": "org.example.World/method/setBlock(int x, int y, int z, int r, int g, int b)/parameter/g",
          "name": "g",
          "type": "int",
          "probability": 1,
          "modifiers": [],
          "to_variable": {
            "key": "org.example.World/method/printDarkerColor(int r, int g, int b)/parameter/g",
            "name": "g",
            "type": "int",
            "modifiers": [],
            "position": {
              "startLine": 10,
              "startColumn": 44,
              "endLine": 10,
              "endColumn": 45
            }
          },
          "position": {
            "startLine": 7,
            "startColumn": 54,
            "endLine": 7,
            "endColumn": 55
          }
        },
        "org.example.World/method/setBlock(int x, int y, int z, int r, int g, int b)/parameter/b": {
          "key": "org.example.World/method/setBlock(int x, int y, int z, int r, int g, int b)/parameter/b",
          "name": "b",
          "type": "int",
          "probability": 1,
          "modifiers": [],
          "to_variable": {
            "key": "org.example.World/method/printDarkerColor(int r, int g, int b)/parameter/b",
            "name": "b",
            "type": "int",
            "modifiers": [],
            "position": {
              "startLine": 10,
              "startColumn": 51,
              "endLine": 10,
              "endColumn": 52
            }
          },
          "position": {
            "startLine": 7,
            "startColumn": 60,
            "endLine": 7,
            "endColumn": 61
          }
        }
      }
    },
    "parameters_to_fields_data_clump-src/main/java/org/example/World.java-org.example.World/method/setBlock(int x, int y, int z, int r, int g, int b)-org.example.Player-xyz": {
      "type": "data_clump",
      "key": "parameters_to_fields_data_clump-src/main/java/org/example/World.java-org.example.World/method/setBlock(int x, int y, int z, int r, int g, int b)-org.example.Player-xyz",
      "probability": 1,
      "from_file_path": "src/main/java/org/example/World.java",
      "from_class_or_interface_name": "World",
      "from_class_or_interface_key": "org.example.World",
      "from_method_name": "setBlock",
      "from_method_key": "org.example.World/method/setBlock(int x, int y, int z, int r, int g, int b)",
      "to_file_path": "src/main/java/org/example/Player.java",
      "to_class_or_interface_name": "Player",
      "to_class_or_interface_key": "org.example.Player",
      "to_method_name": null,
      "to_method_key": null,
      "data_clump_type": "parameters_to_fields_data_clump",
      "data_clump_data": {
        "org.example.World/method/setBlock(int x, int y, int z, int r, int g, int b)/parameter/x": {
          "key": "org.example.World/method/setBlock(int x, int y, int z, int r, int g, int b)/parameter/x",
          "name": "x",
          "type": "int",
          "probability": 1,
          "modifiers": [],
          "to_variable": {
            "key": "org.example.Player/memberField/x",
            "name": "x",
            "type": "int",
            "modifiers": [
              "PRIVATE"
            ],
            "position": {
              "startLine": 6,
              "startColumn": 17,
              "endLine": 6,
              "endColumn": 18
            }
          },
          "position": {
            "startLine": 7,
            "startColumn": 30,
            "endLine": 7,
            "endColumn": 31
          }
        },
        "org.example.World/method/setBlock(int x, int y, int z, int r, int g, int b)/parameter/y": {
          "key": "org.example.World/method/setBlock(int x, int y, int z, int r, int g, int b)/parameter/y",
          "name": "y",
          "type": "int",
          "probability": 1,
          "modifiers": [],
          "to_variable": {
            "key": "org.example.Player/memberField/y",
            "name": "y",
            "type": "int",
            "modifiers": [
              "PRIVATE"
            ],
            "position": {
              "startLine": 6,
              "startColumn": 19,
              "endLine": 6,
              "endColumn": 20
            }
          },
          "position": {
            "startLine": 7,
            "startColumn": 36,
            "endLine": 7,
            "endColumn": 37
          }
        },
        "org.example.World/method/setBlock(int x, int y, int z, int r, int g, int b)/parameter/z": {
          "key": "org.example.World/method/setBlock(int x, int y, int z, int r, int g, int b)/parameter/z",
          "name": "z",
          "type": "int",
          "probability": 1,
          "modifiers": [],
          "to_variable": {
            "key": "org.example.Player/memberField/z",
            "name": "z",
            "type": "int",
            "modifiers": [
              "PRIVATE"
            ],
            "position": {
              "startLine": 6,
              "startColumn": 21,
              "endLine": 6,
              "endColumn": 22
            }
          },
          "position": {
            "startLine": 7,
            "startColumn": 42,
            "endLine": 7,
            "endColumn": 43
          }
        }
      }
    },
    "parameters_to_parameters_data_clump-src/main/java/org/example/interfaces/AgeChecker.java-org.example.interfaces.AgeChecker/method/isAdult(int birthYear, int birthMonth, int birthDay)-org.example.interfaces.DaysCalculator/method/getAgeInDays(int birthYear, int birthDay, int birthMonth)-birthYearbirthMonthbirthDay": {
      "type": "data_clump",
      "key": "parameters_to_parameters_data_clump-src/main/java/org/example/interfaces/AgeChecker.java-org.example.interfaces.AgeChecker/method/isAdult(int birthYear, int birthMonth, int birthDay)-org.example.interfaces.DaysCalculator/method/getAgeInDays(int birthYear, int birthDay, int birthMonth)-birthYearbirthMonthbirthDay",
      "probability": 1,
      "from_file_path": "src/main/java/org/example/interfaces/AgeChecker.java",
      "from_class_or_interface_name": "AgeChecker",
      "from_class_or_interface_key": "org.example.interfaces.AgeChecker",
      "from_method_name": "isAdult",
      "from_method_key": "org.example.interfaces.AgeChecker/method/isAdult(int birthYear, int birthMonth, int birthDay)",
      "to_file_path": "src/main/java/org/example/interfaces/DaysCalculator.java",
      "to_class_or_interface_name": "DaysCalculator",
      "to_class_or_interface_key": "org.example.interfaces.DaysCalculator",
      "to_method_name": "getAgeInDays",
      "to_method_key": "org.example.interfaces.DaysCalculator/method/getAgeInDays(int birthYear, int birthDay, int birthMonth)",
      "data_clump_type": "parameters_to_parameters_data_clump",
      "data_clump_data": {
        "org.example.interfaces.AgeChecker/method/isAdult(int birthYear, int birthMonth, int birthDay)/parameter/birthYear": {
          "key": "org.example.interfaces.AgeChecker/method/isAdult(int birthYear, int birthMonth, int birthDay)/parameter/birthYear",
          "name": "birthYear",
          "type": "int",
          "probability": 1,
          "modifiers": [],
          "to_variable": {
            "key": "org.example.interfaces.DaysCalculator/method/getAgeInDays(int birthYear, int birthDay, int birthMonth)/parameter/birthYear",
            "name": "birthYear",
            "type": "int",
            "modifiers": [],
            "position": {
              "startLine": 4,
              "startColumn": 26,
              "endLine": 4,
              "endColumn": 35
            }
          },
          "position": {
            "startLine": 4,
            "startColumn": 25,
            "endLine": 4,
            "endColumn": 34
          }
        },
        "org.example.interfaces.AgeChecker/method/isAdult(int birthYear, int birthMonth, int birthDay)/parameter/birthMonth": {
          "key": "org.example.interfaces.AgeChecker/method/isAdult(int birthYear, int birthMonth, int birthDay)/parameter/birthMonth",
          "name": "birthMonth",
          "type": "int",
          "probability": 1,
          "modifiers": [],
          "to_variable": {
            "key": "org.example.interfaces.DaysCalculator/method/getAgeInDays(int birthYear, int birthDay, int birthMonth)/parameter/birthMonth",
            "name": "birthMonth",
            "type": "int",
            "modifiers": [],
            "position": {
              "startLine": 4,
              "startColumn": 53,
              "endLine": 4,
              "endColumn": 63
            }
          },
          "position": {
            "startLine": 4,
            "startColumn": 39,
            "endLine": 4,
            "endColumn": 49
          }
        },
        "org.example.interfaces.AgeChecker/method/isAdult(int birthYear, int birthMonth, int birthDay)/parameter/birthDay": {
          "key": "org.example.interfaces.AgeChecker/method/isAdult(int birthYear, int birthMonth, int birthDay)/parameter/birthDay",
          "name": "birthDay",
          "type": "int",
          "probability": 1,
          "modifiers": [],
          "to_variable": {
            "key": "org.example.interfaces.DaysCalculator/method/getAgeInDays(int birthYear, int birthDay, int birthMonth)/parameter/birthDay",
            "name": "birthDay",
            "type": "int",
            "modifiers": [],
            "position": {
              "startLine": 4,
              "startColumn": 40,
              "endLine": 4,
              "endColumn": 48
            }
          },
          "position": {
            "startLine": 4,
            "startColumn": 54,
            "endLine": 4,
            "endColumn": 62
          }
        }
      }
    },
    "parameters_to_parameters_data_clump-src/main/java/org/example/interfaces/DaysCalculator.java-org.example.interfaces.DaysCalculator/method/getAgeInDays(int birthYear, int birthDay, int birthMonth)-org.example.interfaces.AgeChecker/method/isAdult(int birthYear, int birthMonth, int birthDay)-birthYearbirthDaybirthMonth": {
      "type": "data_clump",
      "key": "parameters_to_parameters_data_clump-src/main/java/org/example/interfaces/DaysCalculator.java-org.example.interfaces.DaysCalculator/method/getAgeInDays(int birthYear, int birthDay, int birthMonth)-org.example.interfaces.AgeChecker/method/isAdult(int birthYear, int birthMonth, int birthDay)-birthYearbirthDaybirthMonth",
      "probability": 1,
      "from_file_path": "src/main/java/org/example/interfaces/DaysCalculator.java",
      "from_class_or_interface_name": "DaysCalculator",
      "from_class_or_interface_key": "org.example.interfaces.DaysCalculator",
      "from_method_name": "getAgeInDays",
      "from_method_key": "org.example.interfaces.DaysCalculator/method/getAgeInDays(int birthYear, int birthDay, int birthMonth)",
      "to_file_path": "src/main/java/org/example/interfaces/AgeChecker.java",
      "to_class_or_interface_name": "AgeChecker",
      "to_class_or_interface_key": "org.example.interfaces.AgeChecker",
      "to_method_name": "isAdult",
      "to_method_key": "org.example.interfaces.AgeChecker/method/isAdult(int birthYear, int birthMonth, int birthDay)",
      "data_clump_type": "parameters_to_parameters_data_clump",
      "data_clump_data": {
        "org.example.interfaces.DaysCalculator/method/getAgeInDays(int birthYear, int birthDay, int birthMonth)/parameter/birthYear": {
          "key": "org.example.interfaces.DaysCalculator/method/getAgeInDays(int birthYear, int birthDay, int birthMonth)/parameter/birthYear",
          "name": "birthYear",
          "type": "int",
          "probability": 1,
          "modifiers": [],
          "to_variable": {
            "key": "org.example.interfaces.AgeChecker/method/isAdult(int birthYear, int birthMonth, int birthDay)/parameter/birthYear",
            "name": "birthYear",
            "type": "int",
            "modifiers": [],
            "position": {
              "startLine": 4,
              "startColumn": 25,
              "endLine": 4,
              "endColumn": 34
            }
          },
          "position": {
            "startLine": 4,
            "startColumn": 26,
            "endLine": 4,
            "endColumn": 35
          }
        },
        "org.example.interfaces.DaysCalculator/method/getAgeInDays(int birthYear, int birthDay, int birthMonth)/parameter/birthDay": {
          "key": "org.example.interfaces.DaysCalculator/method/getAgeInDays(int birthYear, int birthDay, int birthMonth)/parameter/birthDay",
          "name": "birthDay",
          "type": "int",
          "probability": 1,
          "modifiers": [],
          "to_variable": {
            "key": "org.example.interfaces.AgeChecker/method/isAdult(int birthYear, int birthMonth, int birthDay)/parameter/birthDay",
            "name": "birthDay",
            "type": "int",
            "modifiers": [],
            "position": {
              "startLine": 4,
              "startColumn": 54,
              "endLine": 4,
              "endColumn": 62
            }
          },
          "position": {
            "startLine": 4,
            "startColumn": 40,
            "endLine": 4,
            "endColumn": 48
          }
        },
        "org.example.interfaces.DaysCalculator/method/getAgeInDays(int birthYear, int birthDay, int birthMonth)/parameter/birthMonth": {
          "key": "org.example.interfaces.DaysCalculator/method/getAgeInDays(int birthYear, int birthDay, int birthMonth)/parameter/birthMonth",
          "name": "birthMonth",
          "type": "int",
          "probability": 1,
          "modifiers": [],
          "to_variable": {
            "key": "org.example.interfaces.AgeChecker/method/isAdult(int birthYear, int birthMonth, int birthDay)/parameter/birthMonth",
            "name": "birthMonth",
            "type": "int",
            "modifiers": [],
            "position": {
              "startLine": 4,
              "startColumn": 39,
              "endLine": 4,
              "endColumn": 49
            }
          },
          "position": {
            "startLine": 4,
            "startColumn": 53,
            "endLine": 4,
            "endColumn": 63
          }
        }
      }
    },
    "fields_to_fields_data_clump-src/main/java/org/example/World.java-org.example.World.MyByte-org.example.dogData.DogHelper.MySecondByte-b4b5b2b3b6b7b0b1": {
      "type": "data_clump",
      "key": "fields_to_fields_data_clump-src/main/java/org/example/World.java-org.example.World.MyByte-org.example.dogData.DogHelper.MySecondByte-b4b5b2b3b6b7b0b1",
      "probability": 1,
      "from_file_path": "src/main/java/org/example/World.java",
      "from_class_or_interface_name": "MyByte",
      "from_class_or_interface_key": "org.example.World.MyByte",
      "from_method_name": null,
      "from_method_key": null,
      "to_file_path": "src/main/java/org/example/dogData/DogHelper.java",
      "to_class_or_interface_key": "org.example.dogData.DogHelper.MySecondByte",
      "to_class_or_interface_name": "MySecondByte",
      "to_method_key": null,
      "to_method_name": null,
      "data_clump_type": "fields_to_fields_data_clump",
      "data_clump_data": {
        "org.example.World.MyByte/memberField/b4": {
          "key": "org.example.World.MyByte/memberField/b4",
          "name": "b4",
          "type": "boolean",
          "probability": 1,
          "modifiers": [
            "PUBLIC"
          ],
          "to_variable": {
            "key": "org.example.dogData.DogHelper.MySecondByte/memberField/b4",
            "name": "b4",
            "type": "boolean",
            "modifiers": [
              "PUBLIC"
            ],
            "position": {
              "startLine": 18,
              "startColumn": 24,
              "endLine": 18,
              "endColumn": 26
            }
          },
          "position": {
            "startLine": 25,
            "startColumn": 24,
            "endLine": 25,
            "endColumn": 26
          }
        },
        "org.example.World.MyByte/memberField/b5": {
          "key": "org.example.World.MyByte/memberField/b5",
          "name": "b5",
          "type": "boolean",
          "probability": 1,
          "modifiers": [
            "PUBLIC"
          ],
          "to_variable": {
            "key": "org.example.dogData.DogHelper.MySecondByte/memberField/b5",
            "name": "b5",
            "type": "boolean",
            "modifiers": [
              "PUBLIC"
            ],
            "position": {
              "startLine": 19,
              "startColumn": 24,
              "endLine": 19,
              "endColumn": 26
            }
          },
          "position": {
            "startLine": 26,
            "startColumn": 24,
            "endLine": 26,
            "endColumn": 26
          }
        },
        "org.example.World.MyByte/memberField/b2": {
          "key": "org.example.World.MyByte/memberField/b2",
          "name": "b2",
          "type": "boolean",
          "probability": 1,
          "modifiers": [
            "PUBLIC"
          ],
          "to_variable": {
            "key": "org.example.dogData.DogHelper.MySecondByte/memberField/b2",
            "name": "b2",
            "type": "boolean",
            "modifiers": [
              "PUBLIC"
            ],
            "position": {
              "startLine": 16,
              "startColumn": 24,
              "endLine": 16,
              "endColumn": 26
            }
          },
          "position": {
            "startLine": 23,
            "startColumn": 24,
            "endLine": 23,
            "endColumn": 26
          }
        },
        "org.example.World.MyByte/memberField/b3": {
          "key": "org.example.World.MyByte/memberField/b3",
          "name": "b3",
          "type": "boolean",
          "probability": 1,
          "modifiers": [
            "PUBLIC"
          ],
          "to_variable": {
            "key": "org.example.dogData.DogHelper.MySecondByte/memberField/b3",
            "name": "b3",
            "type": "boolean",
            "modifiers": [
              "PUBLIC"
            ],
            "position": {
              "startLine": 17,
              "startColumn": 24,
              "endLine": 17,
              "endColumn": 26
            }
          },
          "position": {
            "startLine": 24,
            "startColumn": 24,
            "endLine": 24,
            "endColumn": 26
          }
        },
        "org.example.World.MyByte/memberField/b6": {
          "key": "org.example.World.MyByte/memberField/b6",
          "name": "b6",
          "type": "boolean",
          "probability": 1,
          "modifiers": [
            "PUBLIC"
          ],
          "to_variable": {
            "key": "org.example.dogData.DogHelper.MySecondByte/memberField/b6",
            "name": "b6",
            "type": "boolean",
            "modifiers": [
              "PUBLIC"
            ],
            "position": {
              "startLine": 20,
              "startColumn": 24,
              "endLine": 20,
              "endColumn": 26
            }
          },
          "position": {
            "startLine": 27,
            "startColumn": 24,
            "endLine": 27,
            "endColumn": 26
          }
        },
        "org.example.World.MyByte/memberField/b7": {
          "key": "org.example.World.MyByte/memberField/b7",
          "name": "b7",
          "type": "boolean",
          "probability": 1,
          "modifiers": [
            "PUBLIC"
          ],
          "to_variable": {
            "key": "org.example.dogData.DogHelper.MySecondByte/memberField/b7",
            "name": "b7",
            "type": "boolean",
            "modifiers": [
              "PUBLIC"
            ],
            "position": {
              "startLine": 21,
              "startColumn": 24,
              "endLine": 21,
              "endColumn": 26
            }
          },
          "position": {
            "startLine": 28,
            "startColumn": 24,
            "endLine": 28,
            "endColumn": 26
          }
        },
        "org.example.World.MyByte/memberField/b0": {
          "key": "org.example.World.MyByte/memberField/b0",
          "name": "b0",
          "type": "boolean",
          "probability": 1,
          "modifiers": [
            "PUBLIC"
          ],
          "to_variable": {
            "key": "org.example.dogData.DogHelper.MySecondByte/memberField/b0",
            "name": "b0",
            "type": "boolean",
            "modifiers": [
              "PUBLIC"
            ],
            "position": {
              "startLine": 14,
              "startColumn": 24,
              "endLine": 14,
              "endColumn": 26
            }
          },
          "position": {
            "startLine": 21,
            "startColumn": 24,
            "endLine": 21,
            "endColumn": 26
          }
        },
        "org.example.World.MyByte/memberField/b1": {
          "key": "org.example.World.MyByte/memberField/b1",
          "name": "b1",
          "type": "boolean",
          "probability": 1,
          "modifiers": [
            "PUBLIC"
          ],
          "to_variable": {
            "key": "org.example.dogData.DogHelper.MySecondByte/memberField/b1",
            "name": "b1",
            "type": "boolean",
            "modifiers": [
              "PUBLIC"
            ],
            "position": {
              "startLine": 15,
              "startColumn": 24,
              "endLine": 15,
              "endColumn": 26
            }
          },
          "position": {
            "startLine": 22,
            "startColumn": 24,
            "endLine": 22,
            "endColumn": 26
          }
        }
      }
    },
    "fields_to_fields_data_clump-src/main/java/org/example/dogData/DogHelper.java-org.example.dogData.DogHelper.MySecondByte-org.example.World.MyByte-b7b6b3b2b5b4b1b0": {
      "type": "data_clump",
      "key": "fields_to_fields_data_clump-src/main/java/org/example/dogData/DogHelper.java-org.example.dogData.DogHelper.MySecondByte-org.example.World.MyByte-b7b6b3b2b5b4b1b0",
      "probability": 1,
      "from_file_path": "src/main/java/org/example/dogData/DogHelper.java",
      "from_class_or_interface_name": "MySecondByte",
      "from_class_or_interface_key": "org.example.dogData.DogHelper.MySecondByte",
      "from_method_name": null,
      "from_method_key": null,
      "to_file_path": "src/main/java/org/example/World.java",
      "to_class_or_interface_key": "org.example.World.MyByte",
      "to_class_or_interface_name": "MyByte",
      "to_method_key": null,
      "to_method_name": null,
      "data_clump_type": "fields_to_fields_data_clump",
      "data_clump_data": {
        "org.example.dogData.DogHelper.MySecondByte/memberField/b7": {
          "key": "org.example.dogData.DogHelper.MySecondByte/memberField/b7",
          "name": "b7",
          "type": "boolean",
          "probability": 1,
          "modifiers": [
            "PUBLIC"
          ],
          "to_variable": {
            "key": "org.example.World.MyByte/memberField/b7",
            "name": "b7",
            "type": "boolean",
            "modifiers": [
              "PUBLIC"
            ],
            "position": {
              "startLine": 28,
              "startColumn": 24,
              "endLine": 28,
              "endColumn": 26
            }
          },
          "position": {
            "startLine": 21,
            "startColumn": 24,
            "endLine": 21,
            "endColumn": 26
          }
        },
        "org.example.dogData.DogHelper.MySecondByte/memberField/b6": {
          "key": "org.example.dogData.DogHelper.MySecondByte/memberField/b6",
          "name": "b6",
          "type": "boolean",
          "probability": 1,
          "modifiers": [
            "PUBLIC"
          ],
          "to_variable": {
            "key": "org.example.World.MyByte/memberField/b6",
            "name": "b6",
            "type": "boolean",
            "modifiers": [
              "PUBLIC"
            ],
            "position": {
              "startLine": 27,
              "startColumn": 24,
              "endLine": 27,
              "endColumn": 26
            }
          },
          "position": {
            "startLine": 20,
            "startColumn": 24,
            "endLine": 20,
            "endColumn": 26
          }
        },
        "org.example.dogData.DogHelper.MySecondByte/memberField/b3": {
          "key": "org.example.dogData.DogHelper.MySecondByte/memberField/b3",
          "name": "b3",
          "type": "boolean",
          "probability": 1,
          "modifiers": [
            "PUBLIC"
          ],
          "to_variable": {
            "key": "org.example.World.MyByte/memberField/b3",
            "name": "b3",
            "type": "boolean",
            "modifiers": [
              "PUBLIC"
            ],
            "position": {
              "startLine": 24,
              "startColumn": 24,
              "endLine": 24,
              "endColumn": 26
            }
          },
          "position": {
            "startLine": 17,
            "startColumn": 24,
            "endLine": 17,
            "endColumn": 26
          }
        },
        "org.example.dogData.DogHelper.MySecondByte/memberField/b2": {
          "key": "org.example.dogData.DogHelper.MySecondByte/memberField/b2",
          "name": "b2",
          "type": "boolean",
          "probability": 1,
          "modifiers": [
            "PUBLIC"
          ],
          "to_variable": {
            "key": "org.example.World.MyByte/memberField/b2",
            "name": "b2",
            "type": "boolean",
            "modifiers": [
              "PUBLIC"
            ],
            "position": {
              "startLine": 23,
              "startColumn": 24,
              "endLine": 23,
              "endColumn": 26
            }
          },
          "position": {
            "startLine": 16,
            "startColumn": 24,
            "endLine": 16,
            "endColumn": 26
          }
        },
        "org.example.dogData.DogHelper.MySecondByte/memberField/b5": {
          "key": "org.example.dogData.DogHelper.MySecondByte/memberField/b5",
          "name": "b5",
          "type": "boolean",
          "probability": 1,
          "modifiers": [
            "PUBLIC"
          ],
          "to_variable": {
            "key": "org.example.World.MyByte/memberField/b5",
            "name": "b5",
            "type": "boolean",
            "modifiers": [
              "PUBLIC"
            ],
            "position": {
              "startLine": 26,
              "startColumn": 24,
              "endLine": 26,
              "endColumn": 26
            }
          },
          "position": {
            "startLine": 19,
            "startColumn": 24,
            "endLine": 19,
            "endColumn": 26
          }
        },
        "org.example.dogData.DogHelper.MySecondByte/memberField/b4": {
          "key": "org.example.dogData.DogHelper.MySecondByte/memberField/b4",
          "name": "b4",
          "type": "boolean",
          "probability": 1,
          "modifiers": [
            "PUBLIC"
          ],
          "to_variable": {
            "key": "org.example.World.MyByte/memberField/b4",
            "name": "b4",
            "type": "boolean",
            "modifiers": [
              "PUBLIC"
            ],
            "position": {
              "startLine": 25,
              "startColumn": 24,
              "endLine": 25,
              "endColumn": 26
            }
          },
          "position": {
            "startLine": 18,
            "startColumn": 24,
            "endLine": 18,
            "endColumn": 26
          }
        },
        "org.example.dogData.DogHelper.MySecondByte/memberField/b1": {
          "key": "org.example.dogData.DogHelper.MySecondByte/memberField/b1",
          "name": "b1",
          "type": "boolean",
          "probability": 1,
          "modifiers": [
            "PUBLIC"
          ],
          "to_variable": {
            "key": "org.example.World.MyByte/memberField/b1",
            "name": "b1",
            "type": "boolean",
            "modifiers": [
              "PUBLIC"
            ],
            "position": {
              "startLine": 22,
              "startColumn": 24,
              "endLine": 22,
              "endColumn": 26
            }
          },
          "position": {
            "startLine": 15,
            "startColumn": 24,
            "endLine": 15,
            "endColumn": 26
          }
        },
        "org.example.dogData.DogHelper.MySecondByte/memberField/b0": {
          "key": "org.example.dogData.DogHelper.MySecondByte/memberField/b0",
          "name": "b0",
          "type": "boolean",
          "probability": 1,
          "modifiers": [
            "PUBLIC"
          ],
          "to_variable": {
            "key": "org.example.World.MyByte/memberField/b0",
            "name": "b0",
            "type": "boolean",
            "modifiers": [
              "PUBLIC"
            ],
            "position": {
              "startLine": 21,
              "startColumn": 24,
              "endLine": 21,
              "endColumn": 26
            }
          },
          "position": {
            "startLine": 14,
            "startColumn": 24,
            "endLine": 14,
            "endColumn": 26
          }
        }
      }
    }
  }
}