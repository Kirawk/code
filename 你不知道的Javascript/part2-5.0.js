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

