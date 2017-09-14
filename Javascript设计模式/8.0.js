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

//改写上述例子
var salesOffices = {};
salesOffices.clientList = {};
salesOffices.listen = function(key, fn) {
    if ((!this.clientList[key]) ) {
        this.clientList[key] = [];
    }
    this.clientList[key].push(fn);
};
salesOffices.trigger = function() {
    var key = Array.prototype.shift.call(arguments)
      , fns = this.clientList[key];
    if (!fns || fns.length === 0) {
        return false;
    }
    for (var i = 0, fn; fn = fns[i++]; ) {
        fn.apply(this, arguments);
    }
};
salesOffices.listen('squareMeter88', function(price) {
    // 小明订阅 88 平方米房子的消息
    console.log('价格= ' + price);
    // 输出： 2000000
});
salesOffices.listen('squareMeter110', function(price) {
    // 小红订阅 110 平方米房子的消息
    console.log('价格= ' + price);
    // 输出： 3000000
});
salesOffices.trigger('squareMeter88', 2000000);
salesOffices.trigger('squareMeter110', 3000000);
