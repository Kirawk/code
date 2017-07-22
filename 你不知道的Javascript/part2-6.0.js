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
//子类
function Button(width,height,label) {
	//调用super
	Widget.call(this,width,height);
	this.label = label || "default";
	this.$elem = $("<button>").text(this.label);
}

Button.prototype =Object.create(Widget.prototype);
//重写render()
Button.prototype.render = function ($where) {

	//super调用
	Widget.prototype.render.call(this,$where);
	this.$elem.click(this.onClick.bind(this));
};
BUtton.prototype.onClick = function (evt){
	console.log("Button"+this.label+"clicked");
}
$(document).ready(function(){
	var $body = $(document.body);
	var btn1 = new Button(125,30,"hello");
	var btn2 = new Button(150,40,"world");
	btn1.render($body);
	btn2.render($body);
});

//es6语法糖
class  Widget{
	constructor(width,height){
		this.width = width || 50;
		this.height = height || 50;
		this.$elem = null;
	}
	render($where){
		if(this.$elem){
			this.$elem.css({
				width:this.width+"px";
				height:this.height+"px";
			}).appendTo($where);
		}
	}
}
 class Button extends Widget{
 	constructor(width,height,label){
 		super(width,height);
 		this.lable = label || "Default";
 		this.$elem = $("<button>").text)(this.label);
 	}
 	render($where){
 		super.render($where);
 		this.$elem.click(this.onClick.bind(this));
 	}
 	onClick(evt){
 		console.log("Button"+this.label+"clicked!");
 	}
 }