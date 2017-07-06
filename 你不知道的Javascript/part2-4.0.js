/*显示混入*/
function mixin(sourceObj,targetObj){
	for(var key in sourceObj){
		if(!(key in targetObj)){
			targetObj[key]=sourceObj[key];
		}
	}
	return targetObj;
}
var Vehicle = {
	engines: 1,

	ignition: function (){
		console.log("Turning on my engine");
	},

    drive: function() {
    	this.ignition();
    	console.log("Steering and moving forward");
    }
};

var Car=mixin(Vehicle,{
	wheels:4,
	drive: function(){
		Vehicle.drive.call(this);
		console.log("Rolling on all"+this.wheels+"wheels!");
	}
});
console.log(Car);

/*混合式复制*/
var Car2=mixin(Vehicle,{});
mixin({
	wheels:4,
	drive: function(){
		Vehicle.drive.call(this);
		console.log("Rolling on all"+this.wheels+"wheels!");
	}
});

/*寄生继承*/
function Vehicle (){
    this.engines = 1;
}
Vehicle.prototype.ignition = function () {
	console.log("Turing on my engine");
};
Vehicle.prototype.drive = function () {
	this.ignition();
	console.log("Steering and moving forward");
}
//寄生类car
function Car () {
	var car = new Vehicle();
	car.wheels = 4;
	var vehDrive = car.drive;
	car.drive = function () {
		vehDrive.call(this);
		console.log( "Rolling on all" + this.wheels + "wheels!");
		
	};
	return car;
}
var myCar =new Car();
myCar.drive();

/*隐式混合*/
var Something={
	cool:function () {
		this.greeting = "Hello World";
		this.count = this.count ? this.count +1 : 1;
	}
};
Something.cool();
Something.greeting;
Something.count;

var Another ={
	cool: function() {
		Something.cool.call(this);
	}
};
Another.cool();
Another.greeting;
Another.count;



