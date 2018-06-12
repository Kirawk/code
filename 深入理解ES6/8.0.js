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