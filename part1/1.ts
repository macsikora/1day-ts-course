/* 
TS is language which compiles to JS.
TS is language which has full syntax of JS language from stage 3 proposals.
TS is statically types, weakly typed, with unsound types
TS introduces structural types
TS has three separated parts:
 - type level
 - annotation level
 - value level
 */


 // type level
 type X = {a: string}

 // value level
 const x = {a: "a"}

 // annotated value level
 const annX: X = {a: "a"}
