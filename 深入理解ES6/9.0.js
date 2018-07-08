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