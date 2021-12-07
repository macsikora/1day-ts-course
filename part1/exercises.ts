// #1 type properly arguments and return type
// function should work only for arrays with string
const mergeStrArr = (a: string[], b: string[]) => {
    return [...a,...b];
}
mergeStrArr(['a','b'],['c']) // correct
mergeStrArr([1], [2]) // should type error
mergeStrArr([1], ['a']) // should type error

// #2 type properly arguments and return type
// function should work for every possible array
const merge = (a: unknown[], b: unknown[]) => {
    return [...a,...b];
}
merge(['a','b'],['c']) // correct
merge([1], [2]) // correct
merge([1], ['a']) // correct
merge([true], [2,3]) // correct

// #3 type properly arguments and return type
// function should work for numbers

const append = (a: number[], b: number): number[] => {
    return [...a,b]
} 
append([1,2],1) // correct
append([1,2],'no way') // error
append([1,'str'],1) // error

// #4 type properly arguments and return type
const doIt = (value: number | null, action: (x: number) => number, def: number) => {
    if (value !== null) {
        return action(value)
    } else {
        return def
    }
}
doIt(1, x => x + 1, 0) //?
doIt(null, x => x + 1, 0) //? correct
doIt('str', x => x + 1, 0) //? error
doIt(1, x => x + 1, 'aa') //? error  
doIt(1, x => 'str', 0) //? error


// #5 type properly arguments and return type
const hasAccess = (us: {type: 'admin' | 'mod' | 'standard', extendedAccess: boolean}) => {
    if (us.type === 'admin') {
        return true;
    }
    if (us.type === 'mod') {
        return us.extendedAccess;
    }
    if (us.type === 'standard') {
        return false
    }
    throw new Error('No such user')
}


// #6 type properly arguments and return type
type Res = {id: unknown}
type Us = {
    available: Res[]
}
const hasAccessTo = (us: Us, resource: Res) => {
    return us.available.some(({id}) => id === resource.id)
}

// #7 write function which take `obj` and key of `obj` and return back value at this key
// type second argument and return type and default value type, write type safe function
// for null function should return default
type ABC = {a: string, b: string, c: string}
const get = (obj: ABC | null, key: keyof ABC, def: ABC[keyof ABC]) => {
    // here your code
    if (obj !== null) {
        return obj[key]
    } else {
        return def
    }
}
get({a:'a', b:'b', c:'c'}, 'a', 'default value') // correct
get({a:'a', b:'b', c:'c'}, 1, 'default value') // error
get({a:'a', b:'b', c:'c'}, 'a', 1) // error

//#8 type function
const compose = <T, U, V>(f: (x: U) => V, y: (x: T) => U, a: T) => {
    return f(y(a))
}

compose((x: string) => x + 2, (x: number) => x.toString() , 1) // ok
compose((x: number) => x + 2, x => x, 1)

const add1 = (x: number) => x + 1;
const add2 = (x: number) => x + 2

compose(add1, add2, 1); //?



// #9 below few api responses from one end point, create a type for the response
const resp9_1: Response = {
    id: 1,
    comments: [
        {id: 1, content: 'I like it'}
    ],
    likes: 120,
    hearts: 10,
    public: false
}
const resp9_2: Response = {
    id: 2,
    comments: [
        {id: 1, content: 'I like it'},
        {id: 2, content: 'No way, it is horrible', deleted: true}
    ],
    likes: null,
    hearts: 0,
    public: true
}
type Comment = {
    id: number,
    content: string,
    deleted?: boolean
}
type Response = {
    id: number,
    comments: Comment[],
    likes: number | null,
    hearts: number,
    public: boolean
}


{
// #10 below few api responses from one end point, create a type for the response
const resp10_1: Response = [
    [1, 'Ala'],
    [2, 'Tomek', {nick: 'Tommy', about: null}]
]

const resp10_2: Response = [
    [1, 'Jan'],
    [3, 'Robert', {nick: 'Robson', about: 'Here I am again'}]
];

    type User = [number, string, {nick: string, about: string | null}?];
    type Response = User[]
}


// #11 below api response from one end point, create a type for the response
const resp11_1 = {
    animals: [
        {id: 1, age: 20, kind: 'animal'},
        {id: 2, age: 22, kind: 'animal'},
    ],
    aliens: [
        {id: 1, age: 20, kind: 'alien', planet: 'Mars'},
        {id: 2, age: 22, kind: 'alien', planet: 'Mars'},
    ]
}

type Base = {
    id: number,
    age: number
}
type Alien = Base & {kind: 'alien', planet: string}
type Animal = Base & {kind: 'animal'}

type Resp2 = {
    animals: Animal[],
    aliens: Alien[]
}
const dog: Animal = {
    id: 1,
    age: 2,
    kind: 'animal'
}
const ufo: Alien = {
    id: 1,
    age: 2,
    kind: 'alien',
    planet: 'Mars'
}

type X = Alien | Animal;
function handleX(x:X) {
    if (x.kind === 'alien') {
        x.planet
    } else {
        x.planet
    }
}

const resp: Resp2 = {
    aliens: [ufo],
    animals: [dog]
}

export {}