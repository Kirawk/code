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

