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

/**
 * Promise的信任问题
 */
p.then(function(){
    p.then(function(){
        console.log("C");
    });
    console.log("A");
});
p.then(function(){
    console.log("B");
});
//A B C

var p3 = new Promise(function(resolve,reject){
    resolve("B");
});
var p1 = new Promise(function(resolve,reject){
    resolve(p3);
});
p2 = new Promise(function(resolve,reject){
    resolve("A");
});
p1.then(function(v){
    console.log(v);
});
p2.then(function(v){
    console.log(v);
});

//3.3.3 回调未调用
function timeoutPromise(delay){
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            reject("Timeout!");
        },delay);
    });
}

//设置foo()超时
Promise.race([
    foo(),
    timeoutPromise(3000)
])
.then(function(){
   //foo()及时完成
},function(err){
//或者foo()被拒绝
}
);

//3.3.4 调用次数过多
//3.3.5 未能传递参数
//3.3.6 吞掉错误或异常
var p = new Promise(function(resolve,reject){
    foo.bar();//foo未定义会出错；
    resolve(42);
});
p.then(
    function fulfiled(){
     //永远不会运行到这里
    },
    function rejected(err){
     //err将会是一个typeError异常对象来自foo.bar
    }
);

var p = new Promise(function(resolve,reject){
    resolve(42);
});
p.then(
    function fulfiled(msg){
        foo.bar();
        console.log(nsg);
    },
    function rejected(err){
        //永远也不会到达这里
    }
);

//3.3.7是可信任的promise
var p1 = new Promise(function(resolve,reject){
     resolve(42);
});
var p2 = Promise.resolve(42);
var p1 = Promise.resolve(42);
var p2 = Promise.resolve(p1);
p1 === p2;//true

var p = {
    then: function(cb){
        cb(42);
    }
};
p.then(
    function fulfiled(val){
        console.log(val);
    },
    function rejected(err){
        console.log(err);//永远不会到达这里
    }
);

var p = {
    then :function (cb,err){
        cd(42);
        errcb("evil laugh");
    }
};
p.then(
    function fulfilled(val){
        console.log(val);
    },
    function rejected(err){
        console.log(err);
    }
);
Promise.resolve(p).then(
    function fulfilled(val){
        console.log(val);
    },
    function rejected(err){
        //永远也不会执行到这里
    }
);
//不要只是这样做
foo(42).then(
    function(v){
        console.log(v);
    }
);
//而要这样做
Promise.resolve(foo(42)).then(
    function (v){
        console.log(v);
    }
);
/*3.3.8 建立信任*/
　var p = Promise.resolve(21);
var p2 = p.then(function (v){
    console.log(v);//21
    return v*2;
});
p2.then(function(v){
    console.log(v);//42
});

var p = Promise.resolve(21);
p
.then(function(v){
    console.log(v);//21
    return v *2;
})
.then(function(v){
    console.log(v);//42
});

var p = Promise.resolve(21);
p.then(function(v){
    console.log(v);//21
    return new Promise(function(resolve,reject){
        resolve(v*2);
    });
})
.then(function(v){
    console.log(v);//42
});

var p = Promise.resolve(21);
p.then(function(v){
    console.log(v);
    //创建一个promise并返回
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            resolve(42);
        },100);
    });
})
.then(function(v){
    //在前一步中的100ms延迟之后运行
    console.log(v);//42
});

function delay(time){
    return new Promise(function(resolve,reject){
        setTimeout(resolve,time);
    });
}
delay(100)
.then(function STEP2(){
    console.log("step 2 (after 100ms)");
    return delay(200);
})
.then(function STEP3(){
    console.log("step 3 (after another 200ms)");
})
.then(function STEP4(){
    console.log("step 4 (next Job)");
    return delay(50);
})

//不用定时器来构造ajax请求
function request(url){
    return new Promise(function(resolve,reject){
        //ajax()回调应该是我们这个promise的resolve（）函数
        ajax(url,resolve);
    });
}
request("http://some.url.1/")
.then(function(response1){
    return request("http://some.url.2/?v="+response1);
})
.then(function(response2){
    console.log(response2);
});

//当这真个链接出现错误时
//步骤1
request("http://some.url.1/")
//步骤二
.then(function(request1){
    foo.bar();
    
    //永远不会到达这里
     return request("http://some.url.2/?v="+response1);
})
//步骤三
.then(
    function fulfilled(response2){
        //永远不会到达这里
    },

    //捕捉错误的拒绝处理函数
    function rejected(err){
        console.log(err);
        return 42;
    }
 )
 //步骤4:
 .then(function(msg){
     console.log(msg);//42
 });

 var p = new Promise(function(resolve,reject){
    reject("Oops");
 });
 var p2 = p.then(
     function fulfiled(){
         //永远不会到这里
     }
 );

 var p = Promise.resolve(42);
 p.then(null,function reject(err){
     //永远不会执行到这里
 });
  var rejectedPr = new Promise(function(resolve,reject){
      //用一个被拒绝的promise完成这个promise
      resolve(Promise.reject("Oops"));
  });
  rejectedPr.then(
      function fulfilled(){
      //永远不会到达这里
      },
      function rejected(err){
          console.log(err);//"Oops"
      }
);
function fulfiled(msg){
    console.log(msg);
}
function rejected(err){
    console.log(err);
}
p.then(
    fulfilled,
    rejected
);

/**
 * 3.5 错误处理
 */
function foo(){
    setTimeout(function(){
        baz.bar();
    },100);
}
try {
    foo();
} catch (error) {
    //永远也不会到达
}
function foo(cb){
    setTimeout(function(){
        try {
           var x = baz.bar();
           cb(null,x); 
        } catch (error) {
            cb(err);
        }
    },100);
}
foo(function(err,val){
    if(err){
        console.log(err);
    }else{
        console.log(val);
    }
});
//Promise没有使用error-first风格而采用了
//分离回调风格
var p = Promise.reject("Oops");
p.then(
    function fulfilled(){
        //永远不会运行到这里了
    },
    function rejected(err){
        console.log(err);
    }
);

var p = Promise.resolve(42);
p.then(
    function fulfilled(msg){
        console.log(msg.toLowerCase());//数字没有string函数，会报错
    },
    function rejected(err){
        console.log(err);//永远不会到这里
    }
);

//3.5.1绝望的陷阱
var p = Promise.resolve(42);
p.then(
    function fulfilled(msg){
        console.log(msg.toLowerCase());
    }
)
.catch(handleErrors);

var p = Promise.resolve(42);
p.then(
    function fulfilled(msg){
        console.log(msg.toLowerCase());
    }
)
.catch(null,handleErrors);

//3.5.3成功的坑
var p = Promise.reject("Oops").defer();
foo(42)
.then(
    function fulfilled(){

    },
    function rejected(err){
        //处理foo错误

    }
);

//Promise模式
//3.6.1 Promie all
var p1 = request("http://some.url.1/");
var p2 = request("http://some.url.2");
Promise.all([p1,p2])
.then(
    function (msg){
        return request(
            "http://some.url.3/?v="+msg.join(",")
        );
})
.then(
    function (msg){
        console.log(msg);
});

//3.6.2 Promise.race
var p1 = request("http://some.url.1");
var p2 = request("http://some.url.2");
Promise.race([p1,p2])
.then(function (msg){
    //p1或者p2将赢得这场比赛
    return request(
        "http://some.url.3/?v="
    );
})
.then(function (msg){
    console.log(msg);
});
//超时竞赛
Promise.race([
    foo(),
    timeoutPromise(3000)
])
.then(
    function(){
        //foo按时完成
    },
    function(err){
        //要么foo()被拒绝，要么只是没能按时完成
    }
);

var p = Promise.resolve(42);
p.then(something)
.finally(cleanup)
.then(another)
.finally(cleanup)

if(!Promise.observe){
    Promise.observe = function(pr,cb){
        //观察pr的协议
        pr.then(
            function fulfiled(msg){
                Promise.resolve(msg).then(cb);
            },
            function rejected(err){
                Promise.resolve(err).then(cb);
            }
        );
        //返回最初的promise
        return pr;
    };
}

Promise.race([
    Promise.observe(
        foo(),
        function cleanup(msg){

        }
    ),
    timeoutPromise(3000)
])

//3.6.3 all()与race()的变体
//first([])模仿
if(!Promise.first){
    Promise.first = function(prs){
     return new Promise(function(resolve,reject){
         prs.forEach(function(pr){
             Promise.resolve(pr)
             .then(resolve);
         });
     });
    };
}

//3.6.4 并发迭代
if(!Promise.map){
    Promise.map = function (vals,cb){
        return Promise.all(
            vals.map(function(val){
                return new Promise(function(resolve){
                    cb(val,resolve);
                });
            })
        );
    };
}

var p1 = Promise.resolve(21);
var p2 = Promise.resolve(42);
var p3 = Promise.reject("Oops");

Promise.map([p1,p2,p3],function(pr,done){
    Promise.resolve(pr)
    .then(
        function(v){
            done(v*2);
        },
        done
    );
})
.then(function(vals){
    console.log(vals);
});

/**
 * 3.7 Promise API概述
 */
var p = new Promise(function(resolve,reject){
    reject("OOPs");
});
var p2 = Promise.reject("Oops");

var fulfiledTh = {
    then: function(cb){
        cb(42);
    }
};
var rejectTh = {
    then: function(cb,errCb){
        errCb("Oops");
    }
};
var p1 = Promise.resolve(fulfiledTh);
var p2 = Promise.resolve(rejectTh);

//3.7.3 then()和catch()
//3.7.4 all（）和race（）
var p1 = Promise.resolve(42);
var p2 = Promise.resolve("hello world!");
var p3 = Promise.resolve("Oops");
Promise.race([p1,p2,p3])
.then(function(msg){
    console.log(msg);
});
Promise.all([p1,p2,p3])
.catch(function(err){
   console.log(err);
});

Promise.all([p1,p2])
.then(function(msgs){
    console.log(msgs);
});

/**
 * 3.8 Promise的局限性
 */
//3.8.1 顺序错误处理
//3.8.2 单一值
function getY(x){
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            resolve((3*x)-1);
        });
    })
}
function foo(bar,baz){
    var x = bar * baz;
    return getY(x)
    .then(function(y){
        return [x,y];
    });
}
foo(10,20)
.then(function(msgs){
    var x = msgs[0];
    var y = msgs[1];
    console.log(x,y);
});

function foo(bar,baz){
    var x = bar*baz;
    //返回两个Promise
    return [
        Promise.resolve(x),
        getY(x)
    ];
}
Promise.all(
    foo(10,20)
)
.then(function(msg){
    var x = msgs[0];
    var y = msgs[1];
    console.log(x,y);
});

function spread(fn){
    return Function.call.bind(fn,null);
}
Promise.all(foo(10,20))
.then(
    spread(function(x,y){
        console.log(x,y);//200 599
    })
)
Promise.all(
    foo(10,20)
)
.then(function(msg){
    var [x,y] = msgs;
    console.log(x,y);
})
//es6数组参数结构
Promise.all(
    foo(10,20)
)
.then(function([x,y]){
    console.log(x,y);
});
//3.8.3 单决议
//click(...)把click事件绑定到DOM元素上
//request()支持Promis的Ajax
var p = new Promise(function(resolve,reject){
    click("#mybtn",resolve);
});
p.then(function(evt){
    var btnID = evt.currentTarget.id;
    return request("http://some.url.1/?id="+btnID);
})
.then(function(text){
    console.log(text);
});

click("#mybtn",function(evt){
    var btnID = evt.currentTarget.id;
    request("http://some.url.1/?id="+btnID)
    .then(function(text){
        console.log(text);
    });
});
//3.8.4 惯性
function foo(x,y,cb){
    ajax("http://some.url.1/?x="+x+"&y="+y,cb);
}
foo(11,31,function(err,text){
    if(err){
        console.error(err);
    }else{
        console.log(text);
    }
});

//polyfii安全的guard检查
if(!Promise.wrap){
    Promise.wrap = function(fn){
        return function(){
            var args = [].slice.call(arguments);
            return new Promise(function(resolve,reject){
                fn.apply(
                    null,
                    args.concat(function(err,v){
                        if(err){
                            reject(err);
                        }else{
                            resolve(v);
                        }
                    })
                );
            });
        };
    };
}

var request = Promise.wrap(ajax);
function foo(x,y,cb){
    request("http://some.url.1/?x="+x+"&y"+y)
    .then(
        function fulfiled(text){
            cb(null,text);
        },
        cb
    );
}
//为foo构造一个promisory
var betterFoo = Promise.wrap(foo);
betterFoo(11,31)
.then(
    function fulfiled(text){
        console.log(text);
    },
    function rejected(err){
        console.log(err);
    }
);

function foo(x,y){
    return request("http://some.url.1/?x"+x+"&y="+y);
}
//3.8.5无法取消的Promise
//考虑Promise超时场景
var p = foo(42);
Promise.race([p,timeoutPromise(3000)])
.then(
    doSomething,
    handleError
);
p.then(function(){
    //即使在超时的情况下也会发生
});

var OK =true;
var p = foo(42);
Promise.race([
    p,
    timeoutPromise
    .catch(function(err){
        OK = false;
        throw err;
    })
])
.then(
    doSomething,
    handleError
);
p.then(function(){
    if(OK){
        //只有在没超时情况下才会发生
    }
});

//3.8.6 Promis性能
