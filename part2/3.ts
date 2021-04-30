// Function overloads


type A = string | number
type H<T extends string | number> = T
type R = H<A>

function sum<T extends string | number>(a: T, b: T) {
    if (typeof a === 'string' && typeof b === 'string')
        return a + b;
    if (typeof a === 'number' && typeof b === 'number')
        return a + b;
}
sum(1,2);
sum('a','b');
sum('a',1);
sum(1, 'a');


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
append([1], 1); 
append(1, [1]);


// write overloads for sum which can be make async and not
function asyncSum(x: Promise<number>, y: Promise<number>): Promise<number>
function asyncSum(x: number, y: number): number
function asyncSum(x: any, y: any): any {
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
function execute<T>(v: Promise<T>, f: (x:T) => void): void
function execute<T>(v: T, f: (x:T) => void): void
function execute(v: any, f: (x:any) => void) {
    if (v instanceof Promise) {
        v.then(insideV => f(insideV))
    } else {
        f(v)
    }
}
execute('a', (x) => x.toUpperCase()) //?
execute(Promise.resolve('a'), x => x) //?



type TrueOrFalse<X extends boolean> = X extends true ? 'Tak jestes True' : 'Nie zle';
type OneTwoThree = 1 | 2 | 3

type XX<T extends OneTwoThree> = T extends 1 ? 'One' :
    T extends 2 ? 'Two' :
    T extends 3 ? 'Three' : never

type IsOne = XX<1 | 2 | 3>;


export {}