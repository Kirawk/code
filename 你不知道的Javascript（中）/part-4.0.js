/***
@ 强制类型转换
***/
/***
@ 4.1值类型转换
***/
var a = 42;
var b = a + "";//隐式强制类型转换
var c = String(a);//显示强制类型转换

var a = [1,2,3];//数组的默认 toString() 方法经过了重新定义，将所有单元字符串化以后再用 "," 连接起来
a.toString();//"1,2,3"

//JSON字符串化
JSON.stringify(42);//"42";
JSON.stringify("42");//""42""
JSON.stringify(null);//null
JSON.stringify(true);//true

JSON.stringify(undefined);//undefined
JSON.stringify(function(){});//undefined
JSON.stringify([1,undefined,function(){},4]);//[1,null,null,4]
JSON.stringify({a:2,b:function(){}});//"{"a":2}"

var o = {};
var a ={
    b:42,
    c:o,
    d:function(){}
};
o.e = a;
//JSON.stringify(a);//Uncaught TypeError: Converting circular structure to JSON
a.toJSON = function(){
    return {b: this.b};
};
JSON.stringify(a);//"{"b":42}"

var a = {
    val :[1,2,3],
    toJSON : function(){
        return this.val.slice(1);
    }
};

var b = {
    val: [1,2,3],
    toJSON: function(){
        return "["+this.val.slice(1).join()+"]";
    }
};
JSON.stringify(a);//"[2,3]"
JSON.stringify(b);//""[2,3]""

var a ={
    b:42,
    c:"42",
    d: [1,2,3]
};
JSON.stringify(a,["b","c"]);//{"b":42,"c":"42"}
JSON.stringify(a,function(k,v){
    if(k!=="c") return v;
});//"{"b":42,"d":[1,2,3]}"

//ToNumber
var a = {
    valueOf: function(){
        return "42";
    }
};
var b = {
    toString: function(){
        return "42";
    }
};
var c = [4,2];
c.toString = function(){
    return this.join("");//"42"
};
Number(a);//42
Number(b);//42
Number(c);//42

// TooBoolean
var a = new Boolean(false);
var b = new Number(0);
var c = new String("");
var d = Boolean(a && b && c);
d;//true

var a = [];
var b = {};
var c = function(){};
var d = Boolean(a && b && c);
d;//true

/**
@ 4.3 显示强制类型转换
**/
var a = 42;
var b =String(a);

var c = "3.14";
var d = Number(c);
b;//"42"
d;//3.14

var a = 42;
var b = a.toString();

var c ="3.14";
var d = -c;
b;//"42"
d;//-3.14
var e = - -c;
e;//3.14

var f = 1 + - + + + - + 1;
f;//2

var timestamp = +new Date();
timestamp;//1509116017614
var timestamp2= Date.now();
timestamp2;//1509116093105

if(!Date.now){
    Date.now = function(){
        return +new Date();
    };
}

//奇特的~运算符 
0 | -0;//0
0 | NaN;//0
0 | Infinity;//0
0 | -Infinity;//0

var a ="hello world!";
if(a.indexOf("lo") >= 0){
    console.log(a.indexOf("lo"));//3
}
var a = "hello world!";
~a.indexOf("lo");//-4
~a.indexOf("ol");//0

//字位截除
Math.floor(-49.6);//-50
~~-49.6;//-49

//显示解析数字字符串
var a = "42";
var b = "42px";
Number(a);//42
parseInt(a);//42

Number(b);//NaN
parseInt(b);//42

parseInt(new String("42"));//42
var a ={
    num: 21,
    toString: function(){
        return this.num*2;
    }
};
parseInt(a);//42

parseInt(1/0,19);//18
parseInt(0.000008);//0
parseInt(0.0000008);//8
parseInt(parseInt,16);//15;
parseInt("0x10");//16
parseInt("103",2);//2

//显示转化为布尔值
var a ="0";
var b = [];
var c = {};
Boolean(a);
Boolean(b);
Boolean(c); 

var a = "0";
var b = [];
var c = {};

var d = "";
var e = 0;
var f = null;

!!a;//true
!!b;//true
!!c;//true

!!d;//false
!!e;//false
!!f;//false

var a = [
    1,
    function(){},
    2,
    function(){}
];
JSON.stringify(a);
JSON.stringify(a,function(key,val){
    if(typeof val === "function"){
        return !!val;
    }else{
        return val;
    }
});//"[1,true,2,true]"

var a = 42;
var b =String(a);

var c = "3.14";
var d = Number(c);
b;//"42"
d;//3.14

var a = 42;
var b = a.toString();

var c ="3.14";
var d = -c;
b;//"42"
d;//3.14

/**
@ 4.4 隐式强制类型转换
**/
//字符串和数字之间的隐式强制类型转换
var a = "42";
var b = "0";

var c = 42;
var d = 0;

a + b;//"420"
c + d;//42

var a = [1,2];
var b = [3,4];
a+b;//"1,23,4"

var a = {
    valueOf: function(){return 42;},
    toString:function(){return 4;}
};
a + "";//"42"
String(a);//"4"

var a = "3.14";
var b = a-0;
b;//3.14

var a = [3];
var b = [1];
a-b;//2

//布尔值到数字的隐式强制类型装换
function onlyOne(a,b,c){
    return !!((a&&!b&&!c)||(!a&&b&&!c)||(!a&&!b&&c));
}
var a = true;
var b= false;

onlyOne(a,b,b);//true
onlyOne(b,a,b);//true
onlyOne(a,b,a);//false

function onlyOne() {
 var sum = 0;
 for (var i=0; i < arguments.length; i++) {
 // 跳过假值，和处理0一样，但是避免了NaN
 if (arguments[i]) {
 sum += arguments[i];
 }
 }
 return sum == 1;
}
var a = true;
var b = false;
onlyOne( b, a ); // true
onlyOne( b, a, b, b, b ); // true
onlyOne( b, b ); // false
onlyOne( b, a, b, b, b, a ); // false

function onlyOne() {
 var sum = 0;
 for (var i=0; i < arguments.length; i++) {
 sum += Number( !!arguments[i] );
 }
 return sum === 1;
}
//隐式强制类型转换为布尔值
var a = 42;
var b = "abc";
var c;
var d = null;
if (a) {
 console.log( "yep" ); // yep
}
while (c) {
  console.log( "nope, never runs" );
}
c = d ? a : b;
c; // "abc"
if ((a && d) || c) {
 console.log( "yep" ); // yep
}

/*4.45 ||和&&**/
var a = 42;
var b = "abc";
var c = null;
a||b;//42
a && b;//"abc"

c||b;//"abc"
c&&b;//null

/*4.45 ||和&&**/
function foo(a,b){
    a = a || "hello";
    b = b || "world";
    console.log( a + " " + b); 
}
foo();//"hello world"
foo("yeah","yeah");//"yeah yeah!"

var a = 42;
var b = null;
var c = "foo";
if(a && (b || c)){
    console.log("yep");
}
if(!!a && (!!b || !!c)){
    console.log("yep");
}
//4.4.6 符号的强制类型转换
var s1 = Symbol("cool");
String(s1);//"Symbol(cool)"

var s2 = Symbol("not cool");
s2 + "";//Uncaught TypeError

/***
* @4.6宽松相等和严格相等
*/
//字符串与数字之间的相等比较
var a = 42;
var b = "42";
a === b;//false
a == b;//true

//其他类型和布尔类型之间的相等比较
var a = "42";
var b = true;
a === b;//false

var a = "42";
var b = false;
a === b;//false

var a = "42";
var b = false;
a === b;//false
if(a == true){//不要这样用，判断条件不成立

}
if(a === true){

}
if(a){//这样显示用法没问题

}
if(!!a){//这样显示用法更好

}
//null与undefined之间的相等比较
var a = null;
var b;
a == b;//true
a == null;//true
b == null; //true
a == false;//false
b == false;//false
a == "";//false
b == "";//false
a == 0;//false
b == 0;//false

var a = doSomething();
if(a==null){
    //...
}
var a = doSomething();
if(a == null||a==undefined){
    //...
}

//对象与非对象之间的相等比较
var a = 42;
var b =[42];
console.log(a==b)//true

var a = 42;
var b =[42];
a == b;//true

var a = "abc";
var b = Object(a);
a === b;//false
a == b;//true

var a = null;
var b = Object(a);
a == b;//false

var a = undefined;
var b = Object(a);
a == b;//false

var a =NaN;
var b =Object(a);
a == b;//false

/*比较少见的情况*/
//返回其他数字
Number.prototype.valueOf = function(){
    return 3;
}
new Number(2) === 3;//true

var i = 2;
Number.prototype.valueOf = function(){
    return i++;
};
var a = new Number(42);
if(a == 2 && a == 3){
    console.log("Yep,this happened.");
}

//假值的相等比较
"0" == null;//fasle
"0" == undefined;//fasle
"0" == false;//true
"0" == NaN;//fasle
"0" == 0;//true
"0" == "";//fasle

false == null;//fasle
false == undefined;//fasle
false == NaN;//fasle
false == 0;//true
false == "";//true
false == [];//true
false == {};//fasle

"" == null;//fasle
"" == undefined;//fasle
"" == NaN;//fasle
"" == 0;//true
"" == [];//true
"" == {};//false

0 == null;//false
0 == undefined;//fasle
0 == NaN;//fasle
0 == [];//true
0 == {};//false


42 == "43";//fasle
"foo" == 42;//fasle
"true" == true;//false
42 == "42";//true
"foo" == ["foo"];//true

//完整性检查
"0" == false;//true
false == 0;//true
false == "";//true
false == [];//true
"" == 0;//true
"" == [];//true
0 == [];//true

"" == 0;//true
"" == [];//true
0 == [];//true

//安全运用隐式强制类型转换


