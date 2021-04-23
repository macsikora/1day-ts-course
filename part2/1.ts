// GENERIC SHOW with INDEXED TYPE

let userProp2 = <Prop extends keyof UserWithDetails>(user: UserWithDetails, prop: Prop) => {
    return user[prop];
}
let a = userProp2({name: 'name', age: 10, id: 11, kind: 'admin'}, 'age')


type KeyofOfTuple = Exclude<keyof [1,2,3], keyof any[]>;