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