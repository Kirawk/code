/**
 * Promise
 * 2017-11-26
 */

/**
 * 3.1 什么是Promise
 */
//3.1.1
function add(getX, getY, cb) {
    var x, y;
    getX(function (xVal) {
        x = xVal;
        if (y != undefined) {
            cb(x + y);
        }
    });
    getY(function (yVal) {
        y = yVal;
        if (x != undefined) {
            cab(x + y);
        }
    });
}
add(fetchX, fetchY, function (sum) {
    console.log(sum);
});
//通过Promise表述上述代码
function add(xPromise, yPromise) {
    //Promise.all([])接受一个promise数组并返回一个新的promise
    //这个新的promise等待数组中的所有promise完成；
    return Promise.call([xPromise, yPromise])
        //这个promise决议之后，我们取得收到的x和y值并加起来
        .then(function (values) {
            //values是来自于之前决议的promise的消息数组
            return values[0] + values[1];
        });
}
//fetch()和fetchY()返回相应值的promise
//也可能以后就绪
add(fetchX(), fetchY())
    .then(function (sum) {
        console.log(sum);
    });

add(fetchX(), fetchY())
    .then(
    //完成处理函数
    function (sum) {
        console.log(sum);
    },
    //拒绝处理函数
    function (err) {
        console.error(err);
    }
    );

//模拟evt事件监听
function foo(x) {
    //
    return listener;
}
var evt = foo(42);
evt.on("completion", function () {
    //可以进行下一步了
});
evt.on("failure", function (err) {
    // 啊，出错了
});

function foo() {
    //可能做一些可能耗时的时间
    return new Promise(function (resolve, reject) {
        //最终调用resolve
    });
}
var p = foo(42);
bar(p);
baz(p);

function bar(fooPromise) {
    fooPromise.then(
        function () {
            //foo()已经完成，所以执行bar()的任务
        },
        function () {
            //foo()出错了
        }
    );
}
//另一种实现方式
function bar() {
    //foo(..)肯定已经完成，所以执行bar()的任务
}
function oopsBar() {
    // 出错了
}
var p = foo(42);
p.then(bar, oopsBar);
p.then(baz, oopsBar);

//3.2 具有then方法的鸭子类型
if(p !=null && (typeof p == "object" || typeof p =="function")&& typeof p.then =="function"){
    //假定这是一个thenable
}else{
    //不是thenable
}

var o = {
    then:function(){}
};
var v = Object.create(o);

v.someStuff = "cool";
v.otherStuff = "not so cool";
v.hasOwnProperty("then");

Object.prototype.then = function(){};
Array.prototype.then = function(){};

var v1 = {
    hello: "world"
};
var v2 = ["Hello","world"];