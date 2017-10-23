/***
@ 原生函数
***/
var s = new String("Hello World!");
console.log(s.toString());//Hello World!
typeof s;//object
s instanceof String //true
/**
@ 3.1 [[Class]] 
**/
Object.prototype.toString.call(s);//[object String]
Object.prototype.toString.call([1,2,3]);//[object Array]
Object.prototype.toString.call(null);//[object Null]
Object.prototype.toString.call(undefined);//[object Undefined]
Object.prototype.toString.call("abc");//[object String]
Object.prototype.toString.call(42);//[object Number]
Object.prototype.toString.call(true);//[object Boolean]

/**
@ 3.2 封装对象包装 
**/
var a = new Boolean(false);
if(!a){
    console.log("O0ps");
}

var a = "abc";
var b = new String(a);
var c = new Object(a);

typeof a;//string
typeof b;//object
typeof c;//object

b instanceof String;//true
c instanceof String;//true

Object.prototype.toString.call(b);//[object String]
Object.prototype.toString.call(c);//[object String]

/**
@ 3.3 拆封 
**/
var a = new String("abc");
var b = new Number(42);
var c = new Boolean(true);

a.valueOf();//"abc"
b.valueOf();//42
c.valueOf();//true

/**
@ 3.4 原生函数作为构造函数 
**/
var a = new Array(1,2,3);
a;//[1, 2, 3]
var b =[1,2,3];
b;//[1, 2, 3]

var a = new Array(3);
a.length;
a;// [undefined × 3]

var a = new Array(3);
var b = [undefined,undefined,undefined];
var c = [];
c.length = 3;
a;//[undefined × 3]
b;//[undefined, undefined, undefined]
c;// [undefined × 3]

a.join("-");//"--"
b.join("-");//"--"

a.map(function(v,i){return i;});//[undefined × 3]
b.map(function(v,i){return i;});//[0, 1, 2]

function fakeJoin(arr,connector){
    var str = "";
    for(var i =0;i<arr.length;i++){
        if(i>0){
            str += connector;
        }
        if(arr[i]!==undefined){
            str +=arr[i];
        }
    }
    return str;
}

var a = new Array(3);
fakeJoin(a,"-");//"--"

var a = Array.apply(null,{ length:3 });
a;//[undefined, undefined, undefined]

var  c = new Object();
c.foo = "bar";
c;//{foo: "bar"}

var d = {foo:"bar"};
d;//{foo: "bar"}
var e = new Function("a","return a*2;");
var f = function(a) { return a * 2; }
function g(a) { return a * 2; }
var h = new RegExp( "^a*b+", "g" );

var name = "Kyle";
var namePattern = new RegExp("\\b(?:" + name +")+\\b","ig");
//var matches = someText.match(namePattern);