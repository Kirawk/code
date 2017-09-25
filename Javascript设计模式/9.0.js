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
