/*对象*/
var string ="I am string";
typeof string;//"string"
string instanceof String;//false;

var string=new String("I am string");
typeof string;//"Object"
string instanceof String;//true

var string="I am string";
console.log(string.length);
console.log(string.charAt(3));//

/*访问对象属性*/
var obj={
    a:2
};
console.log(obj.a);//2
console.log(obj["a"]);//2

var obj={
	a:2
};
var idx;
function something(wantA){
  if(wantA){
	idx="a";
}
}
something(true);
console.log(obj[idx]);//2

/*可计算属性*/
var prefix="foo";
var obj={
	[prefix+"bar"]:"hello",
	[prefix+"baz"]:"world"
};
obj["foobar"];//hello
obj["foobaz"];//world

/*属性与方法*/
function foo(){
	console.log("foo");
}
var someFoo=foo;
var obj={
    someFoo:foo
};
console.log(foo);
console.log(someFoo);
console.log(obj.someFoo);

var obj={
	foo:function(){
		console.log("foo");
	}
};
var somefoo=obj.foo;
console.log(somefoo);
console.log(obj.foo);

/*数组*/
var array=["a","b","c"];
array.baz="baz";
console.log(array.length);//3
console.log(array.baz);//"baz"

/*复制对象*/
function anotherFunction(){
	console.log("copy object");
}
var anotherObject={
	c:true
}
var anotherArray=[];
var myObject={
	a:2,
	b:anotherObject,
	c:anotherArray,
	d:anotherFunction
};
anotherArray.push(anotherObject,myObject);

var newObj=Object.assign({},myObject);
newObj.a;
newObj.b===anotherObject;//true
newObj.c===anotherArray;//true
newObj.d===anotherFunction;//true

var myObject={
	get a(){
      return 2;
	}
};

Object.defineProperty(
    myObject,
    "b",
    {
    	get:function(){
    		return this.a*2;
    	},
    	enumerable:true
    }
	);
myObject.a;//2
myObject.b;//4

/*只定义get*/
var myObject(){
	get a(){
		return 2;
	}
};
myObject.a=3;
myObject.a;//2

/*定义set*/
var myObject={
    get a(){
    	return this._a_;
    },
    set a(val){
    	this._a_=val*2;
    }
};
myObject.a=2;
myObject.a;//4

/*存在性*/
var myObject={
	a:2
};
myObject.hasOwnProperty("a");//true
myObject.hasOwnProperty("b");//false

/*遍历*/
 var myArray = [1,2,3];
 for ( var v of myArray) {
 	console.log(v);
 }
 //1
 //2
 //3

 /*定义iterator*/
 var myObject={
 	a:2,
 	b:3
 };
 Object.defineProperty(myObject,Symbol.iterator,{
 	enumerable: false,
 	writable: false,
 	configurable: true,
 	value: function() {
 		var o=this;
 		var idx=0;
 		var ks=Object.keys( o );
 		return {
 			next:function (){
 				return {
 					value:o[ks[idx++]],
 					done:(idx>ks.length)
 				};
 			}
 		}		
 	}
 } );
 //手动遍历
 var it=myObject[Symbol.iterator]();
 console.log(it.next());
 console.log(it.next());
 console.log(it.next());
  for(var v of myObject){
 	console.log(v);
 }
 //2
 //3