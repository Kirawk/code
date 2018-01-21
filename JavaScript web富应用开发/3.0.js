/**
 * 模型和数据
 */
var User = {
    records:[],
    fetchRemote:function(){}
};
var user = new User;
user.destroy();

var User = function(attrs){
    this.attributes = attrs || {};
};
User.prototype.destroy = function(){
    /** */
};
User.fetchRemote = function(){
    /** */
};
//构建对象关系映射(ORM)
//原型继承
if(typeof Object.create!="function"){
    Object.create = function(o){
        function F(){};
        F.prototype = o;
        return new F();
    };
}
var Modal = {
    inherited: function(){},
    created:function(){},
    prototype:{
        init:function(){}
    },
    create:function(){
        var object = object.create(this);
        object.parent = this;
        object.prototype = object.fn = Object.create(this.prototype);

        object.created();
        this.inherited(object);
        return object;
    },
    init:function(){
        var instance = Object.create(this.prototype);
        instance.parent = this;
        instance.init.apply(instance,arguments);
        return instance;
    }
};
var Asset = Modal.create();
var User = Modal.create();

var user = User.init();

/**
 * 添加ORM属性
 */
jQuery.extend(Modal,{
    find:function(){}
});
