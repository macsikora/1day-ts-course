// Unsound types and type assertion "as"

// any
function concat(a: string, b: string) {
    return a + b
}

let v1: any = 1;
let v2: any = [2]
concat(v1, v2);

let str: string = v1;



// the better any - unknown
let un: unknown 
str = un;

if (typeof un === 'string') {
    str = un;
}

function appendToArray(arr: unknown, x: unknown) {
    if (Array.isArray(arr)) {
        return [...arr, x]
    } else {
        return []
    }
}

appendToArray(true, false) //?


// never
const bomb = () => { 
    throw new Error('💣')
}

type NoWay = true & false;
type HowSo = "Maciej" & "Stafan"

function fn(x: string | number) {
    if (typeof x === "string") {
      // do something
    } else if (typeof x === "number") {
      // do something else
    } else {
      x; // has type 'never'!
    }
}





export {}