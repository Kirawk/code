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

/*隐士绑定*/
function foo(){
	console.log(this.a);
}
var obj={
	a:2;
	foo:foo;
}

obj.foo();//2
//隐式丢失
function foo(){
	console.log(this.a);
}
var obj2={
	a:42;
	foo:foo;
}
var obj1={
	a:2;
	obj2:obj2;
}
obj1.obj2.foo();//42

function foo(){
	console.log(this.a);
}

var obj={
	a:2,
	foo:foo
};

var bar=obj.foo;
var a="global";
bar();//global

//回调丢失
function foo(){
    console.log(this.a);
}

function doFoo(fn){
    var a=3;
    fn();
}

var obj={
    a:2,
    foo:foo
}
var a="global oops";
obj.foo();//2
doFoo(obj.foo);//为什么不是3,而是global oops
setTimeout(obj.foo,3000);//global oops

/*显示绑定*/
function foo(){
	console.log(this.a);
}
var obj={
	a:2
}
foo.call(obj);//2

/*硬绑定-解决丢失绑定问题*/
function foo(){
	console.log(this.a);
}
var obj={
	a:2
}
var bar=function(){
	foo.call(obj);
}
bar();//2
setTimeout(bar, 100);//2
bar.call(window)//2

/*硬绑定应用场景*/
function foo(something){
	console.log(this.a,something);
	return this.a+something;
}

var obj={
	a:2
};
var bar=function(){
	return foo.apply(obj,arguments);
}
var b=bar(3);
console.log(b);

/*辅助绑定函数bind*/
function foo(something){
	console.log(this.a,something);
	return this.a+something;

}
function bind(fn,obj){
	return function(){
     return fn.apply(obj,something);
	};
}
var obj={
	a:2
};
var bar=bind(foo,obj);
var b=bar(3);
console.log(b);

/*es5提供了内置方法Function.prototype.bind*/
function foo(something){
	console.log(this.a,something);
	return this.a+something;
}
var obj={
	a:2
}
var bar=foo.bind(obj);
var b=bar(3);
console.log(b);

/*api调用上下文*/
function foo(el){
	console.log(el,this.id);
}

var obj={
	id:"awesome"
};
[1,2,3].forEach(foo,obj);

/*new 绑定*/

function foo(a){
	this.a=a;
}
var bar=new foo(2);
cossole.log(bar.a);//2

/*优先级*/
function foo(){
	console.log(this.a);
}
var obj1{
	a:2
	foo:foo
};
var obj2{
	a:3
	foo:foo
};
obj1.foo();//2
obj2.foo();//3

obj1.foo.call(obj2);//3
obj2.foo.call(obj1);//2





