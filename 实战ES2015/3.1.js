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
