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


