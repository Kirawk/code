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
    name: 'Grag' //报错
}
console.log(peoson.name); //报错

var peoson = {
    name: 'Nicholas',
    name: 'Grag' //es6
}
console.log(person.name); //打印出Grag

//自有属性枚举顺序
var obj = {
    a: 1,
    0: 1,
    c: 1,
    2: 1,
    b: 1,
    1: 1
};
obj.d = 1;
console.log(Object.getOwnPropertyNames(obj).join()); //"012acbd"

//改变对象的原型
let person = {
    getGreeting() {
        return "Hello"
    }
};
let dog = {
    getGreeting() {
        return "Woof";
    }
};

let friend = Object.create(peoson);
console.log(friend.getGreeting()); //Hello
console.log(Object.getPrototypeOf(friend) === peoson); //true

//将原型设置为dog
Object.setPrototypeOf(friend, dog);
console.log(friend.getGreeting()); //"Woof"
console.log(Object.getPrototypeOf(friend) === dog); //true

//Super引用
let person = {
    getGreeting() {
        return "Hello"
    }
};
let dog = {
    getGreeting() {
        return "Woof";
    }
};
let friend = {
        getGreeting() {
            return Object.getPrototypeOf(this).getGreeting.call(this) + ",hi!";
        }
    }
    //原型设置成perosn
Object.setPrototypeOf(friend, person);
console.log(friend.getGreeting()); //"Hello,Hi!"
console.log(Object.getPrototypeOf(friend) === peoson); //true

//将原型设置成dog
Object.setPrototypeOf(friend, dog);
console.log(friend.getGreeting()); //"Woof,Hi"
console.log(Object.getPrototypeOf(friend) === dog); //true

//使用super改写上述代码
let friend = {
    getGreeting() {
        return super.getGreeting() + ",Hi!";
    }
};

let person = {
    getGreeting() {
        return "Hello"
    }
};
//以person对象为原型
let friend = {
    getGreeting() {
        return Object.getPrototypeOf(this).getGreeting.call(this) + ",hi!";
    }
};
Object.setPrototypeOf(friend, person);

let relative = Object.create(friend);
console.log(peoson.getGreeting()); //"Hello"
console.log(friend.getGreeting()); //"Hello,Hi"
console.log(relative.getGreeting()); //error

let person = {
    getGreeting() {
        return "Hello"
    }
};
let friend = {
    getGreeting() {
        return super.getGreeting() + ',hi!';
    }
};
Object.setPrototypeOf(friend, person);

let relative = Object.create(friend);
console.log(peoson.getGreeting()); //"Hello"
console.log(friend.getGreeting()); //"Hello,Hi"
console.log(relative.getGreeting()); //"Hello,Hi"

//正式的方法定义
let person = {
    getGreeting() {
        return "Hello"
    }
};

function shareGreeting() {
    return "Hi!";
}
let friend = {
    getGreeting() {
        return super.getGreeting() + ",hi!";
    }
};
Object.setPrototypeOf(friend, person);
console.log(friend.getGreeting()); //"Hello,hi!"