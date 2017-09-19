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


/*发布-订阅模式通用版*/
var event ={
    clientList:[],
    listen: function(key,fn){
        if(!this.clientList[key]){
            this.clientList[key]=[];
        }
        this.clientList[key].push[fn];
    },
    trigger:function(){
        var key=Array.prototype.shift.call(arguments),
        fns = this.clientList[key];
        if(!fns||fns.length===0){
            return false;
        }
        for(var i=0,fn;fn=fns[i++];){
            fn.apply(this,arguments);
        }
    }
};
var installEvent = function(obj){
    for(var i in event){
        obj[i]=event[i];
    }
};
var salesOffices={};
installEvent(salesOffices);
salesOffices.listen( 'squareMeter88', function( price ){ // 小明订阅消息
 console.log( '价格= ' + price );
});
salesOffices.listen( 'squareMeter100', function( price ){ // 小红订阅消息
 console.log( '价格= ' + price );
});
salesOffices.trigger( 'squareMeter88', 2000000 ); // 输出：2000000
salesOffices.trigger( 'squareMeter100', 3000000 ); // 输出：3000000 

/*取消订阅的事件*/
event.remove = function(key,fn){
    var fns = this.clientList[key];
    if(!fns){
        return false;
    }
    if(!fn){
        fns &&(fns.length=0);
    }else{
        for(var l=fns.length-1;l>=0;l--){
            var _fn = fns[l];
            if(_fn===fn){
                fns.splice(l,1);
            }
        }
    }
};
var salesOffices = {};
var installEvent = function( obj ){
 for ( var i in event ){
 obj[ i ] = event[ i ];
 }
}
installEvent( salesOffices );
salesOffices.listen( 'squareMeter88', fn1 = function( price ){ // 小明订阅消息
 console.log( '价格= ' + price );
});
salesOffices.listen( 'squareMeter88', fn2 = function( price ){ // 小红订阅消息
 console.log( '价格= ' + price );
});
salesOffices.remove( 'squareMeter88', fn1 ); // 删除小明的订阅
salesOffices.trigger( 'squareMeter88', 2000000 ); // 输出：2000000 

/*真实例子-网站登录*/
$.ajax('http://xx.com?login',function(data){
    login.trigger('loginSucc',data);
});
var header = (function(){
    login.listen('loginSucc',function(data){
        header.setAvatar(data.avatar);
    });
    return {
        setAvatar:function(data){
            console.log('设置header模块的头像');
        }
    }
})();
var nav = (function(){
   login.listen('loginSucc',function(data){
       nav.setAvatar(data.avatar);
   });
   return{
       setAvatar:function(avatar){
           console.log("设置nav模块的头像");
       }
   }
})();
var address = (function(){ // nav 模块
 login.listen( 'loginSucc', function( obj ){
 address.refresh( obj );
 });
 return {
 refresh: function( avatar ){
 console.log( '刷新收货地址列表' );
 }
 }
})();

