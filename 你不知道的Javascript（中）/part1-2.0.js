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