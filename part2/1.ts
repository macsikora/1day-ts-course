// Introduction to generic types

// generic type is type with an argument


// build simple generics

const arr: Array<string> = ['hi'];
const pro: Promise<number> = Promise.resolve(1)
const strNumMap: Map<string,number> = new Map([['a',1],['b',2]]) //?
const st: Set<number> = new Set([1,2,3,4]) //?


// custom generics
type MyFirstGeneric<T> = {data: T}
const aa: MyFirstGeneric<string> = {
    data: 'str'
}
type Nullable<T> = T | null
const aNull: Nullable<number> = null;


type WithId<Foo> = Foo & { id: number }
type G = {
    name: string
}
type GWithId = WithId<G>
const gWithId: GWithId = {
    id: 1,
    name: 'str'
}



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

const id = <T>(x: T): T => x
id(1)
id('str' as string)

const merge = <T, U>(a: T[], b: U[]) => {
    return [...a,...b];
}
const listNumbers = [1,2,3];
const listStrings = ['a','b','c'];
const res = merge(listNumbers, listStrings); //?

const append = <Foo>(a: Foo[], b: Foo) => {
    return [...a,b]
} 

const map = <T, U>(arr: T[], f: (x: T) => U): U[] => {
    return arr.map(f)
}
map<number, number>([1,2], x => x + 1)
map(['str', 'e'], x => x.length) //?


// extends keyword
// T extends Y
type GetId<T extends {id: any}> = T['id']
type ObjKeyof<T extends object> = keyof T
type Str1 = ObjKeyof<{a: string}>
type SameKeys<T extends object, Y extends object> = keyof T & keyof Y
type ResSameKeys = SameKeys<{a: string, b: string}, {a: number, c: number}>
type AllValues<T extends object, Y extends object> = T[keyof T] | Y[keyof Y]

// better AddKeys with extend:
type BetterAddKeys<T extends object, Keys> = keyof T | Keys
type Res2 = BetterAddKeys<{a: string}, 'c'>


// using indexed type with generics
type Prop<T extends object, Prop extends keyof T> = T[Prop]
type TestProp = Prop<{a: 1, b: 2}, 'a'>


// annotated value level using extends
type Movie = {
    id: number,
    name: string,
    length: number,
    tags: string[]
}

type StrArr = string[]
type ValueOfStrArr = StrArr[number]

// does this function needs Movie type as a whole? maybe generic?
const addTag = <T extends {tags: string[]}>(value: T, tag: string): T => {
    return {
        ...value,
        tags: [...value.tags, tag],
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
const notARambo = {tags: ['as'], content: 'Hey'}
const ramboWithTag = addTag(notARambo, '90s')//?

// does this function needs to work with Movie only? maybe generic?
const findById = <T extends {id: unknown}>(list: T[], id: T['id']): T | undefined => {
    return list.find(x => x.id === id);
}
const foundRambo = findById([rambo, terminator], 1) //?
const foundOther = findById([{id: 'a'}, {id: 'b'}], 'a') //?

const filterBy = <T>(list: T[], f: (x: T) => boolean) => {
    return list.filter(f); // is this looks like related to Smth type?
}
filterBy([{id:1,name: 'one'}, {id:2, name:'two'}],x => x.id === 1); //?
filterBy(['a','b'],x => x === 'a'); //?




const prop = <T extends object, K extends keyof T>(obj: T, key: K): T[K] => obj[key]
const a = {a:1, b:2, c:3} as const // make it as const
const va = prop(a, 'a') //?

// fix the type here:
const set = <T extends object, K extends keyof T>(obj: T, key: K, value: T[K]) => {
    return {
        ...obj,
        [key]: value
    }
}
const withA = set({a:1, b: 'str'},'b', 'str') //?
withA.notHere

// make types for function working with array with any object type
const findByProp = <T extends object, P extends keyof T>(list: T[], prop: P, value: T[P]) => {
    return list.find((x: any) => x[prop] === value);
} 

const term = findByProp([rambo, terminator], 'id', 1) //?
const aRes = findByProp([{a: 1}, {b: 2}, {c: 3}], 'a', 1) //?

