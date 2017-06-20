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
