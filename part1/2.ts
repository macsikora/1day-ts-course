// types declarations

// - type space 🔵
// - value space 🟡

// basic type definition
type X = string;
type Y = number;
type Z = boolean;

// literal types = elements of string, number or bool type
type True = true;
type False = false;
type One = 1;
type Name = "Maciej";

// object types
type SomeObj = {
    a: string,
    b: boolean,
}
// equivalent by interface keyword
interface ISomeObj {
    a: string
    b: boolean
}

// array types
type Names = string[]
type UserKinds = UserKind[]
type Nums = Array<number>

// tuple types
type Pair = [string, number]
type Lotto = [number, number, number, number, number, number]

// union types
type Baby = 0 | 2
type Toddler = 1 | 2 | 3 | 4
type UserKind = 'standard' | 'mod' | 'admin'
type MaybeString = string | null

// intersected types
type Entity = {
    id: number
}
type User = Entity & {
    name: string
}
// equivalent interface extending
interface IEntity {
    id: number
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