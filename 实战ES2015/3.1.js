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
