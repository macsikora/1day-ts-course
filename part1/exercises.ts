// #1 type properly arguments and return type
// function should work only for arrays with string
const mergeStrArr = (a, b) => {
    return [...a,...b];
}
mergeStrArr(['a','b'],['c']) // correct
mergeStrArr([1], [2]) // should type error
mergeStrArr([1], ['a']) // should type error

// #2 type properly arguments and return type
// function should work for every possible array
const merge = (a, b) => {
    return [...a,...b];
}
merge(['a','b'],['c']) // correct
merge([1], [2]) // correct
merge([1], ['a']) // correct
merge([true], [2,3]) // correct

// #3 type properly arguments and return type
// function should work for numbers

const append = (a, b) => {
    return [...a,b]
} 
append([1,2],1) // correct
append([1,2],'no way') // error
append([1,'str'],1) // error

// #4 type properly arguments and return type
const doIt = (value, action, def) => {
    if (value !== null) {
        return action(value)
    } else {
        return def
    }
}
doIt(1, x => x + 1, 0) // correct
doIt(null, x => x + 1, 0) // correct
doIt('str', x => x + 1, 0) // error
doIt(1, x => x + 1, 'aa') // error  
doIt(1, x => 'str', 0) // error


// #5 type properly arguments and return type
const hasAccess = (us) => {
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
const hasAccessTo = (us, resource) => {
    return us.available.some(({id}) => id === resource.id)
}

// #7 write function which take `obj` and key of `obj` and return back value at this key
// type second argument and return type and default value type, write type safe function
// for null function should return default
type ABC = {a: string, b: string, c: string}
const get(obj: ABC | null, key, def: string) {
    // here your code
}
get({a:'a', b:'b', c:'c'}, 'a', 'default value') // correct
get({a:'a', b:'b', c:'c'}, 1, 'default value') // error
get({a:'a', b:'b', c:'c'}, 'a', 1) // error

//#8 type function
const compose = (f, y, a) => {
    return f(y(a))
}

compose((x) => x + 2, x => x, 1) // ok
compose((x) => x + 2, x => x, true) // error
compose((x) => x + 2, x => '1', 1) // error
compose((x) => x.first(), x => x + 2, 1) // error

// #9 below few api responses from one end point, create a type for the response
const resp9_1 = {
    id: 1,
    comments: [
        {id: 1, content: 'I like it'}
    ],
    likes: 120,
    hearts: 10,
    public: false
}
const resp9_2 = {
    id: 2,
    comments: [
        {id: 1, content: 'I like it'},
        {id: 2, content: 'No way, it is horrible', deleted: true}
    ],
    likes: null,
    hearts: 0,
    public: true
}


// #10 below few api responses from one end point, create a type for the response
const resp10_1 = [
    [1, 'Ala'],
    [2, 'Tomek', {nick: 'Tommy', about: null}]
]

const resp10_2 = [
    [1, 'Jan'],
    [3, 'Robert', {nick: 'Robson', about: 'Here I am again'}]
]


// #11 below api response from one end point, create a type for the response
const resp11_1 = {
    animals: [
        {id: 1, age: 20, kind: 'animal'},
        {id: 2, age: 22, kind: 'animal'},
    ],
    aliens: [
        {id: 1, age: 20, kind: 'alien'},
        {id: 2, age: 22, kind: 'alien'},
    ]
}

export {}