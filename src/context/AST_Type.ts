import { Position } from "data-clumps-type-context"

export type AST_Type = {
    [filePath:string]:AST_Class
}

export type AST_Class={
    name:string,
    key:string,
    type:string,
    hasTypeVariable:boolean,
    position:Position,
    modifiers:string[],
    anonymous : false,
    auxclass : false,
    implements_ :string[],
    imports?:string[],
    extends_ : string[],
    definedInClassOrInterfaceTypeKey : string|null,
    innerDefinedClasses : any,
    innerDefinedInterfaces :any,
    file_path:string,

    methods : AST_Methods,
    fields:{[fieldKey:string]:AST_Field},

   
}
export type AST_Methods={
    [methodName:string]:AST_Method
}
export type AST_Method={
    name:string,
    key:string,
    type:string,
    displayedType?:string,
    hasTypeVariable:boolean,
    position:Position,
    modifiers:string[],
  returnType:string|null,
  overrideAnnotation:boolean,
  parameters:AST_Parameter[],
  classOrInterfaceKey:string,
  

   
}
export type AST_Variable={
    key:string,
    type:string,
    displayedType?:string,
    name:string,
    hasTypeVariable:boolean,
    position:Position,
    modifiers:string[],
    ignore:boolean,
   
}
export type AST_Parameter=AST_Variable & {methodKey:string}
export type AST_Field=AST_Variable & {classOrInterfaceKey:string ,  memberFieldKey:string|null}