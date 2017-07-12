/*原型链*/
var anotherObject = {
	a:2
};
var myObejct=Object.create(anotherObject);

for(var k in myObejct) {
	console.log("found:"+k);
}

/*属性设置与屏蔽*/
var anotherObject={
	a:2
};
var myObejct=Object.create(anotherObject);

anotherObject.a;//2
myObejct.a;//2
anotherObject.hasOwnProperty("a");//true
myObejct.hasOwnProperty("a");//true
myObejct.a++;//隐式屏蔽；
myObejct.a;//3
anotherObject.a;//2

/*构造函数还是调用*/
function NothingSpecial(){
	console.log("Don't mind me");
}
var a = new NothingSpecial();
console.log(a);

/*伪类*/
function Foo(name){
	this.name=name;
}
Foo.prototype.myName = function() {
	return this.name;
};
var a = new Foo("a");
var b = new Foo("b");
a.myName();
b.myName();  //b

/*原型继承*/
function Foo(name){
	this.name=name;
}
Foo.prototype.myName = function () {
	return this.name;
};
function Bar (name,label) {
	Foo.call(this,name);
	this.label = label;
}
Bar.prototype = Object.create(Foo.prototype);
Bar.prototype.myLabel = function () {
	return this.label;
};
var a =new Bar("a","obj a");
a.myName();//a
a.myLabel();//obj a

/*_proto_的实现*/
Object.defineProperty(Object.prototype,"_proto_",{
	get: function(){
		return Object.getPrototypeOf(this);
	},
	set: function(o){
		Object.setPrototypeOf(this,o);
		return o;
	}
});

/*对象关联*/
var foo={
	something: function(){

		console.log("tell me something good");
	}
};
var bar = Object.create(foo);
bar.something();

var anotherObject = {
	a:2
};

var myObejct = Object.create(anotherObject,{
	b:{
		enumerable:false,
		writable: true,
		configurable:false,
		value:3
	},
	c:{
		enumerable:false,
		writable: true,
		configurable:false,
		value: 4
	}
});
myObejct.hasOwnProperty("a");//false
myObejct.hasOwnProperty("b");//true
myObejct.hasOwnProperty("c");//true

myObejct.a;//2;
myObejct.b;//3
myObejct.c;//4

/*自定义Object.create函数*/
function createAndLinkObject(o){

	function F(){}
	F.prototype = o;
	return new F();
}

var anotherObject = {
	a:2
};
var myObejct=cerateAndLinkObejct(anotherObject);
myObejct.a;//2

/*委托设计模式*/
var anotherObject={
	cool:function(){
		console.log("cool");
	}
};
var myObejct = Object.create(anotherObject);
myObejct.doCool =function (){
	this.cool();
};

myObejct.doCool();//"cool"

