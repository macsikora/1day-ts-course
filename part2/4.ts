// Disjoint unions 💗

import { User } from "../part1/2"

// modeling the state by disjoint union

type SimpleUnion = 1 | 2 | 3 | 3// 3 elements
type AnotherSimpleUnion = 3 | 4 | 5 // 3 elements
type ThirdSimpleUnion = SimpleUnion | AnotherSimpleUnion // 3 + 3 = 5 elements ?

type Nullable<T> = T | null
type What = Nullable<null> // wow null can be T!


// disjoint unions have unique members

type DisjointUnion = { tag: 'first', value: 1} | { tag: 'first', value: 2} | { tag: 'first', value: 3} // 3
type AnotherDisjointUnion = { tag: 'second', value: 3} | { tag: 'second', value: 4} | { tag: 'second', value: 5} // 3
type ThirdDisjointUnion = DisjointUnion | AnotherDisjointUnion // 6 elements


// another comparison
type Union = 1 | 1 // 1 element
type Disjoint = {tag:'a', value: 1} | {tag:'b', value: 2}; // 2 elements


// why I can need it?
type Err<T> = {
    tag: 'error',
    error: T
}
type Success<T> = {
    tag: 'success',
    data: T
}
type Response<S, E> = Success<S> | Err<E> 

function handleResponse(resp: Response<User, Error>) {
    if (resp.tag === 'success') {
        return resp.data.name
    } else {
        return resp.error.message
    }
}

// nice type, we can work with it?
type Base = {
    age: number,
    eyeColor?: string
}

type Human = Base & {
    type: 'human',
    pesel: string,
    employment: boolean,
    company?: string,
    bloodType: 'A' | 'AB' | 'B' | '0'
}
type Dog = Base & {
    type: 'dog',
    microchipNum: string,
    tailLength: number,
    bloodType: 'DEA.1' | 'DEA.2' | 'DEA.3'
} 

type Cat = Base & {
    type: 'cat',
    microchipNum: string,
    tailLength: number,
    bloodType: 'A' | 'B'
}

type Creature = Human | Dog | Cat

const Marek: Creature = {
    type:'human',
    age: 23,
    pesel: 'asdasd',
    employment: false,
    company: 'Apple',
    bloodType: 'A'
}
const Ciapek: Creature = {
    type: 'dog',
    age: 99,
    microchipNum: 'aasas',
    bloodType: 'DEA.1',
    tailLength: 12
}

function handleCreature(a: Creature) {
    if (a.type === 'human') {
        a.b
    }
}



export {}