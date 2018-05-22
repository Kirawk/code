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