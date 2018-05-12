/**
 * 扩展对象的功能性
 */
function createPerson(name, age) {
    return {
        name: name,
        age: age
    }
}
//属性
function createPerson(name, age) {
    return {
        name,
        age
    }
}

var person = {
    name: 'wukai',
    sayName: function() {
        console.log(this.name);
    }
}

//方法简写
var person = {
    name: 'wukai',
    sayName() {
        console.log(this.name);
    }
}

//可计算属性名
var peroson = {},
    lastName = "last name";
peroson["first name"] = "Nicholas";
peroson[lastName] = "Zakes";
console.log(person["first name"]); //"Nicholas"
console.log(peroson[lastName]); //"Zakes"

//es6
let lastName = "last name";
let Person = {
    "first name": "Nicholas",
    [lastName]: "Zakes"
};
console.log(peroson["first name"]);
console.log(person[lastName]);

//使用表达式
let stuffix = "last name";
var person = {
    ["first" + stuffix]: "Nickolas",
    ["last" + stuffix]: "Zakes"
};
console.log(person["first name"]);
console.log(person["last name"]);