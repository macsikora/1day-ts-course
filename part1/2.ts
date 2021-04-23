// types declarations

// - type space 🔵
// - value space 🟡

// basic type definition
type X = string;
type Y = number;
type Z = boolean;

// value level:
const a: boolean = true;



// literal types = elements of string, number or bool type
type True = true;
type False = false;
type One = 1;
type Name = "Maciej";

const aa: One = 2;
const aaa: Name = "Maciej"

// object types
type SomeObj = {
    a: string,
    b?: boolean,
}
// equivalent by interface keyword
interface ISomeObj {
    a: string
    b?: boolean
}
const isSomeObj: ISomeObj = {
    a:'a',
}

// array types
type Names = string[]
type UserKinds = UserKind[]
type Nums = Array<number>
type Nums2 = number[]

// tuple types
type Pair = [string, number]
type Lotto = [number, string, UserKinds, number, number?, number?]
const lotto: Lotto = [1,'2',[],4]

import {X as XX} from './1'

type UserType = 1;
const User1 = {}

// union types
type Baby = 0 | 1 | 2
type Toddler = 1 | 2 | 3 | 4
type UserKind = 'Standard' | 'Mod' | 'Admin'
type Obj = object;
const obj: Obj = null;

type UserExtended = {
    kind: UserKind
}
const userExt: UserExtended = {
    kind: 'admin'
}

if (userExt.kind === 'mod') {
    userExt
}

// intersected types
type Entity = {
    id: number
}
type User = Entity & {
    name: string
}

type Admin = User & {
    permission: 'full' | 'some'
}
const admin: Admin = {
    id: 1,
    name: 'name',
    permission: 'full'
}

type WhoKnows = Admin | User

type SuperUser = {
    id: number,
    name: string
};
const superUser: SuperUser = {
    id: 1,
    name: 'Super'
}
const whoKnows: User = superUser

// equivalent interface extending
interface IEntity {
    name: string,
    id: number
}
interface IEntity {
    age: number
}
// merging interfaces
const ent: IEntity = {
    name: 'aa',
    id: 1,
    age: 1
}

interface IUser extends IEntity {
    name: string
}

type Paradox = True & False // never
type NotPossible = string & number // never


// composition of types
type Response = {
    user: User,
    userKind: UserKind,
    otherField: number | string
    nested: {
        a: number
    }
}




export { User, UserKind }