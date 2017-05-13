/*
*3.2
*/
function doSomething(a){
	var b=a+doSomethingElse(a*2);
	console.log(b*3);
}
function doSomethingElse(a){
	return a-1
}
var b;
doSomething(2)//15

//改进
function doSomething(a){
	var b;
	b=a+doSomethingElse(a*2)
	function doSomethingElse(a){
		return a-1;
	}
	cosole.log(b*3);
}
doSomething(2);//

//规避冲突
function foo(){

	function bar(a){
		i=3;
		console.log(a+i);
	}

	for(var i=0;i<10;i++){
		bar(i*2);
	}
}
foo();

/*
*同名标识符造成的冲突
*/
function foo(){
	function bar(a){

		i=3;
		console.log(a+i);
	}
    for(var i=0;i<10;i++){
    	bar(i*2);//因为i值被覆盖为3，造成死循环
    }
}
foo();

/*
*3.3
*/
var a=2;
function foo(){
	var a=3;
	console.log(a);//3
}
foo();
console.log(a);//2
//改进
var a=2;
(function foo(){
	var a=3;
	console.log(a);
})();
console.log(a);

/*
*3.3.2立即执行函数IIFE
*/
var a=2;
(function IIFE(){
	var a=3;
	console.log(a);//3
})();
console.log(a);//2

//立即执行函数进阶用法
var a=2;
(function IIFE(global){
	var a=3;
	console.log(a);//3
	console.log(global.a);//2
})(window);
console.log(a);//2

//在UMD项目中广泛使用
var a=2;
(function IIFE(def){
	def(window);
})(function def(global){
	var a=3;
	console.log(a);//3
	console.log(global.a);//2
});

//3.4
for(var i=0;i<10;i++){
	console.log(i);
}

var foo=true;
if(foo){
	var bar=foo*2;
	bar=something(bar);
	console.log(bar);
}
//3.4.3
var foo=true;
if(foo){
	let bar=foo*2;
	bar=something(bar);
	console.log(bar);
}
console.log(bar)//referenceError