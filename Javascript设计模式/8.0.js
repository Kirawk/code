/*发布订阅模式*/
var salesOffices = {};//定义售楼
salesOffices.clientList = [];//缓存列表，存放订阅者的回调函数
salesOffices.listen = function(fn){
    this.clientList.push(fn);//订阅消息添加进缓存列表
};
salesOffices.trigger = function(){
    for(var i=0,fn;fn=this.clientList[i++];){
        fn.apply(this,arguments);
    }
};
salesOffices.listen(function(price,squareMeter){
    console.log('价格='+price);
    console.log('squareMeter='+squareMeter);
});
salesOffices.listen(function(price,squareMeter){
    console.log('价格='+price);
    console.log('squareMeter='+squareMeter);
});
salesOffices.trigger(200000,88);
salesOffices.trigger(300000,100);