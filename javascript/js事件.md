##事件

#### 什么是事件?

#### 事件流
描述的是从页面中接受事件的顺序；
IE：事件冒泡流：从最底层的开始向上传递；
N：事件捕获：从最顶层开始往下传递；


- 冒泡事件：从下往上冒泡；
这个针对的是IE浏览器
- 事件捕获：从上往下冒泡；
##事件的处理程序
- html事件处理程序
将事件直接绑定在html标签上
缺点：代码耦合性太高；
```
<input type="button" value="按钮"  id="btn" onclick="showmessage()"/> 
 function showmessage(){
    alert("HTML事件");
    }
```
- DOM0级事件处理程序
把一个函数赋值给一个事件的处理程序属性。
```
<input type="button" value="按钮2"  id="btn2" /> 
 var btn2=document.getElementById("btn2");
btn2.onclick=function(){
        alert("这是DOM0级事件处理程序 ");
  }  
```
- DOM2事件处理程序
 “DOM2级事件”定义了两个方法，用于处理指定和删除事件处理程序的操作：addEventListener()
和removeEventListener()。
接受3 个参数：要处
理的事件名、作为事件处理程序的函数和一个布尔值。最后这个布尔值参数如果是true，表示在捕获
阶段调用事件处理程序；如果是false，表示在冒泡阶段调用事件处理程序。  
```  
<input type="button" value="按钮3"  id="btn3" /> 
 var btn3=document.getElementById("btn3");
btn3.addEventListener("click",showmessage,false);
btn3.removeEventListener("click",showmessage,false);  
```
- IE事件处理程序
IE 实现了与DOM 中类似的两个方法：attachEvent()和detachEvent()。这两个方法接受相同
的两个参数：事件处理程序名称与事件处理程序函数。由于IE8 及更早版本只支持事件冒泡，所以通过
attachEvent()添加的事件处理程序都会被添加到冒泡阶段。 
```
var btn4=document.getElementById("btn4"); 
btn4.attachEvent('onclick',showmessage);
btn4.detachEvent('onclick',showmessage);
```
-  跨浏览器事件处理程序
主要用来检测浏览器的能力
a={}相当于 a = new Object();
```
var eventUtil={
                addHandler:function(element,type,handler){
                    
                    if(element.addEventListener){
                        element.addEventListener(type,handler,false);
                    }else if(element.attachEvent){
                        element.attachEvent('on'+type,handler);
                    }else{
                        element['on'+type]=handler;
                    }
                },
                removeHandler:function(element,type,handler){
                    if(element.removeEventListener){
                        element.removeEventListener(type,handler,false);
                    }else if(element.detachEvent()){
                        element.detachEvent('on'+type,handler);
                    }else{
                        element['on'+type]=handler;
                    }
                }
            }
            eventUtil.addHandler(btn4,'click',showmessage);  
```

##事件对象

#### 什么是事件对象
在触发DOM上的事件时都会产生一个event对象
类型：
- DOM中的事件对象
    + event.type 获取事件类型；
    + event.target 获取事件目标 ；
    + stopPropagation()方法;
    + preventDefault()方法 阻止默认行为;

- IE中的事件对象
    + type
    + srcElement 获取事件目标；
    + cancelBubble属性，阻止 冒泡；
    + returnValue属性


    