# 闭包

标签（空格分隔）： JavaScript

---
 对于闭包的理解，还是不够的，下面的一段代码来自JavaScript高级程序设计，不理解书中的所讲的内容
 
#### 闭包中变量的表现
```JavaScript
 function createFunction(){
    var result=new Array();
    for(var i=0;i<3;i++){
        result[i]=function(){
            return i;
        };
    }
    return result;
}
console.log(result);//打印出来的结果有点出乎意料

function createFunction(){
    var result=new Array();
    for(var i=0;i<5;i++){
        result[i]=function(num){
            return function(){
                return num;
            };
        }(i);
    }
    return result;
}
console.log(result);//结果不符合预期
```
理解闭包，需要理解作用域，上下文，含有闭包的函数被调用后，这个过程是怎么走的？

#### 闭包中this对象的表现

```
var name="widnows";
var object={
  name:"my object",
  getNamFunc:function(){
      return function(){
        return this.name;  
      };
  }  
};
console.log(object.getNamFunc()());//widnows

var name=" the widnows";
var object={
  name:"my object",
  getNamFunc:function(){
    var that=this;
      return function(){
        return that.name;  
      };
  }  
};
console.log(object.getNamFunc()());//my object


```
#### 利用闭包模仿块级元素

```
function output(count){
    for(var i=3;i<count;i++){
       // console.log(i);
    }
    //console.log(i);
}
output(8);


function output2(){
    (function(){
      for(var i=0;i<3;i++){
          console.log(i);
      } 
    })();
    console.log(i);
}
output2();
```


