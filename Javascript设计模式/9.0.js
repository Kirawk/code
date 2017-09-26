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
