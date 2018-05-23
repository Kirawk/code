/**
 * 解构
 */
let options = {
    repeat: true,
    save: false
}
let repeat = options.repeat;
save = options.save;

/**
 * 对象解构
 */
let node = {
    type: "Identifier",
    name: "foo"
};
let { type, name } = node;
console.log(type); //"Identifier"
console.log(name); //"foo"

//解构赋值
let node = {
        type: 'Identifier',
        name: 'foo'
    },
    type = "Literal",
    name = 5;
//使用解构语法为多个变量赋值
({ type, name } = node);
console.log(type); //"Identifier"
console.log(name); //"foo"