function now(){
    return 42;
}
function later(){
    answer = answer * 2;
    console.log("Meaning of life:",answer);
}
var answer = now();
setTimeout(later,1000);

//1.2事件循环伪代码
var eventLoop = [];
var evetn;
while(true){
    if(eventLoop.length > 0){
        event = eventLoop.shift();
        try{
            event();
        }catch{
            reportErroe(err);
        }
    }
}
//1.3并行线程与完整运行
var a =1;
var b =2;
function foo(){
    a++;
    b = b * a;
    a = b + 3;
}
function bar(){
    b--;
    a = 8 + b;
    b = a * 2;
}
ajax("http://some.url1",foo);
ajax("http://some.url1",bar);

//上述代码有两种结果
//第一种
var a = 1;
var b = 2;
//先执行了foo()
a++;
b = b * a;
a = b + 3;
//bar()
b--;
a = 8 + b;
b = a * 2;

a;//11
b;//22

//第二种
var a = 1;
var b = 2;
//bar()
b--;
a = 8 + b;
b = a * 2;
//foo()
a++;
b = b * a;
a = b + 3;
a;//183
b;//180

//1.4 并发