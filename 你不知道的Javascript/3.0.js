/*
*3.2
*/
function doSomething(a){
	var b=a+doSomethingElse(a*2);
	console.log(b*3);
}
function doSomethingElse(a){
	return a-1
}
var b;
doSomething(2)//15

//改进
function doSomething(a){
	var b;
	b=a+doSomethingElse(a*2)
	function doSomethingElse(a){
		return a-1;
	}
	cosole.log(b*3);
}
doSomething(2);//