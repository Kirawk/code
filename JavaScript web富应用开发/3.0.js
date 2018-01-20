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