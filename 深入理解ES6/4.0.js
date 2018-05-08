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