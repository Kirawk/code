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