/***********this的指向:4种情况*****************/
/*1.作为对象的方法调用，此时，this指向该对象*/
var obj = {
        a:1,
        getA:function(){
                console.log(this===obj);
                console.log(this.a);//1
        }
};
obj.getA();

/*2.作为普通函数被调用，此时，this指向window对象*/
window.name = "Bob";
var obj = {
        name: "steven",
        getName: function () {
                console.log(this.name);
        }
};
var o = obj.getName;
o();//"Bob"

/*3.构造器调用，若果显示返回对象，就是该对象;
 * 没返回，this默认指向返回的对象*/
var myClass = function(){
        this.name = "steven";
};
var obj = new myClass();
console.log(obj.name)//steven


var myClass = function () {
        this.name = "steven";
        return {
                name: "Bob";
        }
};
var obj = new myClass();
console.log(obj.name);//"Bob"

var myClass = function () {
        this.name = "steven";
        return "Bob";
};
var obj = new myClass();
console.log(obj.name);//"steven"


/*4.call与apply调用*/
var obj1 = {
        name: "steven",
        getName: function(){
                return this.name;
        }
};

var obj2 ={
        name:"Bob"
};
console.log(obj1.getName());//"steven"
console.log(obj1.getName.call(obj2));//"Bob"

/*******************this丢失问题**************************/
/*情况1*/
var obj = {
        name:"steven",
        getName: function(){
                return this.name;
        }
};

var obj2=obj.getName;
console.log(obj2());//"undefined"

/*情况2*/





/*****************call与apply的区别**************************/
var func = function(a,b,c){
    console.log(this===window)
}
func.apply(null,[1,2,3]);
func.call(null,1,2);

/*1.改变this的指向*/
var obj1 = {
 name: 'sven'
};
var obj2 = {
 name: 'anne'
};
window.name = 'window';
var getName = function(){
    console.log(this.name);
};
getName(); // 输出: window
getName.call( obj1 ); // 输出: sven
getName.call( obj2 );

//
document.getElementById("id").onclick = function(){
        console.log(this.id);
        var func =function(){
                console.log(this.id);
        }
        func();
}

/*2.模仿bind的绑定*/
Function.prototype.bind=function(context){
        var self = this;
        return function(){
                return self.apply(context,arguments);
        }
}
var obj = {
        name: "sven"
};

var func = function () {
        console.log(this.name);
}.bind(obj);

func();

//加强版的的bind绑定
Function.prototype.bind = function(context){
        var self = this,//保存原函数
        context = [].shift.call(arguments),//需要把绑定的this上下文
        args = [].slice.call(arguments);//剩余参数转化为数组
        return function(){
                return self.apply(context,[].concat.call(args,[].slice.call(arguments)));
        }
}
var obj = {
        name: "sven"
};

var func = function(a,b,c,d){
        console.log(this.name);
        console.log([a,b,c,d]);
}.bind(obj,1,2);
func(3,4);

//使用其他对象的方法
/*1.借用构造函数，实现类似继承*/
var A =  function(name){
    return this.name= name;
}
var B = function () {
    A.apply(this,arguments);
}
B.prototype.getName = function(){
    return this.name;
};
var b=  new B("seve");
console.log(b.getName());//'seve'


/**2.场景借用？不明白**/
var a = {};
Array.prototype.push.call(a,"first");
console.log(a.length);
console.log(a[0]);

/********闭包与函数式编程********************/
//变量
/**变量的作用域**/
var func = function(){
    var a =2;
    console.log(a);//2
}
func();
console.log(a);//Uncaught ReferenceError: a is not defined

/*变量的生存周期*/
var func = function(){
    var a = 1;
    return function(){
        a++;
        console.log(a);
    }
}
var f = func();
f();//2
f();//3
f();//4
f();//5

//闭包应用
      /*<div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>*/
var nodes = document.getElementsByTagName('div');
for(var i=0;i<nodes.length;i++){
  nodes[i].onclick=function(){
    console.log(i);//点击后都打出5;
  }
}

/*修改后:*/
for(var i=0;i<nodes.length;i++){
  (function(i){
      nodes[i].onclick=function(){
       console.log(i);//
  })(i)
}
