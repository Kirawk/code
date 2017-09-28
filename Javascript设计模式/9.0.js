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