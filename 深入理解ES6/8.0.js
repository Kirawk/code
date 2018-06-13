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