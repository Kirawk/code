/*****************单例模式*********************/
var Singleton = function(name) {
    this.name = name;
    this.instance = null;
};
Singleton.prototype.getName = function() {
    alert(this.name);
}
;
Singleton.getInstance = function(name) {
    if (!this.instance) {
        this.instance = new Singleton(name);
    }
    return this.instance;
}
;
var a = Singleton.getInstance('sven1');
var b = Singleton.getInstance('sven2');
alert(a === b);
// true 
//或者
var Singleton = function(name) {
    this.name = name;
};
Singleton.prototype.getName = function() {
    alert(this.name);
}
;
Singleton.getInstance = (function() {
    var instance = null;
    return function(name) {
        if (!instance) {
            instance = new Singleton(name);
        }
        return instance;
    }
})();
var a = Singleton.getInstance('sven1');
var b = Singleton.getInstance('sven2');
alert(a === b);
// true 

/*透明的单例模式*/

var CreateDiv = function(html) {
    this.html = html;
    this.init();
};
CreateDiv.prototype.init = function() {
    var div = document.createElement('div');
    div.innerHTML = this.html;
    document.body.appendChild(div);
    console.log(div);
};

//引入代理类ProxySingletonCreateDiv;
var ProxySingletonCreateDiv = (function() {
    var instance;
    return function(html) {
        if (!instance) {
            instance = new CreateDiv(html);
        }
        return instance;
    }
})();
var a = new ProxySingletonCreateDiv('sven1');
var b = new ProxySingletonCreateDiv('sven2');
console.log(a === b);

/*******javascript中的单例模式*******/
//使用命名空间
var namespace1 = {
    a: function(){
        console.log(1);
    },
    b:function(){
        console.log(2);
    }
};
//动态创建命名空间
var MyApp = {};
MyApp.namespace = function(name){
    var parts = name.split('.');
    var current =MyApp;
    for(var i in parts){
        if(!current[parts[i]]){
            current[parts[i]] = {};
        }
        current = current[parts[i]];
    }
};
MyApp.namespace('event');
MyApp.namespace('dom.style');

console.dir(MyApp);

//使用闭封装私有变量
var user = (function(){
    var _name = 'sven',
       _age = 29;

       return {
           getUserInfo: function(){
               return _name +'-'+_age;
           }
       }
})();

//惰性单例
Singleton.getInstance = (function(){
    var instance = null;
    return function(name){
        if(!instance){
            instance = new Singleton(name);
        }

        return instance;
    }
})();

var getSingle = function(fn){
    var result;
    return function(){
        return result||(result = fn.apply(this,arguments));
    }
}
var createLoginLayer = function(){
    var div = document.createElement('div');
    div.innerHTML = "我是登录浮窗";
    div.style.display = 'none';
    document.body.appendChild(div);
};

var createSingleLoginLayer = getSingle(createLoginLayer);
document,getElementById('loginBtn').onclick = function(){
    var loginLayer = createSingleLoginLayer();
    loginLayer.style.display = 'block';
};
//创建唯一的iframe
var createSingleIframe = getSingle(function(){
    var iframe = document.createElement('iframe');
    document.body.appendChild(iframe);
    return iframe;
});

document.getElementById('loginBtn').onclick = function(){
    var  loginLayer = createSingleIframe();
    loginLayer.src ='http://baicu.com';
}
//jQuery绑定one事件
var bindEvent = function(){
    $('div').one('click',function(){
        alert('click');
    });
};
var render = function(){
    console.log('开始渲染列表');
    bindEvent();
};
render();
render();
render();
//使用getSingle函数
var bindEvent = getSingle(function(){
    document.getElementById('div1').onclick = function(){
        console.log('click');
    }
    return true;
});
var render = function(){
    console.log('开始渲染列表');
    bindEvent();
}
render();
render();
render();