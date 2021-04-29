// Introduction to generic types

// generic type is type with an argument


// build simple generics
const arr: Array<string> = ['hi'];
const pro: Promise<number> = Promise.resolve(1)
const strNumMap: Map<string,number> = new Map([['a',1],['b',2]]) //?
const st: Set<number> = new Set([1,2,3,4]) //?


// custom generics
type MyFirstGeneric<T> = {data: T}
type Nullable<T> = T | null
type WithId<T> = T & { id: number }

type MyResponse<Data, Error> = {
    data: Data,
    error: Error
}

// using keyof with generics
type AddKeys<T, Keys> = keyof T | Keys
type Res = AddKeys<{a: string, b: string}, 'c'> // use with string as first element


// using generics in function annotations:
const idStr = (x: string) => x
const idBool = (x: boolean) => x

const id = (x: any) => x

const merge = (a: any, b: any) => {
    return [...a,...b];
}

const append = (a: any, b: any) => {
    return [...a,b]
} 

const map = (arr: any[], f: (x: any) => any) => {
    return arr.map(f)
}


// extends keyword
// T extends Y
type GetId<T extends {id: any}> = T['id']
type ObjKeyof<T extends object> = keyof T
type SameKeys<T extends object, Y extends object> = keyof T & keyof Y

// better AddKeys with extend:
type BetterAddKeys<T, Keys> = keyof T | Keys
type Res2 = BetterAddKeys<'a', 'c'>


// using indexed type with generics
type Prop<T extends object, Prop extends keyof T> = T[Prop]


// annotated value level using extends
type Movie = {
    id: number,
    name: string,
    length: number,
    tags: string[]
}

// does this function needs Movie type as a whole? maybe generic?
const addTag = (movie: Movie, tag: string): Movie => {
    return {
        ...movie,
        tags: [...movie.tags, tag]
    }
}
const rambo: Movie = {
    id:1,
    name:'Rambo',
    length:130,
    tags:[]
}
const terminator: Movie = {
    id:2,
    name:'Terminator',
    length:130,
    tags:[]
}
const ramboWithTag = addTag(rambo, '90s') //?


// does this function needs to work with Movie only? maybe generic?
const findById = (list: Movie[], id: Movie['id']): Movie | undefined => {
    return list.find(x => x.id === id);
}
findById([rambo, terminator], 1) //?

type Smth = {id: number, name: string}
const filterBy = (list: Smth[], f: (x: Smth) => boolean) => {
    return list.filter(f); // is this looks like related to Smth type?
}
filterBy([{id:1,name: 'one'}, {id:2, name:'two'}],x => x.id === 1); //?





const prop = <T extends object, K extends keyof T>(obj: T, key: K): T[K] => obj[key]
const a = {a:1, b:2, c:3} // make it as const

// fix the type here:
const set = <T extends object, K extends keyof T>(obj: T, key: K, value: any) => {
    return {
        ...obj,
        [key]: value
    }
}
set({a:1},'a',2) //?

// make types for function working with array with any object type
const findByProp = (list: any, prop: any, value: any): any => {
    return list.find((x: any) => x[prop] === value);
} 

findByProp([rambo, terminator], 'name', 'Terminator') //?

