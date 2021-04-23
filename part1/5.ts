// Nullable and type guards
// strictNullChecks: true

import { User } from "./2";
import { COUNTRIES } from "./3";

const x: string | null = null;
const y: string = x;

function showName(user: User | null) {
    return user.name
}

// narrowing by typeof
let z = 1 as string | number;
if (typeof z === 'number') {
    z
} else {
    z
}

// narrowing by typeof
function printAll(strs: string | string[] | null) {
    if (strs && typeof strs === "object") {
      for (const s of strs) {
        console.log(s);
      }
    } else if (typeof strs === "string") {
      console.log(strs);
    }
  }

// narrowing by instanceof
function showDate(x: Date | string) {
    if (x instanceof Date) {
      return x.toUTCString();
    } else {
      return x.toUpperCase();
    }
  }



// mutants 👾 - custom guards
type Mutant = {
    name: string,
    strength: number,
    healing: number
}
type Human = {
    name: string,
    age: number
}

type Somebody = Mutant | Human

const isObject = (x: unknown): x is object => x !== null && typeof x === 'object'
const isSomebody = (x: object): x is Somebody => 'name' in x
const isHuman = (x: Somebody): x is Human => 'age' in x;
const isMutant = (x: Somebody): x is Mutant => 'strength' in x;

const welcome = (x: unknown) => {
    // ... what now?
    if (isObject(x)) {
        if (isSomebody(x)) {
            if (isHuman(x)){
                return 'Hi Human';
            } else {
                return 'Hi Mutant';
            }
        }
    }
}

type X = keyof {
    a?: string
}











// decoder narrowing with using unknown
const decoder = <Out>(decode: (x: unknown) => Out) => (input: unknown): Out => {
    return decode(input);
}

type CountrCode = keyof(typeof COUNTRIES)
type City = {
    name: string,
    countryCode: CountrCode
}
const cityDecoder1 = decoder((input): City => {
    if ( input && typeof input === 'object') {

        if ('name' in input && 'countryCode' in input) {
            return input as City;
        }
    }
    throw new Error('City data is incorrect');
})
const warsaw = cityDecoder1({name: 'Warsaw', countryCode: 'PL'}) //?

// the better decoder
const cityDecoder2 = decoder((input) => {
    const almostCity = cityDecoder1(input);
    if (almostCity && typeof almostCity['name'] === 'string' && almostCity['countryCode'] in COUNTRIES) {
        return almostCity
    }
    throw new Error('City data is incorrect')
})
const london = cityDecoder2({name: '', countryCode: 'UK'}); //?



// Q and A


export {}