/**
 * 类
 */
//es5中近类结构
function Person(name) {
    this.name = name;
}
Person.prototype.sayName = function() {
    console.log(this.name);
}
var person = new Person("wukai");
person.sayName();
console.log(person instanceof Person);
console.log(person instanceof Object);

//类的声明
class PersonClass {
    constructor(name) {
        this.name = name;
    }
    sayName() {
        console.log(this.name);
    }
}
let person = new PersonClass("wukai");
peroson.sayName();
console.log(person instanceof PersonClass) //true
console.log(person instanceof Object); //true
console.log(typeof PersonClass); //"function"
console.log(typeof PersonClass.prototype.sayName); //"function"

//等价于下面代码
let personType2 = (function() {
    "use strict";
    const PersonType2 = function(name) {
        if (typeof new.target === "undefined") {
            throw new Error("必须通过关键字new调用构造函数")
        }
        this.name = name;
    }
    Object.defineProperty(PersonType2.prototype, "sayName", {
        value: function() {
            if (typeof new.target !== "undefined") {
                throw new Error("不可以使用关键字new调用该方法");
            }
            console.log(this.name);
        },
        enumerable: false,
        writable: true,
        configurable: true
    });
    return PersonType2;
}());

//类表达式
let PersonClass = class {
    constructor(name) {
        this.name = name;
    }
    sayName() {
        console.log(this.name);
    }
};
let person = new PersonClass("wk");
person.sayName(); //wk
console.log(person instanceof PersonClass); //true
console.log(person instanceof Object) //true

console.log(typeof PersonClass); //"function"
console.log(typeof PersonClass.prototype.sayName); //"function"

//命名类表达式
let PeronClass = class PersonClass2 {
    constructor(name) {
        this.name = name;
    }
    sayName() {
        console.log(this.name);
    }
};
console.log(typeof PeronClass); //"function"
console.log(typeof PersonClass2); //"undefined"

//等价于命名类表达式
let PersonClass = (function() {
    'use strict';
    const PersonClass2 = function(name) {
        if (typeof new.target === "undefined") {
            throw new Error("必须通过关键字new调用构造函数");
        }
        this.name = name;
    }
    Object.defineProperty(PersonClass2.prototype, "sayName", {
        value: function() {
            if (typeof new.target !== "undefined") {
                throw new Error("必须通过关键字new调用构造函数");
            }
            console.log(this.name);
        },
        enumerable: false,
        writable: true,
        configurable: true
    });
    return PersonClass2;

}());

//作为一等公民的类
function createObject(classDef) {
    return new classDef();
}
let obj = createObject(class {
    sayHi() {
        console.log("Hi!");
    }
});
obj.sayHi();

let person = new class {
    construction(name) {
        this.name = name;
    }
    sayName() {
        console.log(this.name);
    }
}("Nicholas");
peoson.sayName();

//访问器属性
class CustomHTMLElement {
    constructor(element) {
        this.element = element;
    }
    get html() {
        return this.element.innerHTML;
    }
    set html(value) {
        this.element.innerHTML = value;
    }
}

//等价于上一个示例
let CustomHTMLElement = (function() {

    'use strict';
    const CustomHTMLElement = function(element) {
        if (typeof new.target === "undefined") {
            throw new Error("必须通过new关键字调用构造函数");
        }
        this.element = element;
    }
    Object.defineProperty(CustomHTMLElement.prototype, "html", {
        enumerable: false,
        configurable: true,
        get: function() {
            return this.element.innerHTML;
        },
        set: function(element) {
            this.element.innerHTML = value;
        }
    });
    return CustomHTMLElement;
}());

/**
 * 可计算成员名称
 */
let methodName = "sayName";
class PersonClass {
    constructor(name) {
            this.name = name;
        }
        [methodName]() {
            console.log(this.name);
        }
};
let me = new PeronClass("Nicholas");
me.sayName();