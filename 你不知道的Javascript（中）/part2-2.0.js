/**
 * 回调
 */
//2.2.2 嵌套回调与链式回调
listen("click", function (evt) {
    setTimeout(function response() {
        ajax('http:some.url.1', function response(text) {
            if (text == "hello") {
                handle();
            } else if (text == "world!") {
                request();
            }
        });
    }, 500);
});

//不是用嵌套，重写上述代码
listen("click",handler);
function handle(){
    setTimeout(request,500);
}
function request(){
    ajax("http://some.url.1",response);
}
function response(text){
    if(text == "hello"){
        handle();
    }else if(text == "world"){
        request();
    }
}
//信任问题
analytics.trackPurchase(purchaseData,function(){
    chargeCreditCard();
    displayThankyouPage();
});

var tracked = false;
analytics.trackPurchase(purchaseData,function(){
    if(!tracked){
        tracked = true;
        chargeCreditCard();
        displayThankyouPage();
    }
});

//过分信任输入案例
function addNumber(x,y){
    return x + y;
}
addNumber(21,21);//42
addNumber(21,"21");//"2121"

//针对不信任防御代码
function addNumber(x,y){
    if(typeof x!="number"|| typeof y!="number"){
        throw Error("Bad parameters");
    }
    return x + y;
}
addNumber(21,21);//42
addNumber(21,"21");//Error:"Bad parameters"

//依旧安全但更友好代码
 function addNumber(x,y){
     x = Number(x);
     y = Number(y);
     return x+y;
 }
 addNumber(21,21);//42
 addNumber(21,"21");//42

 //2.4省点回调
 //1.分离回调
 function success(data){
     console.log(data);
 }
 function failure(err){
     console.log(err);
 }
 ajax("http://some.url.1",success,failure);

 //2. error-first风格：也叫node风格
function response(err,data){
    //出错
    if(err){
        console.log(err);
    }else{
        console.log(data);
    }
}
ajax("http://some.url.1",response);

function timeoutify(fn,delay){
    var intv = setTimeout(function(){
        intv = null;
        fn(new Error("Timeout!"));
    },delay);
    return function(){
        //还没有超时
        if(intv){
            clearTimeout(intv);
            fn.apply(this,arguments);
        }
    };
}
// 使用error-first风格回调设计
function foo(err,data){
    if(err){
        console.log(err);
    }else{
        console.log(data);
    }
}
ajax("hhtp://some.url.1",timeoutify(foo,500));

//回调太早
 function result(data){
     console.log(a);//可能是0，也可能是1
 }
 var a = 0;
 ajax("..pre-cached-url..",result);
 a++;

 function asyncify(fn){
     var orig_fn = fn,
     intv = setTimeout(function(){
         inty = null;
         if(fn) fn();
     },0);
     fn = null;
     return function(){
         if(intv){
             fn = orig_fn.bind.aply(
                 orig_fn,
                 [this].concat([].slice.call(arguments))
             );
         }else{
             //调用原来的函数
             orig_fn.apply(this,arguments);
         }
     };
 }
 function result(data){
     console.log(a);
 }
 var a = 0;
 ajax("..pre-cached-url..",asyncify(result));
a++;




