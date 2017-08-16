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
