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