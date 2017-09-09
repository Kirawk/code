/*迭代器模式*/
//实现自己的迭代器
var each = function(ary,callback){//，each 函数接受 2 个参数，第一个为被循环的数组，第二个为循环中的每一步后将被触发的回调函数
    for(var i =0,l=ary.length;i<l;i++){
        callback.call(ary[i],i,ary[i]);//把下标和元素当作参数传递给callback函数

    }
};
each([1,2,3],function(i,n){
   // console.log([i,n]);
    alert([i,n]);
});

//内部迭代器：比较连个数组
var compare = function(ary1,ary2){
    if(ary1.length!=ary2.length){
        throw new Error("ary1和ary2不相等");
    }
    each(ary1,function(i,n){
        if(n!==ary2[i]){
            throw new Error("ary1和ary2不相等");
        }
    });
    alert('ary1和ary2相等');
};
compare([1,2,3],[1,2,4]);

//外部迭代器
var Iterator = function(obj){
    var current = 0;
     var next = function(){
         current+=1;
     };
     var isDone = function(obj){
         return current >=obj.length;
     };
     var getCurrItem = function(){
         return obj[current];
     };

     return {
         next:next,
         isDone:isDone,
         getCurrItem:getCurrItem
     }
};
//改写compare函数
var compare = function(iterator1,iterator2){
    while(!iterator1.isDone()&&!iterator2.isDone()){
        if(iterator1.getCurrItem()!==iterator2.getCurrItem()){
            throw new Error('iterator1和iterator2');
        }
        iterator1.next();
        iterator2.next();
    }
     alert('两者相同');    
}
var iterator1 = Iterator([1,2,3]);
var iterator2 =Iterator([1,2,3]);
compare(iterator1,iterator2);


//迭代类数组对象和字面量对象
$.each = function(obj,callback){
    var value,
    i=0,
    length = obj,length,
    isArray = isArray(obj);
    if(isArray){
        for(;i<length;i++){
            value = callback.call(obj[i],i,obj[i]);
            if(value==false){
                break;
            }
        }
    }else{
        for(i in obj){
            value =callback.call(obj[i],i,obj[i]);
            if(value==false){
                break;
            }
        }
    }
    return obj;
};

/*倒叙迭代器*/
var reverseEach = function(ary, callback) {
    for (var l = ary.length - 1; l >= 0; l--) {
        callback(l, ary[l]);
    }
};
reverseEach([0, 1, 2], function(i, n) {
    console.log(n);
});
/*中止迭代器*/
var each = function(ary,callback){
    for(var i=0,l=ary.length;i<l;i++){
        if(callback[i,ary[i]]===false){
            break;
        }
    }
};
each([1,2,3,4,5],function(i,n){
    if(n>3){
        return false;
    }
    console.log(n);
});