/*值-内置的值类型*/
/**
@ 2.1 数组
**/
var a =[1,"2",[3]];
a.length;//3
a[0] === 1;//true
a[2][0] === 3//true

var a = [];
a.length;//0
a[0]=1;
a[1]="2";
a[2]=[3];
a.length;//3

/*稀疏数组
*/
var a = [];
a[0] = 1;
a[2] = 3;
a[1];//undefined
a.length;//3

var a= [];
a[0] = 1;
a["foobar"] = 2;
a.length;//1
a.foobar;//2

/*类数组 
*/function foo(){
    var arr = Array.prototype.slice.call(arguments);
    arr.push("bam");
    console.log(arr);
}
foo("bar","baz");// ["bar", "baz", "bam"]


/**
字符串
*/
var a = "foo";
var b = ["f","o","o"];
a.length;//3
b.length;//3
a.indexOf("o");//1;
b.indexOf("o");//1

var c = a.concat("bar");
var d = b.concat(["b","a","r"]);

a === c;//false
b === d;//false

a[1] = "0";
b[1] ="0";
a;//foo
b;//["f", "0", "o"]

c = a.toUpperCase();
a === c;//false
a;//foo
c;//FOO

b.push("!");
b;// ["f", "0", "o", "!"]

a.join;//undefined
a.map;//undefined

var c = Array.prototype.join.call(a,"-");
 var d = Array.prototype.map.call(a,function(v){
    return v.toUpperCase()+".";
 }).join("");
c;//f-o-o
d;//F.O.O.

a.reverse;//undefined
b.reverse();//["!", "o", "0", "f"]

var c =a.split("").reverse().join("");
c; //oof
