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

