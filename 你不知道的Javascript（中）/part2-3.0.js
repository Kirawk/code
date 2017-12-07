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




