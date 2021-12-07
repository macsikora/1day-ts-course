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
    kind: "Mod",
    name: "John"
};
type UserWithDetails = User & { age: number, kind: UserKind }

const tom: UserWithDetails = {
    id: 1,
    age: 20,
    kind: "Mod",
    name: "Tom"
};

// arrays
const names: string[] = ['a','b','c'];
const kinds: UserKind[] = ['Mod', 'Admin'];
const users: User[] = [tom, john, tom];

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
let userKind = ({kind, id}: UserWithDetails) => {
    return id
}

const kind = userKind(tom)

if (kind === 'Admin') {
    kind
} else {
    kind
}



function printId(id: number | string): number | string {
    if (typeof id === 'number') {
        return id
    } else {
        return id.toUpperCase();
    }
}
const b = printId('a');

type F = (x: number, y: number) => number

function nothing(x: string) {

}

const a = nothing('a');
a //?

// higher order function
let ageTransform = (user: UserWithDetails, f: F)
    : UserWithDetails => {
    return {
        ...user,
        age: f(user.age, user.age)
    }
}
const us1: UserWithDetails = {name: 'name', age: 10, id: 11, kind: 'Admin'};
ageTransform(us1, x => x + 1);
ageTransform(us1, () => 1)
ageTransform(us1, (x, y) => 1)

const aa = ['a'].map((str, index) => 'b')





// ### keyof type operator ###
// 🔵 type T = keyof Y
type UserKeys = keyof User;
type UserWithDetailsKeys = keyof UserWithDetails;

type KeyofOfArray = keyof string[];
type K = keyof boolean;

// using in function
type NextUser = UserWithDetails;
let userProp = (user: NextUser, prop: keyof NextUser) => {
    return user[prop];
}
userProp({name: 'John', age: 10, id: 11, kind: 'Admin'}, 'age') //?


// ### as type assertion
// 🟡 value as Type🔵
type PartialCar = {
    model: string,
    maxSpeed: number,
    vin: number
}
type Car = {
    color: string
} & PartialCar;

function pickFaster(a: PartialCar, b: PartialCar) {
    if (a.maxSpeed > b.maxSpeed) {
        return `${a.model} is faster`;
    }
    if (a.maxSpeed < b.maxSpeed) {
        return `${b.model} is faster`
    }
    return `${a.model} has the same speed as ${b.model}`
}
// what if remove annotation?
const bmw: PartialCar = {model:'bmw', maxSpeed: 200};
const fake = {model: 'fake', maxSpeed: 100};

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

Lion.kind = 'Dog'


// ##### typeof operator ####
// 🔵 type T = typeof value🟡
// there is value level operator:
// 🟡 typeof value === 'object'
// taking type from the value level by typeof
type Countries = typeof COUNTRIES;
const CHARACTER = {
    name: "Arthur",
    lastname: "Morgan",
    age: 11
} as const
// what if we will add as const?
type Character = typeof CHARACTER;

// keyof from typeof
type Codes = keyof (typeof COUNTRIES);
type Fields = keyof (typeof CHARACTER);

// indexed type
// Record[field_index]

type UK = Countries['UK'];

type Animal = {
    id: string,
    kind: 'cat' | 'dog' | 'fish' | 'frog'
}
type Thing = {
    animalKind: Animal['kind']
    animalId: Animal['id']
}

const countryByCode = (code: keyof Countries) => {
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
codeByName("Germany") //?


type MovieWithoutConstructor = { type: string, title: string };
const makeMovie = (x: unknown): MovieWithoutConstructor => {
    if (x && typeof x == 'object') {
        if ('type' in x && 'title' in x) {
            return x as MovieWithoutConstructor
        }
    }
    throw new Error('Cannot crate movie');

}
try {
    const m = makeMovie({type: 'as', title: 'asd'});
} catch (e) {
    
}
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
const printTitles = (movies: {title: string}[]) => {
    let res = "";
    for (const movie of movies) {
        res =  res + movie.title + ","
    }
    return res;
}

// works with subclass - obvious?
printTitles([new Serial('comedy', 'Friends', 12), 
new Serial('comedy', 'Crime Story', 12)]); //?
// works with anything which match the requirements? how to change it?
printTitles([{title: "Titanic"}])




export {};