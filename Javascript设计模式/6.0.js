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
