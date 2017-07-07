/*原型链*/
var anotherObject = {
	a:2
};
var myObejct=Object.create(anotherObject);

for(var k in myObejct) {
	console.log("found:"+k);
}


