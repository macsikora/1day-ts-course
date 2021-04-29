// Function overloads

function sum(a: number, b: number): number
function sum(a: string, b: string): string
function sum(a: any, b: any) {
    return a + b // ah!
}


function append<T>(source: T[], element: T[]): T[]
function append<T>(source: T, element: T): T[]
function append<T>(source: any, element: any) {
    if (Array.isArray(source) && Array.isArray(element)) {
        return [...source, ...element];
    }
    return [source, element];
}

append([1,2],[3,4]); //?
append(1, 2); //?


// write overloads for sum which can be make async and not
function asyncSum(x: number | Promise<number>, y: number | Promise<number>): number | Promise<number> {
    if (x instanceof Promise && y instanceof Promise) {
        return Promise.all([x,y]).then(([v1,v2]) => v1 + v2)
    } 
    return x + y;
}
const asyncOne = new Promise<number>(resolve => setTimeout(() => resolve(1), 1000));
const asyncTwo = Promise.resolve(2)
asyncSum(asyncOne, asyncTwo) //?
asyncSum(1,2) //?
asyncSum(1, asyncOne); //?  should be type error


// do we need overloads here?
function execute(v: any, f: (x:any) => void) {
    if (v instanceof Promise) {
        v.then(insideV => f(insideV))
    } else {
        f(v)
    }
}


export {}