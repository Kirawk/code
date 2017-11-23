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
//1.4.1并发之非交互
var res = {};
function foo(results){
    res.foo = results;
}
function bar(results){
    res.bar = results;
}
ajax("http://some.url.1",foo);
ajax("http://some.url.2",bar);

//1.4.2 并发之交互
 var res = [];
 function response(data){
     res.push(data);
 }
 ajax("http://some.url.1",response);
 ajax("http://some.url.2",response);

 //解决办法
 var res = [];
 function response(data){
     if(data.url == "http://some.url.1"){
         res[0].push(data); 
     }else if( data.url == "http://some.url.2"){
         res[1].push(data);
     }
 }
 ajax("http://some.url.1",response);
 ajax("http://some.url.2",response);

 var a,b;
 function foo(x){
     a = x*2;
     baz()
 }
 function bar(y){
     b = y*2;
     baz();
 }
 function baz(){
     console.log(a+b);
 }
 ajax("http://some.url.1",foo);
 ajax("http://some.url.2",bar);

 //改进上述代码
 var a,b;
 function foo(x){
     a = x * 2;
     if(a&&b){
         baz();
     }
 }
 function bar(x){
     b = y * 2;
     if(a&&b){
         baz();
     }
 }
 function baz(){
     console.log(a+b);
 }

 ajax("http://some.url.1",foo);
 ajax("http://some.url.2",bar);

 var a;
 function foo(x){
     a = x * 2;
     baz();
 }
 function bar(x){
     a = x / 2;
     baz();
 }
function baz(){
    console.log(a);
}
ajax("http://some.url.1",foo);
ajax("http://some.url.2",bar);

var a;
function foo(x){
    if(!a){
        a = x * 2;
        baz();
    }
    
}
function bar(x){
    if(!a){
        a = x / 2;
        baz();
    }
}
function baz(){
    console.log(a);
}
ajax("http://some.url.1",foo);
ajax("http://some.url.2",bar);

//1.4.3 协作
var res = [];
function response(data){
    res = res.concat(
        data.map(function(val){
            return val*2;
        })
    );
}
ajax("htttp://some.url.1",response);
ajax("http://some.url.2",response);

//一次读写1000万数据
 var res = [];
 function response(data){
    var chunk = data.splice(0,1000);
    res.concat(
        chunk.map(function(val){
            return val*2;
        })
    );
    if(data.length>0){
        setTimeout(function(){
            response(data);
        },0)
    }
 }
 ajax("http://some.url.1",response);
 ajax("hhtp://some.url.2",response);
 
 //1.5任务队列

 console.log("A");
 setTimeout(function(){
     console.log("B");
 },0);

 schedule(function(){
     console.log("c");
     schedule(function(){
         console.log("D");
     });
 });
 
