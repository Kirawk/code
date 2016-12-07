## 实现继承的方式有哪几种？
- 原型链式
    + 原型链

-  构造函数式
- 组合继承（原型+构造）
- 寄生式继承
- 寄生组合式继承


#### 原型链
```
function SuperType(){
    this.property=true;
}
SuperType.prototype.getSuperValue=function(){
  return this.property;  
};
function SubType(){
    this.subproperty=false;
}
SubType.prototype=new SuperType();
SubType.prototype.getSubValue=function(){
  return this.subproperty;  
};
var instance=new SubType();
console.log(instance.getSuperValue());

```

####原型式继承
```
function object(o){
    function F(){}
    F.prototype=o;
    return new F();
}
var person={
  name:"Nick",
  friends:["shelle","Courn","keven"]  
};
var anotherPerson=object(person);
anotherPerson.name="Greg";
anotherPerson.friends.push("Bob");

var y=object(person);
y.name="wukai";
y.friends.push("lina");

console.log(person.friends);

```

#### 构造函数式

```
function SuperType(){
    this.colors=["red","blue","green"];
}
function SubType(){
    SuperType.call(this);
}
var instance1=new SubType();
instance1.colors.push("black");
console.log(instance1.colors);
var instance2=new SubType();
console.log(instance2.colors);
//传递参数
function SuperType(name){
    this.name=name;
}
function SubType(){
    SuperType.call(this,"wukai");
    this.age=25;
}
var instance=new SubType();
console.log(instance.name);
console.log(instance.age);
```
#### 组合继承
```
//使用原型链实现对原型属性和方法的继承
//通过借用构造函数来实现对实例属性的继承
function SuperType(name){
         this.name=name;
         this.color=["red","blue","green"];
}
SuperType.prototype.sayName=function(){
                console.log(this.name);  
};
function SubType(name,age){
    SuperType.call(this,name);
    this.age=age;
}

//继承方法
SubType.prototype=new SuperType();？
SubType.prototype.constructor=SubType;
SubType.prototype.sayAge=function(){
  console.log(this.age);  
};
var instacne1=new SubType("wukai",25);
instacne1.color.push("black");
console.log(instacne1.color);
instacne1.sayName();
instacne1.sayAge();

var instacne2=new SubType("kira",23);
console.log(instacne2.color);
instacne2.sayName();
instacne2.sayAge();

```
#### 寄生式继承

```
function object(o){
    function F(){}
    F.prototype=o;
    return new F();
}
function createAnother(original){
    var clone=object(original);//通过调用函数创建一个新对象
    clone.sayHi=function(){
        console.log("都在看代码了，还不快点投简历");
    }
    return clone;
}
var person={
  name:"Nick",
  friends:["shelle","Courn","keven"]  
};
 var person2=createAnother(person);
 person2.sayHi();
 
```
#### 寄生组合式
```
function inheritPrototype(subType,superType){
    var prototype=object(superType.prototype);
    prototype.constructor=subType;
    subType.prototype=prototype;
}
function SuperType(name) {
    this.name = name;
    this.colors = ["red", "blue", "green"];
}
SuperType.prototype.sayName = function() {
    alert(this.name);
};
function SubType(name, age) {
    SuperType.call(this, name);
    this.age = age;
}
inheritPrototype(SubType, SuperType);

SubType.prototype.sayAge = function() {
    alert(this.age);
};
```