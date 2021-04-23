// Using types in value space by type annotation

// - type space 🔵
// - value space 🟡
import { User, UserKind } from './2'

// 🟡 let/const/var name: Type🔵 = value;
const x: number = 1;
const user: User = {
    id: 12,
    name: "aaa"
}

// objects
const john: User & { age: number, kind: UserKind } = {
    id: 1,
    age: 20,
    kind: "mod",
    name: "John"
};
type UserWithDetails = User & { age: number, kind: UserKind }

const tom: UserWithDetails = {
    id: 1,
    age: 20,
    kind: "mod",
    name: "Tom"
};

// arrays
const names: string[] = ['a','b','c'];
const kinds: UserKind[] = ['mod', 'admin'];
const users: User[] = [tom, john];

// tuples
const userPair: [User, User] = [tom, john];
const userTuple: [number, string, UserKind] = [john.id, john.name, john.kind]


// functions
// 🟡 function name(arg: Type🔵, arg2: Type🔵): Type🔵 {...}
// 🟡 const/let/bar name = (arg: Type🔵, arg2: Type🔵): Type🔵 => {...}

function userAge(user: UserWithDetails): number {
    return user.age
}
// what will happen if the return type will be removed?
let userKind = (user: UserWithDetails): UserKind => {
    return user.kind
}

function printId(id: number | string): number | string {
    return id.toUpperCase(); //?
}
const b = printId('a');

// higher order function
let ageTransform = (user: UserWithDetails, f: (x: number) => number): UserWithDetails => {
    return {
        ...user,
        age: f(user.age)
    }
}
ageTransform({name: 'name', age: 10, id: 11, kind: 'admin'}, x => x + 1);

// ### keyof type operator ###
// 🔵 type T = keyof Y
type UserKeys = keyof User;
type UserWithDetailsKeys = keyof UserWithDetails;

type KeyofOfArray = keyof string[];

// using in function
let userProp = (user: UserWithDetails, prop: keyof UserWithDetails) => {
    return user[prop];
}
userProp({name: 'John', age: 10, id: 11, kind: 'admin'}, 'name') //?


// ### as type assertion
// 🟡 value as Type🔵
type Car = {
    model: string,
    maxSpeed: number
}

function pickFaster(a: Car, b: Car) {
    if (a.maxSpeed > b.maxSpeed) {
        return `${a.model} is faster`;
    }
    if (a.maxSpeed < b.maxSpeed) {
        return `${b.model} is faster`
    }
    return `${a.model} has the same speed as ${b.model}`
}
// what if remove annotation?
const bmw: Car = {model:'bmw', maxSpeed: 200};
const fake = {model: 'fake'} as Car;
const fake2 = {maxSpeed: 1000} as Car;

const results = pickFaster(bmw, fake); //?



// #### as const - annotation
// 🟡 let/var/const name = value as const
export const COUNTRIES = {
    PL: "Poland",
    UK: "United Kingdom",
    US: "United States of America",
    GE: "Germany"
} as const
// what happens when we remove as const?

const Lion = {
    kind: 'Tiger',
    name: 'Simba'
} as const


// ##### typeof operator ####
// 🔵 type T = typeof value🟡
// there is value level operator:
// 🟡 typeof value === 'object'
// taking type from the value level by typeof
type Countries = typeof COUNTRIES;
const CHARACTER = {
    name: "Arthur",
    lastname: "Morgan"
}
// what if we will add as const?
type Character = typeof CHARACTER;

// keyof from typeof
type Codes = keyof (typeof COUNTRIES);
type Fields = keyof (typeof CHARACTER);

// indexed type
// Record[field_index]

type UK = Countries['UK'];

const countryByCode = (code: keyof Countries): Countries[keyof Countries] => {
    return COUNTRIES[code];
}
countryByCode("PL") //?

const codeByName = (name: Countries[Codes]): keyof Countries => {
    for (const [key, val] of Object.entries(COUNTRIES)) {
        if (val === name) {
            return key as keyof Countries
        }
    }
    throw new Error('name incorrect');
}
codeByName("Poland") //?

// class is a special construct which lives in both words value and type space
class Movie {
    type: string;
    title: string;
    constructor(type: string, title: string) {
        this.type = type;
        this.title = title
    }
}
const matrix = new Movie("sci-fi", "Matrix");

class Serial extends Movie {
    episodes: number
    constructor(type: string, title: string, episodes: number) {
        super(type, title);
        this.episodes = episodes;
    }
}

// rant about structural types
const printTitles = (movies: Movie[]) => {
    let res = "";
    for (const movie of movies) {
        res =  movie.title + ","
    }
    return res.substr(0,-1);
}

// works with subclass - obvious?
printTitles([new Serial('comedy', 'Friends', 12)]);
// works with anything which match the requirements? how to change it?
printTitles([{title: "Titanic"}])




export {};