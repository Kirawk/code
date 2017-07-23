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
 $(document).ready(function(){
 	var $body = $(document.body);
 	var btn1 = new Button(125,30,"hello");
 	var btn2 = new Button(150,40,"world");

 	btn1.render($body);
 	btn2.render($body);
 });

 /*对象关联委托*/
  var Widget={
  	init: function(width,height){
  		this.width = width || 50;
  		this.height = height || 50;
  		this.$elem = null;
  	},
  	insert: function ($where){
  		if(this.$elem){
  			this.$elem.css({
  				width:this.width + "px",
  				height:this.height + "px"
  			}).appendTo($where);
  		}
  	}
  };

  var Button Object.create(Widget);
  Button.setup = function(width,height,label){
  	//委托调用
  	this.init(width,height);
  	this.label = label || "Default";

  	this.$elem =$("<button>").text(this.label);
  };
  Button.build = function ($where) {
  	//委托调用
  	 this.insert($where);
  	 this.$elem.click(this.onClick.bind(this));
  };
  Button.onClick = function (evt) {
  	console.log("button"+this.label+"clicked!");
  };
  $(document).ready(function(){
  	var $body = $(document.body);
  	var btn1 = Object.create(Button);
  	btn1.setup(125,30,"hello");

  	var btn2 =Object.create(Button);
  	btn2.setup(150,40,"world");

  	btn1.build($body);
  	btn2.build($body);
  })

  /*登录的场景设计*/
  /*类模式*/
  function Controller(){
  	this.errors = [];
  }

  Controller.prototype.showDialog = function (title,msg) {
  	//显示标题与信息
  }

  Controller.prototype.success = function (msg){
  	this.showDialog("Success",msg);
  }

  Controller.prototype.failure = function (err) {
  	this.errors.push(err);
  	this.showDialog("Error",err);
  }

  //子类
  function LoginController(){
  	Controller.call(this);
  }

  //把子类关联到父类

  LoginController.prototype = Object.create(Controller.prototype);
  LoginController.prototype.getUser = function () {
  	return document.getElementById("login_username").value;
  };
  LoginController.prototype.getPassword= function () {
  	return document.getElementById("login_password").value;
  };
  LoginController.prototype.validateEntry = function (user,pw) {
  	user = user || this.getUser();
  	pw = pw || this.getPassword();

  	if(!(user&& pw)){
  		return this.failure(
  			"please enter a username and password "
  			);
  	}
  	else if( pw.length < 5) {
  		return this.failure(
  			"password must be 5+ characters!"
  			);
  	}

  	return true;
  };

  //重写基础的failure();
  LoginController.prototype.failure = function (err) {
  	//super调用
  	Controller.prototype.failure.call(this,"login invalid"+err);
  };

  //子类
  function AuthController(login) {
  	Controller.call(this);
  	this.login = login;
  }
  //把子类关联到父类
  AuthController.prototype = Object.create(Controller.prototype);
  AuthController.prototype.server = function (url,data) {
  	return $.ajax({
  		url: url,
  		data: data
  	});
  };

  AuthController.prototype.checkAuth = function () {
  	var user = this.login.getUser();
  	var pw = this.login.getPassword();

  	if (this.login.validateEntry(user,pw)){
  		this.server("/check-auth",{
  			user: user,
  			pw : pw
  		})
  		.then( this.success.bind(this))
  		.fail( this.failure.bind(this));

  	}
  };

  //重写基础success()
  AuthController.prototype.success = function () {
  	//super调用
  	Controller.prototype.success.call(this,"Authenitcated!");
  }

  //重写基础的failure()
  AuthController.prototype.failure = function (err){
  	//super调用
  	Controller.prototype.failure.call(this,"Auth Failed:"+err);
  };

  var auth = new AuthController(new LoginController());;
  auth.checkAuth();

  //使用对象关联实现上述代码
   var LoginController = {
   	errors: [],
   	getUser: function (){
   		return document.getElementById("login_username").value;
   	},
   	getPassword: function () {
   		return document.getElementById("login_password").value;
   	},
   	validateEntry: function (user,pw) {
   		user = user || this.getUser();
   		pw =pw||this.getPassword();
   		if(!(user&&pw)){
   			return this.failure("please enter a name and password");
   		}else if(pw.length<5){
   			return this.failure("password must be 5+ characters!");
   		}
   		return true;
   	},
   	showDialog: function(title,msg){
   		//提示语
   	},
   	failure: function (err){
   		this.errors.push(err);
   		this.showDialog("Error","login invalid"+err);
   	}
   };

   //让AuthController委托LoginController
   var AuthController = Object.create(LoginController);

   AuthController.errors = [];
   AuthController.checkAuth = function () {
   	var user = this.getUser();
   	var pw = this.getPassword();

   	if(this.validateEntry(user,pw)){
   		this.server("/check-auth",{
   			user: user,
   			pw: pw
   		})
   		.then(this.accepted.bind(this));
   		.fail(this.rejected.bind(this));
   	}
   };
   AuthController.server = function (url,data) {
   	return $ajax({
   		url:url,
   		data:data
   	});
   };
   AuthController.accepted = function () {
   	this.showDialog("Success","Authenitcated");
   };
   AuthController.rejected = function (err) {
   	this.failure("Auth Failed"+ err);
   };
   AuthController.checkAuth();



