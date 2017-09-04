/*代理模式*/
/*************6.1案例一*******/
var Flower = function(){};
var xiaoming ={
    sendFlower:function(target){
        var flower = new Flower();
        target.receiveFlower(flower);
    }
};
var A ={
    receiveFlower:function(flower){
        console.log('收到花'+flower);
    }
};
xiaoming.sendFlower(A);
//引入代理B：xiaoming->B->A
var Flower = function(){};
var xiaoming ={
    sendFlower:function(target){
        var flower =new Flower();
        target.receiveFlower(flower);
    }
};
var B = {
    receiveFlower:function(flower){
        A.receiveFlower(flower);
    }
};
var A = {
    receiveFlower:function(flower){
        console.log('收到花'+flower);
    }
};
xiaoming.sendFlower(B);
/***************情景二******************/
var Flower = function(){};
var xiaoming ={
    sendFlower:function(target){
        var flower =new Flower();
        target.receiveFlower(flower);
    }
};
var B ={
    receiveFlower:function(flower){
        A.listenGoodMood(function(){
           A.receiveFlower(flower); 
        });
    }
};
var A = {
    receiveFlower:function(flower){
        console.log('收到花'+flower);
    },
    listenGoodMood:function(fn){
        setTimeout(function(){//假设10秒后心情变好
        fn();
        },5000)
    }
};
xiaoming.sendFlower(B);

/**6.3虚拟代理之实现图片预加载**/
var myImage =(function(){
    var imgNode = document.createElement('img');
    document.body.appendChild(imgNode);
    return {
        setSrc:function(src){
            imgNode.src=src;
        }
    }
})
myImage.setSrc("http://web.1meeting.cn/Upload/Place/2017-08-10/598c16844c2bd.png");

//引入代理
var proxyImage = (function(){
    var img = new Image;
    img.onload= function(){
        myImage.setSrc(this.src);
    }
    return{
        setSrc:function(src){
            myImage.setSrc("file:// /D:/1.jpg");
            img.src= src;
        }
    }
})();
proxyImage.setSrc("http://web.1meeting.cn/Upload/Place/2017-08-10/598c16844c2bd.png");

/**6.5本体接口**/
var myImage = (function(){
    var imgNode = document.createElement('img');
    document.body.appendChild(imgNode);

    return function(src){
        imgNode.src = src;
    }
})();
var proxyImage = (function(){
    var img = new Image;
    img.onload = function(){
        myImage(this.src);
    }
    return function(src){
        myImage('file://');
        img.src = src;
    }
})();
proxyImage('http://web.1meeting.cn/Upload/Place/2017-08-10/598c16844c2bd.png');

/*虚拟代理合并http请求*/
var synchronousFile = function(id){
    console.log('开始同步文件'+id);
};
var checkbox = document.getElementByTagName('input');
for(var i= 0,c;c=checkbox[i++];){
    c.onclick = function(){
        if(this.checked === true){
            synchronousFile(this.id);
        }
    }
};

//改进上述代码
var synchronousFile = function( id ){
 console.log( '开始同步文件，id 为: ' + id );
}; 
var proxySynchronousFile = (function(){
 var cache = [], // 保存一段时间内需要同步的 ID
 timer; // 定时器
 return function( id ){
 cache.push( id );
 if ( timer ){ // 保证不会覆盖已经启动的定时器
 return;
 }
 timer = setTimeout(function(){
 synchronousFile( cache.join( ',' ) ); // 2 秒后向本体发送需要同步的 ID 集合
 clearTimeout( timer ); // 清空定时器
 timer = null;
 cache.length = 0; // 清空 ID 集合
 }, 2000 );
 }
})(); 

/*********6.8缓存代理*******/
//计算乘积
var mult = function(){
    console.log("开始计算乘积");
    var a=1;
    for(var i =0,l = arguments.length;i<l;i++){
        a = a*arguments[i];
    }
    return a;
};
mult(2,3);//6
mult(2,3,4);//24
//加入缓存代理函数
var proxyMult = (function(){
    var cache = {};
    return function(){
        var args = Array.prototype.join.call(arguments,',');
        if(args in cache){
            return cache[args];
        }
        return cache[args] = mult.apply(this,arguments);
    }
})();
proxyMult(1,2,3,4);
proxyMult(1,2,3,4);

//用于ajax异步请求数据：网站中的分页

/*6.9高阶函数动态创建代理*/
//计算乘积
var mult = function(){
    var a = 1;
    for(var i=0,l=arguments.length;i<l;i++){
        a=a*arguments[i];
    }
    return a;
};
//计算加和
var plus = function(){
    var a = 0;
    for(var i=0,l=arguments.length;i<l;i++){
        a = a+arguments[i];
    }
    return a;
};
/****************创建缓存代理工厂********************/
var createProxyFactory = function(fn){
    var cache = {};
    return function(){
        var args =Array.prototype.join.call(arguments,',');
        if(args in cache){
            return cache[args];
        }
        return cache[args] = fn.apply(this,arguments);
    }
};
var proxyMult = createProxyFactory(mult);
proxyPlus =createProxyFactory(plus);
console.log(proxyMult(1,2,3,4));
console.log(proxyPlus(1,2,3,4));

/**6.10 其他代理模式***/

