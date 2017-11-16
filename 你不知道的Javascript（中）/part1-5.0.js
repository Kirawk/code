/* 语法
*@  5.1 语句和表达式
*/
 var b;
 if(true){
 	b = 4 +38;
 }

  var a,b;
 a = if(true){
     b = 4 + 38;
 };

 //do表达式
 var a ,b;
 a = do{
 	if(true){
 		b = 4 + 38;
 	}
 };
 a;//42

 //表达式副作用
 var a = 2;
 var b = a+3;

 function foo(){
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

function vowls(str){
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
function vowls (str) {
	var matches;

	if (str &&(matches = str.match(/[aeiou]/g))) {
		return match;
	}
}
vowls("Hello world!");

／*5.1.3上下问规则*／
/*上下文规则*/
var a = {
    foo:bar()
};


foo:for(var i=0; i<4; i++){
    for(var j=0;j<4;j++){
        //如果j和i相等，继续外层的循环
        if(j==i){
            continue foo;
        }
        //跳过奇数结果
        if((j*i)%2 == 1){
            continue;
        }

        console.log(i,j);
    }
}
//1 0
//2 0
//2 1
//3 0
//3 2

function foo(){
    bar:{
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
[]+{};//[object Object]
{}+[];//0

//对象解构
function getData(){
    //
    return {
        a:42,
        b:"foo"
    };
}
var {a,b} = getData();
console.log(a,b);//42 "foo";
//类似下面的代码
var res = getData();
var a = res.a;
var b = res.b;

function foo({a,b,c}){
    console.log(a,b,c);
}
foo({
    c:[1,2,3],
    a:42,
    b:"foo"
});

//else if(javascript 没有if else if else)

if(a){
    //
}else if(b){
//
}else{
  //  
}　
//本质
if(a)dosomenthing(a);
if(a){
    //
}else{
    if(b){
        //..
    }else{
        //..
    }
}

/**
*@ 5.2 运算符优先级
**／




































