/**
 * Set集合和Map集合
 */

/**
 * ECMAScript5中的Set集合和Map集合
 */
var set = Object.create(null);
set.foo = true;

//检查属性是否存在
if (set.foo) {
    //要执行的代码
}

var map = Object.create(null);
map.foo = "bar";
var value = map.foo;
console.log(value);

/**
 * 该方案存在的问题
 */
var map = Object.create(null);
map[5] = "bar";
console.log(map["5"]); //"bar"

var map = Object.create(null),
    key1 = {},
    key2 = {};
map[key1] = "foo";
console.log(map[key2]); //"foo"

var map = Object.create(null);
map.count = 1;
if (map.count) {
    //要执行的代码
}

/**
 * ES6中的set集合
 */
let set = new Set();
set.add(5);
set.add("5");
console.log("set.size");

let set = new Set(),
    key1 = {},
    key2 = {};
set.add(key1);
set.add(key2);
console.log(set.size); //2

//重复调用会被忽略
let set = new Set();
set.add(5);
set.add("5");
set.add(5); //这行会被忽略
console.log(set.size);

//通过构造函数
let set = new Set([1, 2, 3, 4, 5, 5, 5]);
console.log(set.size); //5

//has()方法
let set = new Set();
set.add(5);
set.add("5");
set.add(6);
console.log(set.has(5)); //true
console.log(set.has(8)); //false

//移除元素
let set = new Set();
set.add(5);
set.add("5");
console.log(set.has(5)); //true

set.delete(5);
console.log(set.has(5)); //false
console.log(set.size); //1

set.clear();
console.log(set.has("5")); //false
console.log(set.size); //0

/**
 *set集合中的forEach 
 **/
let set = new Set([1, 2]);
set.forEach(function(value, key, ownerSet) {
    console.log(key + "" + value);
    console.log(ownerSet == set);
});

let set = new Set([1, 2]);
let processor = {
    output(value) {
        console.log(value);
    },
    process(dataSet) {
        dataSet.forEach(function(value) {
            this.output(value);
        }, this);
    }
};
processor.process(set);

let set = new Set([1, 2]);
let processor = {
    output(value) {
        console.log(value);
    },
    process(dataSet) {
        data.forEach(value => this.output(value));
    }
};
processor.process(set);

/**
 * set集合转化位数组
 */
let set = new Set([1, 2, 3, 3, 4, 5]),
    array = [...set];
console.log(array); //1,2,3,4,5

function eliminateDuplicates(items) {
    return [...new Set(items)];
}
let num = [1, 2, 3, 4, 5, 5, 6, 6];
noDuplicates = eliminateDuplicates(num);
console.log(noDuplicates);

/**
 * weak set集合
 */
let set = new Set();
key = {};
set.add(key);
console.log(set.size); //1

key = null;
console.log(set.size); //1

//创建weak Set结合
let set = new WeakSet(),
    key = {};
set.add(key);
console.log(set.has(key)); //true
set.delete(key);
console.log(set.has(key)); //false