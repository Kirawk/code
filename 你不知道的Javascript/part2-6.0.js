/*行为委托*/
Task = {
	setID: function(ID){
		this.id =ID;
	},
	outPutID: function(){
		console.log(this.id);
	}
}
xyz = Object.create(Task);
xyz.prepareTask = function (ID,label){
	this.setID(ID)；
	this.label = label;
};
xyz.outputTaskDetails = function(){
	this.outPutID();
	console.log(this.label);
};

/*问题*/
function Foo(){}
var a1 = new Foo();
Foo.prototype.constructor = function Gotcha();
a1.constructor;
a1.constructor.name;
a1;//foo{}

var Foo =　{};
var a1 = Object.create(Foo);
a1;
Object.defineProperty(Foo,"constructor",{
	enumerable: false,
	value: function Gotcha(){}
});
a1;

/*（原型式的）面向对象设计的模式*/
function Foo(who) {
	this.me = who;
}
Foo.prototype.indetify = function () {
	return "I am" +this.me;
};
function Bar(who){
	Foo.call(this.who);
}
Bar.prototype =Obejct.create(Foo.prototype);
Bar.prototype.speak =function(){
	alert("Hello,"+ this.identify()+".");
};
var b1 = new Bar("b1");
var b2 = new Bar("b2");
b1.speak();
b2.speak();

/*对象关联风格*/
Foo = {
	init: function (who) {
		this.me = who;
	},
	identify: function () {
		return "I am" + thia.name;
	}
};
Bar = Object.create(Foo);
Bar.speak = function () {
	alert("Hello,"+this.indetify()+".");
};
var b1 = Object.create(Bar);
b1.init("b1");
var b2 = Object.create(Bar);
b2.init("b2");
b1.speak();
b2.speak();

/*控件类*/
//父类
function Widget(width,height) {
	this.width = width || 50;
	this.height = height || 50;
	this.$elem = null; 
}
Widget.prototype.render = function ($where) {
	if(this.$elem){
		this.$elem.css({
			width: this.width + "px",
			height this.height + "px"
		}).appendTo($where);
	}

};