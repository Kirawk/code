/********闭包与函数式编程********************/
//变量
/**3.1变量的作用域**/
var func = function(){
    var a =2;
    console.log(a);//2
}
func();
console.log(a);//Uncaught ReferenceError: a is not defined

/*变量的生存周期*/
var func = function(){
    var a = 1;
    return function(){
        a++;
        console.log(a);
    }
}
var f = func();
f();//2
f();//3
f();//4
f();//5

//闭包应用
      /*<div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>*/
var nodes = document.getElementsByTagName('div');
for(var i=0;i<nodes.length;i++){
  nodes[i].onclick=function(){
    console.log(i);//点击后都打出5;
  }
}

/*修改后:*/
for(var i=0;i<nodes.length;i++){
  (function(i){
      nodes[i].onclick=function(){
       console.log(i);//
  })(i)
}

//封装变量
var mult =function () {
    var a =1;
    for(var i=0;i<arguments.length;i++){
        a = a*arguments[i];
    }
    return a;
}
mult(5,8,9);//360

var cache = {};//添加缓存
var mult = function(){
    console.log(arguments);
    var args = Array.prototype.join.call(arguments,',');
    console.log(args);
    if(cache[args]){//cache[args]这种用法不明白？
        return cache[args];
    }
    var a = 1;
    for(var i = 0;i<arguments.length;i++){
        a = a*arguments[i];
    }
    return cache[args] = a;
}
console.log(mult(1,2,3));//6
console.log(mult(1,2,3));//6

//避免将cache变量暴露在全局作用域中
var mult = (function() {
    var cache = {};
    return function() {
        var args = Array.prototype.join.call(arguments, ',');
        if (cache[args]) {
            return cache[args];
        }
        var a = 1;
        for (var i = 0; i < arguments.length; i++) {
            a = a * arguments[i];
        }
        return cache[args] = a;
    }
})();
//封装calculate
var mult = (function() {
    var cache = {};
    var calculate = function() {
        var a = 1;
        for (var i = 0; i < arguments.length; i++) {
            a = a * arguments[i];
        }
        return a;
    };
    return function() {
        var args = Array.prototype.join.call(arguments, ',');
        if (args in cache) {
            return cache[args];
        }

        return cache[args] = calculate.apply(null,arguments);
    }
})();
//延续局部变量的寿命
var report = function(src){
    var img = new Image();
    img.src = src;
};
report("http://xxx.com/getUserInfo");

var report = (function(){
    var imgs = [];
    return function(src){
        var img = new Image();
        imgs.push(img);
        img.src= src;
    }
})();

var extent =function(){
    var value =0;
    return {
        call:function(){
            value++;
            console.log(value);
        }
    }
};
var extent = extent();
extent.call();
extent.call();
extent.call();

//面向对象
var extent = {
    value:0,
    call:function(){
        this.value++;
        console.log(this.value);
    }
};
extent.call();
extent.call();
extent.call();
//或者
var Extent = function(){
    this.value = 0;
};
Extent.prototype.call= function(){
    this.value++;
    console.log(this.value);
};
var extent = new Extent();
extend.call();
extend.call();
extend.call();
/**用闭包实现命令模式****/
// <button id="execute">点击我执行命令</button>
//  <button id="undo">点击我执行命令</button> 

//对象版命名模式
var Tv ={
    open:function(){
        console.log("打开电视机");
    },
    close:function(){
        console.loh("关闭电视");
    }
};
var OpenTvCommand = function(receiver){
    this.receiver=receiver;
};
OpenTvCommand.prototype.execute = function(){
    this.receiver.open();
};
OpenTvCommand.prototype.undo = function(){
    this.receiver.close()
};
var setCommand = function(command){
    document.getElementById('execute').onclick = function(){
        command.execute();
    }
    document.getElementById("undo").onclick=function(){
        command.undo();
    }
};
setCommand(new OpenTvCommand(Tv));

//闭包版命令模式
var Tv ={
    open:function(){
        console.log("打开电视机");
    },
    close:function(){
        console.loh("关闭电视");
    }
};

var createCommand=function(receiver){
    var execute=function(){
        return receiver.open();
    }
    var undo=function(){
        return receiver.close();
    }
    return {
        execute:execute,
        undo:undo
    }
};
var setCommand=function(command){
    document.getElementById("execute").onclick=function(){
        command.execute();
    }
    document.getElementById("undo").onclick=function(){
        command.undo();
    }
};
setCommand(createCommand(Tv));

/*3.2.1 高阶函数*/
//函数作为参数回调

//回调函数
/*创建100div，并将它们隐藏*/
var appendDiv = function(){
    for(var i=0;i<10;i++){
        var div = document.createElement('div');
        div.innerHTML=i;
        document.body.appendChild(div);
        div.style.display='none';
    }
};
appendDiv();

var appendDiv = function(callback){
    for(var i=0;i<10;i++){
        var div= document.createElement('div');
        div.innerHTML=i;
        document.body.appendChild(div);
        if(typeof callback==='function'){
            callback(div);
        }
    }
};
appendDiv(function(node){
    node.style.display='none';
});
/*Array,prototype.sort*/
[1,4,3].sort(function(a,b){
    return a-b;
});
[1,4,3].sort(function(a,b){
    return b-a;
})

var isString = function(obj){
    return Object.prototype.toString.call(obj)==='[bject String]';
};
var isArray=function(obj){
    return Object.prototype.toString.call(obj)==='[object Array]';
};
var isNumber = function(obj){
    return Object.prototype.toString.call(obj)==='[object Number]';
};

//改写
var isType = function(type){
    return function(obj){
        return Object.prototype.toString.call(obj)==='[object'+type+']';
    }
};
var isString = isType('String');
var isArray = isType('Array');
var isNumber = isType('Number');
console.log(isArray([1,2,3]));

//getSingle
var getSingle = function(fn){
    var ret;
    return function(){
        return ret || (ret = fn.apply(this,arguments));
    };
};
var getScript = getSingle(function(){
    return document.createElement("script");
});
var script1 = getScript();
var script2 = getScript();
console.log(script1===script2);

//高阶函数实现AOP
Function.prototype.before = function(beforefn){
    var _self = this;//保存原函数引用
    return function(){//返回包含了原函数和新函数的“代理”函数
        beforefn.apply(this,arguments);//执行新函数，修正this
        return _self.apply(this,arguments);//执行原函数
    }
};
Function.prototype.after = function(after){
    var _self = this;
    return function(){
        var ret =  _self.apply(this,arguments);
        after.apply(this,arguments);
        return ret;
    }
};
var func = function(){
    console.log(2);
};
func = func.before(function(){
    console.log(1);
}).after(function(){
    console.log(3);
});
func();//1,2,3

/***********************高阶函数其他应用**********/
//1.currying 函数柯里化
var monthCost = 0;
var cost = function(money){
    monthCost+=money;
};
cost(100);
cost(200);
cost(300);
console.log(monthCost);//600

var monthCost = 0;
var cost = function(money) {
    monthCost += money;
};
cost(100);
cost(200);
cost(300);
console.log(monthCost);
var cost = (function() {
    var args = [];
    return function() {
        if (arguments.length === 0) {
            var money = 0;
            for (var i = 0, l = arguments.length; i < l; i++) {
                money += arguments[i];
            }
            return money;
        } else {
            [].push.apply(args, arguments);
        }
    }
})();
cost(100);
cost(200);
cost(300);
console.log(cost());
//通用的currying
var currying = function(fn){
    var args = [];
    return function(){
        if(arguments.length==0){
            return fn.apply(this,args);

        }else{
            [].push.apply(args,arguments);
            return arguments.callee;

        }
    }
};
var cost = (function(){
    var money =0;
    return function(){
        for(var i = 0,l = arguments.length;i<l;i++){
            money+=arguments[i];
        }
        return money;
    }
})();
var cost =currying(cost);
cost(100);
cost(200);
cost(300);
console.log(cost());

//uncurrying
var obj1 = {
    name:'sven'
};
var obj2 = {
    getName:function(){
        return this.name;
    }
};
console.log(obj2.getName.call(obj1));//输出sven
(function(){
    Array.prototype.call(arguments,4);
    console.log(arguments);
})(1,2,3);

//uncurrying
Functionn.prototype.uncurrying =function(){
    var self =this;
    return function(){
        var obj =Array.prototype.shift.call(arguments);
        return self.apply(obj,arguments);
    }
}

var push = Array.prototype.push.uncurrying();
(function(){
    push(arguments,4);
    console.log(arguments);
})(1,2,3);

for(var i= 0,fn,ary=['push','shift','forEach'];fn=ary[i++];){
    Array[fn] = Array.prototype[fn].uncurrying();
};
var obj = {
   "length":3,
   "0":1,
   "1":2,
   "2":3
};
Array.push(obj,4);
console.log(obj.length);

var first =Array.shift(obj);
console.log(first);
console.log(obj);
Array.forEach(obj,function(i,n){
    console.log(n);
});
//uncurrying实现的另一种方式
Function.prototype.uncurrying = function(){
    var self =this;
    return function(){
        return Function.prototype.call.apply(self,arguments);
    }
};

//函数节流
var throttle = function(fn,interval){
    var __self = fn,//保存需要被延迟执行的函数应用
        timer,    //定时器
        firstTime = true;   //是否是第一次调用

        return function(){
            var args = arguments,
            __me = this;
        if(firstTime){
            __self.apply(__me,args);
            return firstTime = false;
        }
        if(timer){
            return false;
        }
           timer =setTimeout(function(){
            clearTimeout(timer);
            timer = null;
            __self.apply(__me,args);
        },interval||500);
      };   
};
window.onresize = throttle(function(){
    console.log(1);
},500);

//分时函数
var ary = [];
for(var i=1;i<=1000;i++){
    ary.push(i);
};
var renderFriendList = function(data){

    for(var i =0,l =data.length;i<l;i++){
        var div = document.createElement('div');
        div.innerHTML = i;
        document.body.appendChild(div);
    }
};
renderFriendList(ary);

//改进
var timeChunk = function(ary,fn,count){
    var obj,
        t;
    var len = ary.length;
    var start = function(){
        for(var i=0;i<Math.min(count||1,ary.length);i++){
            var obj =ary.shift();
            fn(obj);
        };

        return function(){
            t = setInterval(function(){
                if(ary.length === 0){
                    return clearInterval(t);
                }
                start();
            },200);//分批执行时间间隔
        };
    };

};
var ary = [];
for(var i=1;i<=100;i++){
    ary.push(i);
};

var renderFriendList = timeChunk(ary,function(n){
    var div =  document.createElement("div");
    div.innerHTML = n;
    document.body.appendChild(div);
},8);
renderFriendList();

//5.0 懒惰加载函数
//第一种
var addEvent = function(elem,type,handle){
    if(window.addEventListener){
        return elem.addEventListener(type,handle,false);
    }
    if(window.attachEvent){
        return elem.attachEvent("on"+type,handle);
    }
};
//第二种方案
var addEvent = (function(){
    if(window.addEventListener){
        return function(elem,type,handle){
            elem.addEventListener(type,handle,false);
        }
    }
    if(window.attachEvent){
        return function(elem,type,handle){
            elem.addEventListener("on"+type,handle);
        }
    }
})();
//第三种
/*
<div id="div1">点我绑定事件</div>
*/
var addEvent = function(elem,type,handle){
    if(window.addEventListener){
        addEvent = function(elem,type,handle){
            elem.addEventListener(type,handle,false);
        }
    }else if(window.attachEvent){
        addEvent = function(elem,type,handle){
            elem.attachEvent('on'+type,handle);
}
    }
    addEvent(elem,type,handle);
};

var div1 = document.getElementById('div1');

addEvent(div,'click',function(){
    console.log(1);
});
addEvent(div,'click',function(){
    console.log(2);
});


