/**
 * mvc和类
 */
/**
 * 模型
 */

//bad
var user = users["foo"];
destroyUser(user);
//good
var user = User.find("foo");
user.destroy();

/**
 * 视图
 */
//<div>  bad
<script>
function formatData(date) {
    /** */
};
</script>
//${formaatDate(this.date)}
//</div>

//good help.js
var help = {};
help.formatDate = function(){

};

/**
 * 控制器
 */
var Controller = {};
//使用匿名函数来封装一个作用域
(Controller.users = function($){
    var nameClick = function(){
        /** */
    };
    //在页面加载时绑定事件监听
    $(function(){
        $("#view .name").click(nameClick);
    });
})(jQuery);


/**
 * 向模块化进军，创建类
 */
var Person = function(name){
    this.name = name;
};
var  alice = new Person("alice");

var Class = function(){
    var klass = function(){
        this.init.apply(this,arguments);
    };
    klass.prototype.init = function(){};
    return klass;
};
var Person = new Class;
Person.prototype.init = function(){
    //给予Person的实例做初始化
};
var person = new Person;

//给类添加函数
Person.find = function(id){};
var person = Person.find(1);
Person.prototype.breath = function(){};
var person = new Person();
person.breath();

Person.fn = Person.prototype;
Person.fn.run = function(){};

/**
 * 给类库添加方法
 */
var Person = new Class;
//直接给类添加静态方法
Person.find = function(id){};
//可以直接调用
var person = Person.find(1);

var Person = new Class;
Person.prototype.save = function(id){};
var person = new Person;
person.save();

//改进上述代码
var Class = function(){
    var klass = function(){
        this.init.apply(this,arguments);
    };
    klass.prototype.init = function(){};
    //定义prototype的别名
    klass.fn = klass.prototype;
    //定义类的别名
    klass.fn.parent = klass;
    
    //给类添加属性
    klass.extend = function(obj){
        var extended = obj.extended;
        for(var i in obj){
            klass[i] = obj[i];
        }
        if(extended) extended(klass);
    };

    //给实例添加属性
    klass.include = function(obj){
        var included = obj.included;
        for(var i in obj){
            klass.fn[i] = obj[i];
        }
        if(included) included(klass)
    };
    return klass;
};

var Person = new Class;
Person.extend({
    find: function(id){},
    exists: function(id){}
});
var person = Person.find(1);

var Person = new Class;
Person.include({
    save: function(id){},
    destroy:function(id){}
});
var person = new Person;
person.save();

Person.extended({
    extended:function(klass){
        console.log(klass,"was extended!");
    }
});
