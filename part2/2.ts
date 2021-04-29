// Utility types - ready to be used generic types (type level functions)

// Partial
type User = {
    id: number,
    name: string,
    active: boolean
}
type PartialUser = Partial<User>;

// Required all fields
type ReqUser = Required<PartialUser>

const verifyUser = (user: PartialUser): Required<PartialUser> => {
    if (typeof user.active === 'boolean' && 
        typeof user.id === 'number' &&
        typeof user.name === 'string'
    ) {
        return user as Required<PartialUser>;
    }
    throw new Error('User data is missing')
}

// Record
type Properties = Record<'a' | 'b' | 'c', number>
const props: Properties = {
    'a': 1,
    'b': 2,
    'c': 3
}
// difference between object literal type? matching key type with value type!
// show example


// NonNullable
type MaybeStr = string | null
type Str = NonNullable<MaybeStr>


// Pick
type Id = Pick<User,'id'>


// Omit
type NoId = Omit<User,'id'>


// Exclude
type MovieTypes = 'horror' | 'thriller' | 'criminal' | 'romance'
type IdontLikeRomance = Exclude<MovieTypes, 'romance'>

// Extract
type BeAfraid = Extract<MovieTypes, 'horror' | 'thriller'>

// ReturnType 
type F = () => number
type FT = ReturnType<F>

// from value level
const intoArray = (x: number) => {
    return [x]
}
// what will happen if we use generic type in intoArray?
type IntoArrayRet = ReturnType<typeof intoArray>