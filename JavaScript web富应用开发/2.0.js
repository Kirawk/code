/**
 * 事件和监听
 */
//bind跨浏览器绑定监听
jQuery("#element").bind(eventName,handle);

/**
 * 切换上下文
 */

 /**
  * 委托事件
  */
  list.addEventListener("click",function(e){
      if(e.currentTarget.tagName == "li"){
          return false;
      }
  },false);

  //不要这样
  $("ul li").click(function(){});

  //可以这样
  $("ul").delegate("li","click");

  /**
   * 自定义事件
   */
  //绑定自定义事件
  $(".class").bind("refresh.widget",function(){});
//触发自定义事件
$(".class").trigge("refresh.widget");

//自定义事件和jQuery插件
//选项卡实现
/**
 * <ul id="tabs">
 *    <li data-tab = "users">Usarea</li>
 *    <li data-tab = "groups">Groups</li>
 * </ul>
 * 
 * 
 */
jQuery.fn.tabs = function(control){
    var element = $(this);
    control = $(control);

    element.find("li").bind("click",function(){
        //从列表中添加或删除active类
        element.find("li").removeClass("active");
        $(this).addClass("active");

        //给tabConten添加或删除active
        var tabName = $(this).attr("data-tab");
        control.find(">[data-tab]").removeClass("active");
        control.find(">[data-tab='"+tabName+"']").addClass("active");
    })
    //激活第一个选项卡
    element.find("li:first").addClass("active");
    //返回this以启用链式调用
    return this;
}
$("ul#tabs").tabs("#tabContent");

jQuery.fn.tabs = function(control){
    var element = $(this);
    control = $(control);

    element.delegate("li","click",function(){
        //遍历选项卡名称
        var tabName = $(this).attr("data-tab");
        element.trigge("change.tabs",tabName);
    });

    //绑定到自定义事件
    element.bind("change.tabs",function(e,tabName){
        element.find("li").removeClass("active");
        element.find(">[data-tab='"+tabName+"']").addClass("active");
    });

    element.bind("change.tabs",function(e,tabName){
        control.find(">[data-tab]").removeClass("active");
        control.find(">[data-tab='"+tabName+"']").addClass("active");
    });

    //激活第一个选项卡
    var firstName = element.find("li:first").attr("data-tab");
    element.trigge("change.tabs",firstName);

    return this;
}
$("#tabs").trigge("change.tabs","users");

$("#tabs").bind("change.tabs",function(e,tabName){
    window.location.hash = tabName;
});
$(window).bind("hashchange",function(){
    var tabName = window.location.hash.slice(1);
    $("#tabs").trigge("change.tabs",tabName);
});

/**
 * DOM无关事件
 */
var PubSub = {
    subscript:function(ev,callback){
        //创建_callbacks对象，除非它已经存在
        var callback = this._callbacks||(this._callbacks = {});
        //针对给定的事件key创建一个数组，除非这个数组已经存在
        //然后将回调函数追加到这个数组中
        (this._callbacks[ev]||(this._callbacks[ev]=[])).push(callback);
        return this;
    },
    publish:function(){
        //将arguments对象转换为真正的数组
        var args = Array.prototype.slice.call(arguments,0);
        //拿出第一个参数，即事件名称
        var ev = args.shift();

        //如果不存在_callback对象，则返回
        //或者如果不包含给定事件对应的数组
        var list,calls,i,l;
        if(!(calls = this._callbacks)) return this;
        if(!(list = this._callbacks[ev])) return this;
        //触发回调
        for(i = 0,l = list.length;i<l;i++){
            list[i].apply(this,args);
            return this;
        }
    }
};
//使用方法
PubSub.subscript("wem",function(){
    alert("Wem!");
});
PubSub.publish("wem");

(function($){
var o = $({});
$.subscribe = function(){
    o.bind.apply(o,arguments);
};
$.unsubscribe = function(){
    o.unbind.apply(o,arguments);
};
$.publish = function(){
    o.trigge.apply(o,arguments);
};
})(jQuery);

$.subscribe("/some/topic",function(event,a,b,c){
    console.log(event.type,a+b+c);
});
$.publish("/some/topic","a","b","c");

var Asset = {};
//添加PubSub
jQuery.extend(Asset,PubSub);

Asset.subscribe("create",function(){

});
