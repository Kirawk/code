/**
 * 生成器
 * 看似同步的异步流程控制表达风格
 */
//4.1 打破完整运行
var x = 1;
function foo(){
    x++;
    bar();
    console.log("x:",x);
}
function bar(){
    x++;
}
foo();//3

//yield的使用
var x = 1;
function *foo(){
    x++;
    yield;//暂停
    console.log("x",x);
}
function bar(){
    x++;
}
var it = foo();
//这里启动foo()
it.next();
x;
bar();
x;
it.next();

//4.11输入与输出
function *foo(x,y){
    return x*y;
}
var it = foo(6,7);
var res = it.next();
res.value;//42
