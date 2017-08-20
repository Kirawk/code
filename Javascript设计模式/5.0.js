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
