/*****箭头函数****/
/**
 * 箭头函数语法
 */

//一个参数
let value = value => value;
let value = function(value) {
    return value;
};

//两个参数
let sum = (num1, num2) => num1 + num2;
let sum = function(num1, num2) {
    return num1 + num2;
};

//没参数
let getName = () => "Nicholas";
let getName = function() {
    return "Nicholas";
};

//多个参数与多个表达式
let a = (x, y) => {
    if (x > y) {
        return x;
    } else {
        return y;
    }
};
let a = function(x, y) {
    if (x > y) {
        return x;
    } else {
        return y;
    }
};

//创建一个空函数
let doNothing = () => {};
let doNothing = function() {};

//创建一个对象字面量
let getTempItem = id = ({ id: id, name: "Temp" });
//实际上相当于
let getTempItem = function() {
    return {
        id: id,
        name: "Temp"
    };
};

/**
 * 创建立即执行函数
 */

let person = function(name) {
    return {
        getName: function() {
            return name;
        }
    };
}("Nicholas");
console.log(person.getName());

let person = ((name) => {
    return {
        getName: function() {
            return name;
        }
    };
})("Nicholas");