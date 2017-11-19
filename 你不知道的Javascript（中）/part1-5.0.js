/* 语法
*@  5.1 语句和表达式
*/
var b;
if (true) {
    b = 4 + 38;
}

var a, b;
a = if (true) {
    b = 4 + 38;
};

//do表达式
var a, b;
a = do {
    if (true) {
        b = 4 + 38;
    }
};
a;//42

//表达式副作用
var a = 2;
var b = a + 3;

function foo() {
    a = a + 1;
}
var a = 1;
foo();

var a = 42;
var b = a++;
a;
b;

var a = 42;
a++;
a;
++a;
a;//44

var a = 42;
a++;
a;//43
++a;
a;//44

var a = 42;
var b = (a++);
a;//43
b;//42

var a;
a = 42;
a;//42

function vowls(str) {
    var matches;
    if (str) {
        matches = str.match(/[aeiou]/g);
        if (matches) {
            return matches;
        };
    };
}
vowls("Hello world!");//["e", "o", "o"]

//改写上述代码
function vowls(str) {
    var matches;

    if (str && (matches = str.match(/[aeiou]/g))) {
        return match;
    }
}
vowls("Hello world!");


//5.1.3上下文规则
var a = {
    foo: bar()
};


foo: for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
        //如果j和i相等，继续外层的循环
        if (j == i) {
            continue foo;
        }
        //跳过奇数结果
        if ((j * i) % 2 == 1) {
            continue;
        }

        console.log(i, j);
    }
}
//1 0
//2 0
//2 1
//3 0
//3 2

function foo() {
    bar: {
        console.log("hello");
        break bar;
        console.log("never runs");
    }
    console.log("world!");
}
foo();
//hello
//world

//代码快
[] + {};//[object Object]
{ } +[];//0

//对象解构
function getData() {
    //
    return {
        a: 42,
        b: "foo"
    };
}
var { a, b } = getData();
console.log(a, b);//42 "foo";
//类似下面的代码
var res = getData();
var a = res.a;
var b = res.b;

function foo({ a, b, c }) {
    console.log(a, b, c);
}
foo({
    c: [1, 2, 3],
    a: 42,
    b: "foo"
});

//else if(javascript 没有if else if else)

if (a) {
    //
} else if (b) {
    //
} else {
    //  
}
//本质
if (a) dosomenthing(a);
if (a) {
    //
} else {
    if (b) {
        //..
    } else {
        //..
    }
}

// 5.2 运算符优先级
var a = 42;
var b = "foo";
a && b;
a || b;

var a = 42;
var b = "foo";
var c = [1, 2, 3];
a && b || c;
a || b && c;

var a = 42, b;
b = (a++ , a);
a;//43
b;//43

var a = 42, b;
b = a++ , a;
a;//43
b;//42

var a = 42;
var b = "foo";
var c = false;

var d = a && b || c ? c || b ? a : c && b : a;
d;//42

(false && true) || true;//true
false && (true || true);//false

false && true || true;//true
(false && true) || true;

true || false && false;//true
(true || false) && false;//false
true || (false && false);//true 说明&&运算符优先于||

//5.2.1 短路
function dosomenthing(opts){
    if(opts && opts.cool){
        //domething
    }
}

function domething(opts){
    if(opts.cache || primeCache()){
        //...
    }
}

//5.2.2 更强的绑定
a && b || c ? c || b ? a : c && b : a
(a && b || c) ? (c || b) ? a : (c && b) : a

//5.2.3 关联 关联顺序不同结果是不同的
true ? false : true ? true : false;//false
true ? false : (true ? true : false);//false
(true ? false : true) ? true : false;//false

 var a = true,b = false ,c = true, d =true, e = false;
 a ? b :(c ? d : e); //false,执行a和b；
 (a ? b : c) ? d : e; //false,执行a,b和e

var a = 42;
var b = "foo";
var c = false;

var d = a && b || c ? c || b ? a : c && b : a;
d;//42
//改写上述代码P110
((a && b) || c ) ? ((c || b) ? a : (c && b)) : a;

//5.2.4 释疑
//5.3 自动分号
var a = 42, b
c;
//5.4 错误
 function foo(a,b,a){}//没问题
 function foo(a,b,a){//错误
     "user strict";
 }
(function (){
    "use strict";

    var a = {
        b : 42,
        b : 43
    };//错误
})();
//提前使用变量
{
    a = 2;
    let a ;//ReferenceError
}
{
    typeof a;//undefined
    typeof b;//ReferenceError!
    let b;
}
//5.5函数参数
function foo(a = 42, b = a + 1){
    console.log(a,b);
}
foo();// 42 43
foo(undefined);//42 43
foo(5);// 5 6
foo(void 0 ,7);
foo(null);

function foo(a = 42 , b = a +1){
    console.log(
        arguments.length,a,b,
        arguments[0],arguments[1]
    );
}
foo(); //0 42 43 undefined undefined
foo(10);//1 10 11 10 undefined
foo(10 , undefined); //2 10 111 10 undefined
foo(10 ,null);//2 10 null 10 null

function foo(a) {
    "use strict";
    a = 42;
    console.log(arguments[0]);
}
foo(2);//2
foo();//undefined (not linked)

//?不要同时访问命名参数和其对应的arguments数组单元
function foo(a){
    console.log(a + arguments[1]);//安全
}
foo(10,32);//42

//5.6 try..finally
function foo(){
    try{
        return 42;
    }
    finally{
        console.log("hello");
    }
    console.log("never run");
}
console.log(foo());
//hello
//42

function foo(){
    try {
        throw 42;
    }
    finally{
        console.log("hello");
    }
    console.log("never runs");
}
console.log(foo());
//hello;
//uncaught Exception :42

function foo(){
    try {
        return 42;
    }
    finally{
        throw "Oops!";
    }
    console.log("never runs");
}
console.log(foo());//uncaught Exception :Oops!

for(var i = 0; i<10;i++){
    try{
        continue;
    }
    finally{
        console.log(i);
    }
}

function foo(){
    try{
        return 42;
    }
    finally{
        //没有返回语句，所以没有覆盖
    }
}
function bar(){
    try{
        return 42;
    }
    finally{
        return;
    }
}
function baz(){
    try{
        return 42;
    }
    finally{
        return "hello";
    }
}
foo();//42
bar();//undefined
baz();//hello

//finally 与break混合使用
function foo(){
    bar: {
        try {
            return 42;
        }
        finally {
            break bar;
        }
    }
    console.log("Crazy");
    return "hello";
}
console.log(foo());
//Crazy
//hello

//switch
var a = "42";
switch(true){
    case a == 10:
            console.log("10 or '10'");
            break;
    case a == 42:
           console.log("42 or '42'");
           break;
}
//42 or '42'

var a = "hello world";
var b = 10;
switch(true){
    case(a || b == 10):
            break;
    default:
            console.log("Oops");
}
//Oops

var a = 10;
switch(a){
    case 1:
    case 2:
    default :
            console.log("default");
    case 3:
            console.log("3");
    case 4: 
            console.log("4");
}
//default
//3











































