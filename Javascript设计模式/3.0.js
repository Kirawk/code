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