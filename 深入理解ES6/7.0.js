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

let set = new Set();
key1 = {};
key2 = {};
set.add(key1);
set.add(key2);
console.log(set.size); //2