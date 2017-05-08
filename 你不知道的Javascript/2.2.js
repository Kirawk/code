/*2.2.1
* 欺骗词法
*/
function foo(str,a){
	eval(str);
	console.log(a,b);//1,3
}
var b=2;
foo("var b=3",1);

/*
*使用严格模式
*/
function foo(str){
	"use strict";
	eval(str);
	console.log(str);//a is not defined 
}
foo("var a=2");