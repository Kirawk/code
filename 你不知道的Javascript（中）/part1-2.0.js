/*值-内置的值类型*/
/**
@ 2.1 数组
**/
var a =[1,"2",[3]];
a.length;//3
a[0] === 1;//true
a[2][0] === 3//true

var a = [];
a.length;//0
a[0]=1;
a[1]="2";
a[2]=[3];
a.length;//3

/*稀疏数组
*/
var a = [];
a[0] = 1;
a[2] = 3;
a[1];//undefined
a.length;//3

var a= [];
a[0] = 1;
a["foobar"] = 2;
a.length;//1
a.foobar;//2

/*类数组 
*/function foo(){
    var arr = Array.prototype.slice.call(arguments);
    arr.push("bam");
    console.log(arr);
}
foo("bar","baz");// ["bar", "baz", "bam"]


/**
@ 2.2字符串
*/
var a = "foo";
var b = ["f","o","o"];
a.length;//3
b.length;//3
a.indexOf("o");//1;
b.indexOf("o");//1

var c = a.concat("bar");
var d = b.concat(["b","a","r"]);

a === c;//false
b === d;//false

a[1] = "0";
b[1] ="0";
a;//foo
b;//["f", "0", "o"]

c = a.toUpperCase();
a === c;//false
a;//foo
c;//FOO

b.push("!");
b;// ["f", "0", "o", "!"]

a.join;//undefined
a.map;//undefined

var c = Array.prototype.join.call(a,"-");
 var d = Array.prototype.map.call(a,function(v){
    return v.toUpperCase()+".";
 }).join("");
c;//f-o-o
d;//F.O.O.

a.reverse;//undefined
b.reverse();//["!", "o", "0", "f"]

var c =a.split("").reverse().join("");
c; //oof

/**
@ 2.3 数字
**/
var a = 5E10;
a;//50000000000
var b = a.toExponential();
b;//"5e+10"

var c = a*a;
c;//2.5e+21;

var d = 1/a;
d;//2e-11

var a= 42.58;
a.toFixed(0);//"43"
var s=a.toFixed(1);//"42.6"
typeof s;//string
a.toFixed(2);"42.58"
a.toFixed(3);"42.580"
a.toFixed(4);"42.5800"

var a = 42.59
a.toPrecision(1);//"4e+1";
a.toPrecision(2);//"43"
a.toPrecision(3);//"42.6"
a.toPrecision(5);//"42.590"

42.toFixed(3);//Uncaught SyntaxError: Invalid or unexpected token
(42).toFixed(3);//42.000
0.42.toFixed(3);//"0.420"
42..toFixed(3);//"42.000"
(42).toFixed(3);//42.000
0.42.toFixed(3);//"0.420"
42..toFixed(3);//"42.000"
42 .toFixed(3);//42.000"

0.1+0.2 === 0.3;//false

if(!Number.EPSILON){
    Number.EPSILON = Math.pow(2,-52);
}

function numbersCloseEnoughToEqual(n1,n2){
    return Math.abs(n1-n2) < Number.EPSILON;
}

var a = 0.1+0.2;
var b = 0.3;
numbersCloseEnoughToEqual(a,b);//true
numbersCloseEnoughToEqual( 0.0000001, 0.0000002 ); //false

//判断是否为整数
Number.isInteger(42);//true
Number.isInteger(42.00);//true
Number.isInteger(42.01);//false

if(!Number.isInteger){
    Number.isInteger = function(num){
        return typeof num == "number" && num % 1 ==0;
    };
}

//判断安全整数
Number.isSafeInteger(Number.MAX_SAFE_INTEGER);//true
Number.isSafeInteger(Math.pow(2,53));//false
Number.isSafeInteger(Math.pow(2,53)-1);

if(!Number.isSafeInteger){
    Number.isSafeInteger = function(num){
        return Number.isInteger(num) && Math.abs(num)<=Number.MAX_SAFE_INTEGER;
    };
}

/**
@ 2.4 特殊数值
**/
//非严格模式下给undefined 赋值
function foo(){
    undefined = 2;
}
foo();

function foo(){
    "use strict";
    undefined = 2;
}
foo();//TypeError

function foo(){
    "use strict";
    var undefined =2;
    console.log(undefined);//2
}
foo();

var a =42;
console.log(void a,a);//undefined 42

function domeSomething(){
    if(!APP.ready){
        //稍后再试
        return void setTimeout(domeSomething,100);
    }
    var result;   
   return result;
}

if(domeSomething()){
    //立即执行下一个任务
}

if(!App.ready){
    setTimeout(domeSomething,100);
    return;
}


//特殊数字
var a = 2 /"foo";
typeof a == "number";//true

a===NaN;//false
a == NaN;//false

isNaN(a);//true

var a = 2/"foo";
var b ="foo";
a;NaN
b;"foo"

window.isNaN(a);//true
window.isNaN(b);//true

if(!Number.isNaN){
    Number.isNaN = function(n){
        return (typeof n==="number"&& window.isNaN(n));
    };
}
Number.isNaN(a);//true
Number.isNaN(b);//false
if(!Number.isNaN){
    Number.isNaN = function(n){
        return n!==n;
    };
}

//无穷数
var a = 1 / 0;
a;//Infinity
var b = -1 / 0;
b;//-Infinity
var a = Number.MAX_VALUE;
a + a;//Infinity
a + Math.pow(2,970);//Infinity
a + Math.pow(2,969);//1.7976931348623157e+308

var a = 0 / -3;//-0 
var b = 0 * -3;//-0

var c = 0;
var d = 0 / -3;
a == b;//true

function isNegZero(n){
    n = Number(n);
    return (n===0) && (1/n === -Infinity);
}
isNegZero(-0);//true
isNegZero(0 / -3);//true
isNegZero(0);//false

//特殊等式
var a = 2 / "foo";
var b = -3*0;

Object.is(a,NaN);//true
Object.is(b,-0);//true
Object.is(b,0);//false

if(!Object.is){
    Object.is = function(v1,v2){
        if(v1===0 && v2===0){
            return 1 /v1 === 1 / v2;
        }
        //判断是否NaN
        if(v1 !== v1){
            return v2 !== v2;
        }
        return v1 === v2;
    };
}


//特殊等式
var a = 2 / "foo";
var b = -3*0;

Object.is(a,NaN);//true
Object.is(b,-0);//true
Object.is(b,0);//false

if(!Object.is){
    Object.is = function(v1,v2){
        if(v1===0 && v2===0){
            return 1 /v1 === 1 / v2;
        }
        //判断是否NaN
        if(v1 !== v1){
            return v2 !== v2;
        }
        return v1 === v2;
    };
}

/**
@ 值和引用
**/
var a = 2;
var b = a;
b++;
a;//2
b;//3
var c = [1,2,3];
var d =c;
d.push(4);
c;//[1,2,3,4]
d;//[1,2,3,4]

var a = [1,2,3];
var b = a;
a;//[1,2,3]
b;//[1,2,3]

b = [4,5,6];
a;//[1,2,3]
b;//[4,5,6];

function foo(x){
    x.push(4);
    x;//[1,2,3,4]
    x = [4,5,6];
    x.push(7);
    x;//[4,5,6,7]
}
var a = [1,2,3];

foo(a);
a;//[1,2,3,4]不是[4,5,6,7]

function foo(x){
    x.push(4);
    x;//[1,2,3,4]

    //然后
    x.length = 0;
    x.push(4,5,6,7);
    x;//[4,5,6,7];
}
var a = [1,2,3];
foo(a);
a;//[4,5,6,7]

function foo(wrapper){
    wrapper.a = 42;
}
var obj = {
    a:2
};
foo(obj);
obj.a;//42

function foo(x){
    x = x + 1;
    x;
}
var a = 2;
var b = new Number(a);
foo(b);
console.log(b);


