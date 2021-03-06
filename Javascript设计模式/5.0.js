/**设计模式之策略模式*/
//情景：年终奖考核
var calculateBonus = function(performanceLevel,salary){
    if(performanceLevel === 'S'){
        return salary*4;
    }
    if(performanceLevel==='A'){
        return salary*3;
    }
    if(performanceLevel==='B'){
        return salary*2;
    }
};
calculateBonus("B",20000);//40000
calculateBonus("S",6000);//24000

//使用组合函数重构代码

var performanceS = function(salary){
    return salary*4;
};
var performanceA = function(salary){
    return salary*3;
};
var performanceB = function(salary){
    return salary*2;
};

var calculateBonus =function(performanceLevel,salary){
    if(performanceLevel==="S"){
        return performanceS(salary);
    }
    if(performanceLevel==="A"){
        return performanceA(salary);
    }
    if(performanceLevel==="B"){
        return performanceB(salary);
    }
};
calculateBonus('A',10000);

//重写上述代码
var performanceS = function(){};
performanceS.prototype.calculate = function(salary){
    return salary*4;
};
var performanceA = function(){};
performanceA.prototype.calculate = function(salary){
    return salary*3;
};
 var performanceB = function(){};
 performanceB.prototype.calculate = function(salary){
     return salary*2;
 };
//定义Bonus奖金类
 var Bonus = function(){
     this.salary=null;    //原始工资
     this.strategy = null;//绩效等级对应的策略对象
 };
 Bonus.prototype.setSalary = function(salary){
     this.salary=salary;   //设置员工的原始工资
 };
 Bonus.prototype.setStrategy = function(strategy){
     this.strategy = strategy;
 };
 Bonus.prototype.getBonus = function(){
     return this.strategy.calculate(this.salary);
 };

var bonus = new Bonus();
bonus.setSalary( 10000 );
bonus.setStrategy( new performanceS() ); // 设置策略对象
console.log( bonus.getBonus() ); // 输出：40000
bonus.setStrategy( new performanceA() ); // 设置策略对象
console.log( bonus.getBonus() ); // 输出：30000 

 //Javascript版本的策略模式
var strategies = {

    "S":function(salary){
        return salary*4;
    },
    "A":function(salary){
        return salary*3;
    },
    "B":function(salary){
        return salary*2;
    }
};
var calculateBonus = function(level,salary){
    return strategies[level](salary);
};
console.log(calculateBonus('S',20000));
console.log(calculateBonus('A',10000));

//让小球运动起来
var tween = {
    linear: function(t, b, c, d) {
        return c * t / d + b;
    },
    easeIn: function(t, b, c, d) {
        return c * (t /= d) * t + b;
    },
    strongEaseIn: function(t, b, c, d) {
        return c * (t /= d) * t * t * t * t + b;
    },
    strongEaseOut: function(t, b, c, d) {
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    },
    sineaseIn: function(t, b, c, d) {
        return c * (t /= d) * t * t + b;
    },
    sineaseOut: function(t, b, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + b;
    }
};

//定义Animate类
var Animate = function(dom){
    this.dom = dom;
    this.startTime = 0;//动画开始时间
    this.startPos = 0;//动画开始时，dom节点的位置，即dom的初始位置
    this.endPos = 0; //动画介绍时,dom节点的位置，即dom的目标位置
    this.propertyName = null; //dom节点需要被改变的css属性名
    this.easing = null; //缓动算法
    this.duration = null; //动画持续时间
}
Animate.prototype.start = function(propertyName,endPos,duration,easing){
    this.startTime =+new Date; //动画启动时间
    this.startPos = this.dom.getBoundingClientRect()[propertyName];
    this.propertyName = propertyName;
    this.endPos = endPos;//dom 节点目标位置
    this.duration = duration; //动画持续事件
    this.easing = tween[easing];//缓动算法

    var self = this;
    var timeId =setInterval(function(){ //启动定时器，开始执行动画
        if(self.step()===false){        //如果动画已结束，则清除定时器
            clearInterval(timeId); 
        }
    },19);
};
//小球运动的每一帧要做的事
Animate.prototype.step = function(){
    var t = +new Date;
    if(t>=this.startTime+this.duration){
        this.update(this.endPos);
        return false; 
    }
    var pos = this.easing(t-this.startTime,this.startPos,this.endPos-this.startPos,this.duration);//pos为小球当前位置
    this.update(pos);//更新小球的css属性值
};
//更新方法
Animate.prototype.update = function(pos){
    this.dom.style[this.propertyName]=pos+'px';
};
//测试
/*<div style="position:absolute;background:blue" id="div">我是 div</div> */
var div = document.getElementById( 'div' );
var animate = new Animate( div );
animate.start( 'left', 500, 9000, 'strongEaseOut' ); 

/**
<form action="http:// xxx.com/register" id="registerForm" method="post">
 请输入用户名：<input type="text" name="userName"/ >
 请输入密码：<input type="text" name="password"/ >
 请输入手机号码：<input type="text" name="phoneNumber"/ >
 <button>提交</button>
 </form> 
 **/
 //表单验证
 var registerForm = document.getElementById('registerForm');
 registerForm.onsubmit = function(){
     if(registerForm.userName.value ===''){
         console.log("用户名不能为空");
         return false;
     }
     if(registerForm.password.value.length<6){
         console.log("密码长度不能为空");
         return false;
     }
     if(!/(^1[3|5|8][0-9]{9}$)/.test(registerForm.phoneNumber.value)){
         console.log("手机格式不正确");
         return false;
     }
 }
 //使用策略模式重构表单验证
 var strategies = {
     isNonEmpty:function(value,errorMsg){
         if(value===''){
             return errorMsg;
         }
     },
     minLength:function(value,length,errorMsg){
         if(value.length<length){
             return errorMsg;
         }
     },
     isMobile:function(value,errorMsg){
         if(!/(^1[3|5|8][0-9]{9}$)/.test(value)){
             return errorMsg;
         }
     }
 };
 var validateFunc = function(){
     var validator = new Validator();//创建一个validator对象
     /*添加校验规则*/
     validator.add(registerForm.userName,'isNonEmpty','用户名不能为空');
     validator.add(registerForm.password,'minLength','密码长度不能少于6位');
     validator.add(registerForm.phoneNumber,'isMobile','手机号码格式不正确');

     var errorMsg = validator.start();
     return errorMsg;
 };
 
 var registerForm = document.getElementById( 'registerForm' );
 registerForm.onsubmit = function(){
 var errorMsg = validataFunc(); // 如果 errorMsg 有确切的返回值，说明未通过校验
 if ( errorMsg ){
 console.log ( errorMsg );
 return false; // 阻止表单提交
 }
}; 

// Valodator类实现
 var Validator = function(){
     this.cache = [];
 };
 Validator.prototype.add = function( dom, rule, errorMsg ){
 var ary = rule.split( ':' ); // 把 strategy 和参数分开
 this.cache.push(function(){ // 把校验的步骤用空函数包装起来，并且放入 cache
 var strategy = ary.shift(); // 用户挑选的 strategy
 ary.unshift( dom.value ); // 把 input 的 value 添加进参数列表
 ary.push( errorMsg ); // 把 errorMsg 添加进参数列表
 return strategies[ strategy ].apply( dom, ary );
 });
};
 Validator.prototype.start = function(){
     for(var i=0,validatoFunc;validatoFunc = this.cache[i++];){
         var msg = validatoFunc();
         if(msg){
             return msg;
         }
     }
};
