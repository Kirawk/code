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
1.3
**/