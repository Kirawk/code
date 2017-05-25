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