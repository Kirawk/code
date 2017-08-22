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

