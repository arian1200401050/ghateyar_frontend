function test () {
    let a = 1;
    let b = 2;
    return {a, b}
}

const {a, b} = test();

console.log(a, b);