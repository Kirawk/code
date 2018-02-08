/**
 * 控制器和状态
 */
(function(){
/**
 * 
 */
})();

(function($){
/** */
})(jQuery);

//全局导出
(function($,exports){
exports.Foo = 'wem';
})(jQuery,window);

//添加少量上下文
(function(){
   var mod = {};
   mod.contextFunction = function(){
       assertEqual(this,mod);
   };
   mod.contextFunction();
})();

(function($){
 var mod = {};
 mod.load = function(func){
     $($.proxy(func,this));
 };
 mod.load(function(){
     this.view = $("#view");
 });
 mod.assetsClick = function(e){
     //处理点击
 };
 mod.load(function(){
   this.view.find(".assets").click(
       $.proxy(this,assetsClick,this)
   );
 });
})(jQuery)

/*
*抽象出库
*/
(function($,exports){
var mod = function(includes){
  if(includes) this.includes(includes);
};
mod.fn = mod.prototype;
mod.fn.proxy = function(func){
    return $.proxy(func,this);
};
mod.fn.proxy = function(func){
    return $.proxy(func,this);
};
mod.fn.load = function(func){
    $(this.proxy(func));
};
mod.fn.include = function(ob){
    $.extend(this,ob);
};
exports.Controller = mod;
})(jQuery,window);

(function($,Controller){
var mod = new Controller;
mod.toggleClass = function(e){
    this.view.toggleClass("over",e.data);
};
mod.load(function(){
    this.view = $("#view");
    this.view.mouseover(this.proxy(this.toggleClass),true);
    this.view.mouseout(this.proxy(this.toggleClass),false);
});
})(jQuery,Controller);

Controller.fn.unload = function(func){
    jQuery(window).bind("unload",this.proxy(true));
};

var mod = new Controller();
mod.include(StateMachine);

//文档加载完成后载入控制器
var exports = this;
(function(){
var mod = {};
mod.create = function(includes){
var result = function(){
    this.init.apply(this,arguments);
};
result.fn = result.prototype;
result.fn.init = function(){};

result.proxy = function(func){
    return $.proxy(func,this);
};
result.fn.proxy = result.proxy;
result.include = function(ob){
    $.extend(this.fn,ob);
};
result.extend = function(ob){
    $.extend(this,ob);
};
if(includes) result.include(includes);
return result;
};
exports.Controller = mod;
})(jQuery)
jQuery(function($){
    var ToggleView = Controller.create({
        init:function(view){
            this.view = $(view);
            this.view.mouseover(this.proxy(this.toggleClass),true);
            this.view.mouseout(this.proxy(this.toggleClass),false);
        },
        toggleClass:function(e){
            this.view.toggleClass("over",e.data);
        }
    });
    new ToggleView("#view");
});

/**
 * 访问视图
 */
//....
inti:function(view){
    this.view = $(view);
    this.form = this.view.find("form");
}
/*
elements: {
    "form.searchForm": "searchForm", 
    "form input[type=text]": "searchInput"
}
*/
var exports = this;
jQuery(function($){
    exports.SearchView = Controller.create({
        //选择器到局部变量名的映射
        elements:{
            "input[type=seach]":"searchInput",
            "form":"searchForm"
        },
        //实例化调用
        init:function(element){
            this.el = $(element);
            this.refreshElements();
            this.searchForm.submit(this.proxy(thiss.search);
        },
        search: function () {
            console.log("Searching:", this.searchInput.val());
        },
            // 私有
            
    });
});
