type TODO = any;

// type function to work with all arrays
const pick = (arr: TODO[], index: TODO) => {
    return arr[index];
}
pick([1,2],2);
pick([1,2], 'error') // should be compile error

// make function generic 
// should work with all types of arrays without loosing type safety
const removeFromArr = (arr: TODO, value: TODO) => {
    return arr.filter((el: TODO) => el !== value)
}
removeFromArr([1,2,3], 1); // should work but be type safe
removeFromArr(['a','b','c'], 'c'); // should work but be type safe
removeFromArr(['Steven', 'Kate'], 'Robert') // should be compile error


// type by generic to not loose the type
const addScore = (a: {score: number}, b: number): {score: number} => {
    return {...a, score: a.score + b};
}
type Gamer = {
    score: number,
    age: number,
    favorite: string
}
let gamer: Gamer = {
    score:10,
    age:30,
    favorite: 'Mario'
}
gamer = addScore(gamer, 10); // here gamer should be still Gamer and no error


// function should work for all values with data field, but without loosing specific type
const getData = (x: {data: TODO}): TODO => {
    return x.data
}
const data = getData({data: ['a','b']}); // data is any and should be string[]
const data2 = getData({data: 1}); // data2 is any and should be number
const data3 = getData({data: true}); // data3 is any and should be boolean

// write types and use utility type Omit to define object without one field
const removeField = (obj: TODO, field: TODO): TODO  => {
    const nextObj = {...obj};
    delete nextObj[field];
    return nextObj;
}
const withoutA = removeField({a: 1, b: 2}, 'a');
withoutA.a // should be error as field removed
withoutA.b // yes fine

// type function to make object with given keys and values in arrays
// use Record utility type as return type
const makeObj = (keys: TODO, values: TODO): TODO => {
    const obj = {} as any;
    keys.forEach((key:TODO, index:TODO) => {
        obj[key] = values[index];
    })
    return obj;
}
const obj = makeObj(['a','b'],[1,2])// should be Record<'a' | 'b', number>
const obj2 = makeObj([1,2,3], [true, false, true])// should be Record<1 | 2 | 3, boolean>
const obj3 = makeObj([1,2,3], 'error')// should be error


