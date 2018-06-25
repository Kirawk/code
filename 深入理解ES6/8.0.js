/**
 * 迭代器与生成器
 */
var colors = ["red", "green", "blue"];
for (var i = 0, len = colors.length; i < len; i++) {
    console.log(colors[i]);
}

function createIterator(items) {
    var i = 0;
    return {
        next: function() {
            var done = (i >= items.length);
            var value = !done ? items[i++] : undefined;
            return {
                done: done,
                value: value
            };
        }
    };
}
var iterator = createIterator([1, 2, 3]);

//生成器
function* createIterator() {
    yield 1;
    yield 2;
    yield 3;
}
let iterator = createIterator();
console.log(iterator.next().value); //1
console.log(iterator.next().value); //2
console.log(iterator.next().value); //3

function* createIterator(items) {
    for (let i = 0; i < items.length; i++) {
        yield items[i];
    }
}

let iterator = createIterator([1, 2, 3]);
console.log(iterator.next()); //1
console.log(iterator.next()); //2
console.log(iterator.next()); //3
console.log(iterator.next()); //{value:undefined done:true}

//生成器函数表达式
let iterator = function* createIterator(items) {
    for (let i = 0; i < items.length; i++) {
        yield items[i];
    }
}

//生成器对象的方法
let o = {
    createIterator: function*(items) {
        for (let i = 0; i < items.length; i++) {
            yield items[i];
        }
    }
}

//可迭代对象与for-of循环
let values = [1, 2, 3];
for (let num of values) {
    console.log(num);
}

//访问默认的迭代器
let values = [1, 2, 3];
let iterator = values[Symbol.iterator]();
console.log(iterator.next()); //1 false
console.log(iterator.next()); //2 false
console.log(iterator.next()); //3 false
console.log(iterator.next()); //undefined false

//检测对象是否是可迭代对象
function isIterable(object) {
    return typeof object[Symbol.iterator] == "function"
}
console.log(isIterable([1, 2, 3]));
console.log(isIterable("hello"));
console.log(isIterable(new Map()));
console.log(isIterable(new Set()));
console.log(isIterable(new WeakMap()));
console.log(isIterable(new WeakSet()));

//创建可迭代对象
let collections = {
        items: [],
        *[Symbol.iterator]() {
            for (let item of this.items) {
                yield item;
            }
        }
    }
    //等价于
let collection = {
    items: [],
    [Symbol.iterator]: function*() {
        for (let item of this.items) {
            yield item;
        }
    }
}
collections.items.push(1);
collections.items.push(2);
collections.items.push(3);
for (let x of collections) {
    console.log(x);
}

//内建迭代器
//enteries迭代器
let colors = ["red", "green", "blue"];
let tracking = new Set([1234, 5678, 9012]);
let data = new Map();
data.set("title", "es6");
data.set("format", "ebook");

for (let entry of colors.entries()) {
    console.log(entry);
}
for (let entry of tracking.entries()) {
    console.log(entry);
}
for (let entry of data.entries()) {
    console.log(entry);
}

//values迭代器
let colors = ["red", "green", "blue"];
let tracking = new Set([1234, 5678, 9012]);
let data = new Map();
data.set("title", "es6");
data.set("format", "ebook");

for (let value of colors.values()) {
    console.log(value);
}
for (let value of tracking.values()) {
    console.log(value);
}
for (let value of data.values()) {
    console.log(value);
}
//keys（）迭代器
let colors = ["red", "green", "blue"];
let tracking = new Set([1234, 5678, 9012]);
let data = new Map();
data.set("title", "es6");
data.set("format", "ebook");

for (let key of colors.keys()) {
    console.log(key);
}
for (let key of tracking.keys()) {
    console.log(key);
}
for (let key of data.keys()) {
    console.log(value);
}
//字符串迭代器
var message = "A 吉 B";
for (var i = 0; i < message.length; i++) {
    console.log(message[i]);
}

var message = "A 吉 B";
for (let c of message) {
    console.log(c);
}
//A
//(空)
//吉
//(空)
//B

//NodeList迭代器
var divs = document.getElementsByTagName("div");
for (let div of divs) {
    console.log(div.id);
}