/*
*附录内容
*/
//动态作用域
function foo(){
	console.log(a);
}
function bar(){
	var a=3;
	foo();
}
var a=2;
bar();//2