/**
 * 块级作用域的绑定
 */
function getValue(condition) {
    if (condition) {
        var value = "blue";
        //其他代码
        return value;
    } else {
        return null;
    }
}
//声明提升的变形如下
function getValue2(condition) {
    var value;
    if (condition) {
        value = "blue";
        return value;
    } else {
        return null;
    }
    console.log(value);
}

/**
 * 块级声明
 */
function getValue3(condition) {
    if (condition) {
        let value = "blue";
        return value;
    } else {
        return null;
    }
}

/*
 * 禁止重声明
 */

var count = 30;
let count = 40; //抛出语法错误

var count = 30;

/**
 * 常量声明
 */
//有效的常量
const maxItems = 30;
//语法错误
const name;

if (condition) {
    const maxItems = 5;
}
//此时的maxitem 在此处是无法访问的

var message = "hello";
let age = 25;

//二者均会抛出错误
const message = "Goodbye";
const age = 30;

//const声明对象
const person = {
    name: "Nicholas"
};
//工作正常
person.name = "Greg";

//抛出错误
person = {
    name: "Greg"
};

//暂时性死区
if (condition) {
    console.log(typeof value);
    let value = "blue";
}
console.log(typeof value);
if (condition) {
    let value = "blue";
}

//循环中的块级元素
for (var i = 0; i < 10; i++) {
    process(item[i]);
}
console.log(i);

for (let i = 0; i < 10; i++) {
    process(item[i]);
}
console.log(i);

//循环内的函数
var funcs = [];
for (var i = 0; i < 10; i++) {
    funcs.push(function() {
        console.log(i);
    })
}
funcs.forEach(function(func) {
    func();
});