/*
*调用位置
*/
function baz(){
	//当前调用栈是：baz；

	console.log("baz");
	bar();//bar调用的位置
}
function bar(){
	//当前调用栈是：baz->bar
	console.log("bar");
	foo();
}

function foo(){
	//当前调用栈是：baz->bar->foo
	console.log("foo");

}
baz();//baz调用的位置

/*默认绑定*/
function foo(){
	console.log(this.a);
}
var a=2;
foo();//2
//使用严格模式，默认不会绑定到全局对象上
functio foo(){
	"user strict";
	console.log(this.a);
}
var a=2;
foo();//TypeEror:this is undefined