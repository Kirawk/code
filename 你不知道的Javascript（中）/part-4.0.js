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
