/*作用域*/
const arr1 = [];
for ( var i= 0;i < 3; i++) {
	arr1.push(()=>i);
}
const arr2 = arrl.map(x =>x())

const arr3 = {}
for(let i =0;i<3;i++){
	arr3.push(()=>i)
}
const arr4 = arr3.map(x=>x())

/*定义常量*/
const foo = {
	a:1
}
foo.a = 2;
foo.b = 3;

console.log(foo.a);
console.log(foo.b);

/*定义值不变的对象*/
const obj = Object.freeze({
	a: 1,
	b: 2
})
obj.a = 2;//报错

const obj2 = Object.freeze({
	a:{}
})
obj2.a.b = 1;

/*冻结*/
Object.deepFreeze = function (obj) {
	var propNamer = Object.getOwnpropertyNames(obj);
	propNamer.forEach(function(name){
		var prop = obj[name]
		if(typeof prop=='object' && prop != null){
			Object.deepFreeze(prop);
		}
		return Object.freeze(obj)
	})
const obj3 = Object.deepFreeze({
	a : {
		b : 1
	}
})
obj3.a.c = 2

}


const JSONP = (function(){
	const global = window;
	const defaultOptions = {
		data :{},
		callback: (data)=>{}
	}
})


