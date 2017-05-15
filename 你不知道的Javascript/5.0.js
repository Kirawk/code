/*
 * 作用域与闭包
 */
//5.2
function foo() {
	var a = 2;

	function bar() {
		console.log(a); //2
	}
	bar();
}
foo();
/*上述的例子，对理解闭包不是很明显*/
/*
 *改进版:闭包可以在它定义的词法作用域之外的地方
 * 执行
 */

function foo() {

	var a = 2;

	function bar() {
		console.log(a);
	}
	return bar;
}

var baz = foo();
baz(); //2
/****************************/
function foo() {
	var a = 2;

	function baz() {
		console.log(a);
	}
	bar(baz);
}

function bar(fn) {
	fn();
}
foo(); //2
/****************************/
var fn;

function foo() {
	var a = 2;

	function baz() {
		console.log(a);
	}
	fn = baz;
}

function bar() {
	fn();
}
foo();
bar(); //2

/********************************/

//5.3
function wait(message) {
	setTimeout(function timer() {
		console.log(message);
	}, 1000);
}
wait("hello,world!");

//5.4循环与闭包
for (var i = 1; i <= 5; i++) {
	setTimeout(function timer() {
		console.log(i);
	}, i * 1000);
}

for (var i = 1; i <= 5; i++) {
	(function() {
		var j = i;
		setTimeout(function timer() {
			console.log(j);
		}, i * 1000);
	})();
}

for (var i = 1; i <= 5; i++) {
	(function(j) {
		setTimeout(function() {
			console.log(j);
		}, j * 1000);
	})(i);
}

for (let i = 1; i <= 5; i++) {
	setTimeout(function() {
		console.log(i);
	}, i * 1000);
}

//5.5模块
function foo() {
	var something = "cool";
	var another = [1, 2, 3];

	function doSomething() {
		console.log(something);
	}

	function doAnother() {
		console.log(another.join("!"));
	}
}

function CoolModule() {
	var something = "cool";
	var another = [1, 2, 3];

	function doSomething() {
		console.log(something);
	}

	function doAnother() {

		console.log(another.join("!"));
	}
	return {
		doSomething: doSomething,
		doAnother: doAnother
	};
}
var foo = CoolModule();
foo.doSomething();
foo.doAnother();


var foo=(function CoolModule(id){
    //修改公共API
	function change(){
    publicAPI.identify=identify2;
	}
	function identify1(){
		console.log(id)
	}
	function identify2(){
		console.log(id.toUpperCase());
	}
	var publicAPI={
		change:change,
		identify:identify1
		
	}
	return publicAPI;
   
})("foo module");
foo.identify();
foo.change();
foo.identify();
