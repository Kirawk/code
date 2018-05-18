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

//Object.is()
console.log(+0 == -0); //true
console.log(+0 === -0); //true
console.log(Object.is(+0, -0)); //false

console.log(NaN == NaN); //false
console.log(NaN === NaN); //false
console.log(Object.is(NaN, NaN));

console.log(5 == 5); //true
console.log(5 == "5"); //true
console.log(5 === "5"); //false
console.log(5 === 5); //true
console.log(Object.is(5, 5)); //true
console.log(Object.is(5, "5")); //false

//混合
function mixmin(receiver, supplier) {
    Object.keys(supplier).forEach(function(key) {
        receiver[key] = supplier[key];
    });
    return receiver;
}

function EventTarget() { /**/ }
EventTarget.prototype = {
    constructor: EventTarget,
    emit: function() {},
    on: function() {}
}
var myObject = {};
mixmin(myObject, EventTarget.prototype);
myObject.emit("somethingChaned");

//assign()方法
function EventTarget() { /**/ }
EventTarget.prototype = {
    constructor: EventTarget,
    emit: function() { /**/ },
    on: function() { /**/ }
}
var myObject = {}
Object.assign(myObject, EventTarget.prototype);
myObject.emit("somethingChanged");

var recevier = {};
object.assign(receiver, {
    type: "js",
    name: "file.js"
}, {
    type: 'css'
});
console.log(recevier.type); //"css"
console.log(recevier.name); //"file.js"

//重复的对象字面量属性
var peoson = {
    name: 'Nicholas',
    name: 'Grag'
}