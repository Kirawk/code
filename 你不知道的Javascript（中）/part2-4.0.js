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

//4.1.1输入与输出
function *foo(x,y){
    return x*y;
}
var it = foo(6,7);
var res = it.next();
res.value;//42
 
function *foo(x){
    var y = x*(yield);
    return y;
}
var it = foo(6);
//启动foo()
it.next();
var res = it.next(7);
res.value;//42

function *foo(x){
    var y = x*(yield "hello");
    return y;
}
var it = foo(6);
var res = it.next();
res.value;//"hello"
res = it.next(7);
res.value;//42

//4.1.2 多个迭代器
function *foo(){
    var x = yield 2;
    z++;
    var y = yield(x*z);
    console.log(x,y,z);
}
var z = 1;
var it1 = foo();
var it2 = foo();
var val1 = it1.next().value;//2
var val2 = it2.next().value;//2

val1 = it1.next(val2*10).value;//40
val2 = it2.next(val1*5).value;//

it1.next(val2 / 2);//y:300 //20 300 3
it2.next(val1 / 4);//y:10 //200 10 3

var a = 1;
var b = 2;
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
//改写上述代码
var a = 1;
var b = 2;
function *foo(){
    a++;
    yield;
    b = b * a;
    a = (yield b) + 3;
}
function *bar(){
    b--;
    yield;
    a = (yield 8) + b;
    b = a * (yield 2);
}
function step(gen){
    var it = gen();
    var last;
    return function(){
        //不管yield出来的是什么，下一都把它原样传回去
        last = it.next(last).value;
    };
}
a = 1;
b = 2;

var s1= step(foo);
var s2 = step(bar);
s1();
s1();
s1();
//y运行bar()
s2();
s2();
s2();
console.log(a,b);
//使用交替执行顺序
a = 1;
b = 2;
var s1 = step(foo);
var s2 = step(bar);
s2();
s2();
s1();
s2();
s1();
s1();
s1();
s2();
console.log(a,b);

//4.2 生成器产生值
var gimmeaSomething = (function(){
    var nextVal;
    return function(){
        if(nextVal === undefined){
            nextVal = 1;
        }
        else{
            nextVal = (3*nextVal)+6;
        }
        return nextVal;
    };
});
gimmeaSomething();//1
gimmeaSomething();//9
gimmeaSomething();//33
gimmeaSomething();//105

//标准的迭代器接口
var something = (function(){
    var nextVal;
    return {
        [Symbol.iterator]:function(){return this},
        next: function(){
            if(nextVal === undefined){
                nextVal = 1;
            }
            else{
                nextVal = (3*nextVal)+6;
            }
            return {
                done:false,
                value:nextVal
            };
        }
    };
})();
something.next().value;//1
something.next().value;//9
something.next().value;//33
something.next().value;//105

//es6提供了for..of
for(var v of something){
    console.lig(v);
    if(v>500){
        break;
    }
}

var a = [1,3,5,7,9];
for(var v of a){
    console.log(v);
}
//1 3 5 7 9

//4.2.2 iterable
var a = [1,2,3,4,5];
var it =a[Symbol.iterator]();

it.next().value;//1
it.next().value;//2

//4.2.3 生成迭代器
//使用生成器实现something无限数字序列生产者
function *something(){
    var nextVal;
    while(true){
        if(nextVal === undefined){
            nextVal = 1;
        }else{
            nextVal = (3*nextVal) + 6;
        }
        yield nextVal;
    }
}

for(var v of something()){
    console.log(v);

    //不要死循环
    if(v > 500){
        break;
    }
}
function *something(){
    try {
        var nextVal;
        if(nextVal === undefined){
            nextVal = 1;
        }else{
            nextVal = (nextVal*3)+6;
        }
        yield nextVal;
    } finally {
        console.log("clearup");
    }
}

var it = something();
for(var v of it){
    console.log(v);
    if(v>500){
        console.log(
            it.return("hello world").value
        );
        //这里不需要break
    }
}
// 1 9 33 105 321 969

/**
 * 4.3异步迭代生成器
 */

function foo(x,y,cb){
    ajax(
        "http://some.url.1/?x="+x+"&y="+y,
        cb
    );
}
foo(11,31,function(err,text){
    if(err){
        console.error(err);
    }
    else{
        console.log(text);
    }
});
//通过生成器来处理上述问题
function foo(x,y,){
    ajax(
        "http://some.url.1/?x="+x+"&y"+y,
        function(err,data){
            if(err){
                it.throw(err);
            }else{
                it.next(data);
            }
        }
    );
}
function *main(){
    try{
        var text = yield foo(11,31);
        console.log(text);
    }
    catch(err){
        console.log(err);
    }
}
var it = main();
//启动
it.next();

//同步处理错误
try {
    var text = yield foo(11,31);
    console.log(text);
} catch (err) {
    console.error(err);
}

if(err){
    //向*main()抛出一个错误
    it.throw(err);
}

function *main(){
    var x = yield "hello world";
    yield x.toLowerCase();
}
var it = main();
it.next().value;
try{
    it.next(42);
}catch(err){
    console.log(err);
}

function *main(){
    var x = yield "Hello World";
    console.log(x);
}
var it = main();
it.next();
try{
    it.throw("Oops");
}
catch{
    //不行，没有处理
    console.error(err);
}
/**
 * 4.4 生成器 + Promise
 */
//前面例子
function foo(x,y){
    return request(
        "http://some.url.1/?x="+x+"&y"+y
    );
}
foo(11,31)
.then(
    function(text){
        console.log(text)
    },
    function (err){
        console.log(err);
    }
);

//该写上述例子
function foo(x,y){
    return request(
        "http://some.url.1?x="+x+"&y"+y
    );
}
function *main(){
    try {
        var text = yield foo(11,31);
    } catch (err) {
        console.log(err);
    }
}

var it = main();
var p = it.next().value;
//等待promise P决议
p.then(
    function(text){
        it.next(text);
    },
    function (err){
        it.throw(err);
    }
);
function run(gen){
    var args = [].slice.call(arguments,1),it;
    //  当前上下文初始化生成器
    it = gen.apply(this,args);

    //返回一个promise用于生成器完成
    return Promise.resolve()
    .then(function handleNext(value){
        var next = it.next(value);
        return (function handleResult(next){
            if(next.done){
                return next.value;
            }else{
                return Promise.resolve(next.value)
                .then(
                    handleNext,
                    function handleErr(err){
                        return Promise.resolve(
                            it.throw(err)
                        )
                        .then(handleResult);
                    }
                );
            }
        })(next);
    });

}

//es6或es7
function foo(x,y){
    return request(
        "http:some.url.1/?x="+x+"&y="+y
    );
}
async function main(){
    try{
        var text = await foo(11,31);
        console.log(text);
    }catch(err){
        console.error(err);
    }
}
main();

/**
 * 4.4.2 生成器中的Promise并发
 */
function *foo(){
    var r1 = yield request("http://some.url.1");
    var r2 = yield request("http://some.url.2");

    var r3 = yield request(
        "http://some.url.3/?v="+r1+","+r2
    );
    console.log(r3);
}
//使用前面定义的工run(...)
run(foo);

//改进上述代码
function *foo(){
    //让两个请求同时
    var p1 = request("http://some.url.1");
    var p2 = request("http://some.url.2");
    
    //等待两个Promis都决议
    var r1 = yield p1;
    var r2 = yield p2;

    var r3 = yield request(
        "http://some.url.3/?v="+r1+","+r2
    );
    console.log(r3);
}
run(foo);
//使用Promis.all改写上述代码
function *foo(){
    var results = yield Promise.all([
        request("http://some.url.1"),
        request("http://some.url.2")
    ]);

    var r1 = results[0];
    var r2 = results[1];
    var r3 = yield request(
        "hhtp://some.url.3/?v="+r1+","+r2
    );
    console.log(r3);
}
run(foo);
//隐藏的Promise
function bar(url1,url2){
    return Promise.all([
        request(url1),
        request(url2)
    ]);
}
function *foo(){
    //隐藏bar()内部基于Promise的并发细节
    var results = yield bar(
        "hhtp://some.url.1",
        "http://some.url.2"
    );

    var r1 = request[0];
    var r2 = request[1];

    var r3 = yield request(
        "http://some.url.3/?v="+r1+","+r2
    );
    console.log(r3);
}
run(foo);

/**
 * 4.5 生成器委托
 */
function *foo(){
    var r2 = yield request("http://some.url.2");
    var r3 = yield request("http://some.url.3/?v="+r2);

    return r3;
}
function *bar(){
    var r1 = yield request("http://some.url.1");

    //通过run()委托给*foo()
    var r3 = yield run(foo);

    console.log(r3);
}
run(bar);

//委托的简单场景
function *foo(){
    console.log("*foo() starting");

    yield 3;
    yield 4;
    console.log("*foo() finished"); 
}
function *bar(){
    yield 1;
    yield 2;
    yield *foo();//yield委托
    yield 5;
}
var it = bar();
it.next().value;//1
it.next().value;//2
it.next().value;//*foo启动
                //3
it.next().value;//4
it.next().value;//*foo()完成
                //5

//再回到前面三个ajax请求的例子
function *foo(){
    var r2 = yield request("http://some.url.2");
    var r3 = yield request("http://some.url.3/?v="+r2);
    
    return r3;
}
function *bar(){
    var r1 = yield request("http://some.url.1");

    //通国yield*委托给*foo()
    var r3 = yield *foo();

    console.log(r3);
}
run(bar);

/**
 * 4.5.2 消息委托
 */
function *foo(){
    console.log("inside *foo:",yield "B");
    console.log("inside *foo():",yield "C");
    return "D";
}
function *bar(){
    console.log("inside *bar():",yield "A");
    console.log("inside *bar():",yield *foo());
    console.log("inside *bar():",yield "E");

    return "F";
}
var it = bar();
console.log("outside",it.next().value);
//outside:A
console.log("outside",it.next(1).value);
//inside *bar():1
//outside:B
console.log("outside",it.next(2).value);
//inside *foo():2
//outside:C
console.log("outside",it.next(3).value);
//inside *foo():3
//inside *bar():D
//outside:E
console.log("outside",it.next(4).value);
//inside *bar():4
//outside:F

function *bar(){
    console.log("inside *bar():",yield "A");
    console.log("inside  *bar()",yield *["B","C","D"]);
    console.log("inside *bar():",yield "E");
    return "F";
}
var it = bar();
console.log("outside:", it.next().value);
console.log("outside:",it.next(1).value);
console.log("outside:",it.next(2).value);
console.log("outside:",it.next(3).value);
console.log("outside:",it.next(4).value);
console.log("outside:",it.next(5).value);

//异常也被委托
function *foo(){
    try{
        yield "B"
    }
    catch(err){
        console.log("error caught inside *foo():",err);
    }
    yield "C";
    throw "D";
}
function *bar(){
    yield "A";

    try{
        yield *foo();
    }
    catch(err){
        console.log("error caught inside *bar():",err);
    }
    yield "E";
    yield *baz();

    //注：不会到达这里！
    yield "G";
}

function *baz(){
    throw "F";
}

var it = bar();
console.log("outside:",it.next().value);
console.log("outside:",it.next().value);
console.log("outside:",it.throw(2).value);
console.log("outside:",it.next(3).value);
try{
    console.log("outside:",it.next(4).value);
}
catch(err){
    console.log("error caught outside:",err);
}

/**
 * 异步委托
 */
function *foo(){
    var r2 = yield request("http://some.url.2");
    var r3 = yield request("http://some.url.3/?v="+r2);

    return r3;
}
function *bar(){
    var r1 = yield request("http:some.url.1");

    var r3 = yield *foo();
    console.log(r3);
}
run(bar);

/**
 * 4.5.4 递归委托
 */
function *foo(){
    if(val > 1){
        //生成器递归
        val = yield *foo(val-1);
    }
    return yield request("http://some.url/?v="+val);
}

function *bar(){
    var r1 = yield *foo(3);
    console.log(r1);
}
run(bar);
/**
 * 4.6 生成器并发
 */
function response(data){
    if(data.url == "http://some.url.1"){
        res[0] = data;
    }
    else if(data.url == "http://some.url.2"){
        res[1] = data;
    }
}
var res = [];
function *reqData(url){
    res.push(
        yield request(url)
    );
}

//改写上述例子
var it1 = reqData("http://some.url.1");
var it2 = reqData("http://some.url.2");

var p1 = it1.next();
var p2 = it2.next();

p1
.then(function(data){
    it1.next(data);
    return p2;
})
.then(function(data){
    it2.next(data);
});

var res = [];
function *reqData(url){
    var data = yield request(url);

    //控制转移
    yield;
    res.push(data);
}
var it1 = reqData("http://some.url.1");
var it2 = reqData("http:some.url.2");

var p1 = it.next();
var p2 = it.next();
p1.then(function(data){
   it1.next(data);
});

p2.then(function(data){
    it2.next(data);
});

Promise.all([p1,p2])
.then(function(){
    it1.next();
    it2.next();
});

var res = [];
runAll(
    function*(){
        var p1 = request("http://some.url.1");

        //控制转移
        yield;
        res.push(yield p1);
    },
    function*(){
        var p2 = request("http://some.url.2");

        //控制转移
        yield;
        res.push(yield p2);
    }
);

/**
 * 4.7 形实转化程序
 */
function foo(x,y){
    return x+y;
}
function fooThhunk(){
    return foo(3,4);
}
console.log(fooThhunk());

function foo(x,y,cb){
    setTimeout(function(){
        cb(x+y);
    },1000);
}
function fooThhunk(cb){
    foo(3,4,cb);
}
fooThunk(function(sum){
    console.log(sum);
});

