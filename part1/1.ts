/* 
Is TS a language or just type checker?
Is TS strongly typed?
Is TS statically typed?
Is TS a good or a bad thing of JS?
Does TS is a tradeoff?
More about participants thoughts


TS is language which compiles to JS.
TS is language which has full syntax of JS language from stage 3 proposals.
TS is statically types, weakly typed, with unsound types
TS introduces structural types = type equivalence by the type properties
TS has two separated parts:
 - type space 🔵
 - value space 🟡
 and annotation syntax which connects type space with value space
 */


 // type space 🔵
 type X = {a: string}

 // value space 🟡
 let x = { a: "a", b: "b" }
 x = {c: ''};

 // value space with type annotation
 const annX: X = { a: "a" }

 export {X}