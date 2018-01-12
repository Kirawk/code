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
  