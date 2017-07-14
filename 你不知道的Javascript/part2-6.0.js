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