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

