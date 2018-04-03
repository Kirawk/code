/**
 * 字符串与正则表达式
 */

var text = "吉";
console.log(text.length);
console.log(/^.$/.test(text));
console.log(text.charAt(0));
console.log(text.charAt(1));
console.log(text.charCodeAt(0));
console.log(text.charCodeAt(1));

let text = "吉a";
console.log(text.charCodeAt(0));
console.log(text.charCodeAt(1));
console.log(text.charCodeAt(2)); //97

console.log(text.codePointAt(0));
console.log(text.codePointAt(1));
console.log(text.codePointAt(2));