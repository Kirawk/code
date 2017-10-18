/*************类型************/
/**
1.2 内置对象
**/
typeof undefined === "undefined";
typeof true === "boolean";
typeof 42 === "number";
typeof "42" === "string";
typeof {life:42} === "object";
typeof Symbol() === "symbol";

typeof null === "object";//true

var a = null;
(!a && typeof a === "object" );//true

typeof function a(){} === "function";//true
typeof function a(){} === "object";//false

function a(b,c){}
console.log(a.length);//2

typeof [1,2,3] === "object";

/**
1.3 值和类型
**/
var a = 42;
typeof a;//number
var a = true;
typeof a;//boolean

typeof typeof 42;//string

var a;
typeof a;//undefined 
var c;
var b=42;
b=c;
typeof b;//undefined
typeof c;//undefined

//typeof的安全机制
if(DEBUG){
    console.log("Debugging is starting");
}
if(typeof DEBUG === "undefined"){
    console.log("Debugging is starting");
}
if(windows.DEBUG){
//....
}
if(!windows.DEBUG){
    //...
}

function doSomethingCool(){
    var help = (typeof FeatureXYZ !== "undefined")? 
    FeatureXYZ:
    function(){};
    var val = help();

}

(function(){
    function FeatureXYZ(){/** my xyz feasure **/}
    function doSomethingCool(){
        var help =(typeof FeatureXYZ =="undefined") ? FeatureXYZ:function(){};
        var val = help();
    }
    domethingCool();        
})();

/*依赖注入*/
function doSomethingCool(FeatureXYZ){
    var help = FeatureXYZ || function() {};
    var val = help();
}

