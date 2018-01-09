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

/**
 *基于原型的类继承 
 */
var Animal = function(){};
Animal.prototype.breath = function(){
    console.log("breath");
};
var Dog = function(){};

//Dog继承了Animal;
Dog.prototype = new Animal;
Dog.prototype.wag = function(){
    console.log("wag tail");
};

var dog = new Dog;
dog.wag();
dog.breath();//继承的属性

/**
 * 给类库添加继承
 */
var Class = function(parent){
    var klass = function(){
        this.init.apply(this,arguments);
    };
    //改变klass的原型
    if(parent){
        var subclass = function(){};
        subclass.prototype = parent.prototype;
        klass.prototype = new subclass;
    };
    klass.prototype.init = function(){};

    //定义别名
    klass.fn = klass.prototype;
    klass.fn.parent = klass;
    klass._super = klass.__proto__;
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

var Animal = new Class;
Animal.include({
    breath:function(){
        console.log("breath");
    }
});

var Cat = new Class(Animal);

var tommy = new Cat;
tommy.breath();

/**
 * 函数调用
 */
//理解call与apply
$('.clicky').click(function(){
    //thisz指向当前节点
    $(this).hide();
});

$('p').each(function(){
    //this指向本次迭代
    $(this).remove();
});

var clicky = {
    wasClicked: function(){

    },
    addListeners: function(){
        var self = this;
        $('.clicky').click(function(){
            self.wasClicked()
        });
    }
};
clicky.addListeners();

var proxy = function(func,thisObject){
    return(function(){
        return func.apply(thisObject,arguments);
    });

};
var clicky = {
    wasClicked:function(){
    },
    addListeners:function(){
        var self = this;
        $('.clickky').click(proxy(this.wasClicked,this));
    }
};
var App = {
    log:function(){
        if(typeof console == "undefined") return;
        var args = jQuery.makeArray(arguments);
        // 插入一个新的参数
        args.unshift("(App)");

        //委托给console
        console.log.apply(console,args);
    }
};

/**
 * 控制类库的作用域
 */
var Class = function(parent){
    var klass = function(){
        this.init.apply(this,arguments);
    };
    klass.prototype.init = function(){};
    klass.fn = klass.prototype;

    //添加一个proxy函数
    klass.proxy = function(func){
        var self = this;
        return (function(){
            return func.apply(self,arguments);
        });
    }

    //在实例中也添加这个函数
    klass.fn.proxy = klass.proxy;
    return klass;
};
var Button = new Class;
Button.include({
    init:function(element){
        this.element = jQuery(element);

        //代理了这个click函数
        this.element.click(this.proxy(this.click));
    },
    click: function(){}
});
//使用bind绑定
Button.include({
    init:function(element){
        this.element = jQuery(element);

        //绑定这个click函数
        this.element.click(this.click.bind(this));
    },
    click:function(){}
});

if(!Function.prototype.bind){
    Function.prototype.bind = function(obj){
        var slice = [].slice,
        args = slice.call(arguments,1),
        self = this,
        nop = function(){},
        bound = function(){
            return self.apply(this instanceof nop?this:(obj||{}),args.concat(slice.call(arguments)));
        };
        nop.prototype = self.prototype;
        bound.prototype = new nop();
        return bound;
    };
}
/**
 * 添加私有函数
 */
