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
