/*命令模式*/
var setCommand = function(button,command){
	button.onclick = function(){
		command.execute();
	}
};
var MenuBar = {
	refresh:function(){
		console.log("刷新菜单目录");
	}
};

var SubMenu = {
	add: function(){
		console.log('增加子菜单');
	},
	del: function(){
		console.log("删除子菜单");
	}
};
/*将行为封装在命令类中*/
var RefreshMenuBarCommand = function(receiver){
	this.receiver=receiver;
};
RefreshMenuBarCommand.prototype.execute=function(){
	this.receiver.refresh();
};
var AddSubMenuCommend = function(){
	this.receiver=receiver;
};
AddSubMenuCommend.prototype.execute=function(){
	this.receiver.refresh();
};
var DelSubMenuCommand = function(receiver){
	this.receiver=receiver;
};

DelSubMenuCommand.prototype.execute =function(){
	console.log("删除子菜单");
};
//将命令传接受者传到command对象中,并将command安装到button上
var refreshMenuBarCommand =new RefreshMenuBarCommand(MenuBar);
var addSubMenuCommand = new DelSubMenuCommand(SubMenu);
var delSubMenuCommand = new DelSubMenuCommand(SubMenu);

setCommand(button1,refreshMenuBarCommand);
setCommand(button2,addSubMenuCommand);
setCommand(button2,delSubMenuCommand);

/*不引入模式*/
var bindClick = function(button,func){
	button.onclick = func;
};
var MenuBar = {
	refresh: function(){
		console.log("刷新菜单页面");
	}
};

var SubMenu = {
	add:function(){
		console.log("增加子菜单");
	},
	del:function(){
		console.log("删除子菜单");
	}
};
bindClick(button1,MenuBar.refresh);
bindClick(button2,SubMenu.add);
bindClick(button3,SubMenu.del);

/*用闭包实现的命令模式*/
var setCommand = function(button,func){
	button.onclick = function(){
		func();
	}
};

var MenuBar ={
	refresh:function(){
		console.log("刷新菜单界面");
	}
};

var RefreshMenuBarCommand = function(receiver){
	return function(){
		receiver.refresh();
	}
};

var refreshMenuBarCommand = RefreshMenuBarCommand(MenuBar);
setCommand(button1,refreshMenuBarCommand);


/*将执行函数改为调用execute*/
var RefreshMenuBarCommand = function(receiver){
	return{
		execute:function(){
			receiver.refresh();
		}
	}
};

var setCommand = function(button,command){
	button.onclick = function(){
		command.execute();
	}
};

var refreshMenuBarCommand = new RefreshMenuBarCommand(MenuBar);
setCommand(button1,refreshMenuBarCommand);

/*撤销命令*/
var ball = document.getElementById("ball");
var pos = document.getElementById('pos');
var moveBtn = document.getElementById('moveBtn');
moveBtn.onclick = function(){
	var animate = new Animate(ball);
	animate.start('left',pos.value,1000,'strongEaseOut');
};
/*将上述代码改为命令模式*/
var ball = document.getElementById("ball");
var pos = document.getElementById('pos');
var moveBtn = document.getElementById('moveBtn');
var MoveCommand = function(receiver,pos){
	this.receiver=receiver;
	this.pos=pos;
};
MoveCommand.prototype.execute = function(){
	this.receiver.start('left',this.pos,1000,"strongEaseOut");
};
var moveCommand;
moveBtn.onclick= function(){
	var animate = new Animate(ball);
	moveCommand = new MoveCommand(animate,pos.value);
	moveCommand.execute();
};

/*撤销命令*/
var ball = document.getElementById("ball");
var pos = document.getElementById('pos');
var moveBtn = document.getElementById('moveBtn');
var cancleBtn = document.getElementById('cancleBtn');

var MoveCommand = function(receiver,pos){
	this.receiver = receiver;
	this.pos = pos;
	this.oldPos = null;
};

MoveCommand.prototye.execute = function(){
	this.receiver.start('left',this.pos,1000,'strongEaseOut');
	this.oldPos = this.receiver.dom.getBoundingClientRect()[this.receiver.propertyName];
};

MoveCommand.prototye.uundo = function(){
	this.receiver.start('left',this.oldPos,1000,'strongEaseOut');
};

var moveCommand;
moveBtn.onClick = function(){
	var animate = new Animate(ball);
	moveCommand = new MoveCommand(animate,pos.value);
	moveCommand.execute();
};
cancelBtn.onclick = function(){
	moveCommand.undo();
};