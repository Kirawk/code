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

function is32Bit(c) {
    return c.codePointAt(0) > 0xFFFF;
}
console.log(is32Bit("吉"));
console.log(is32Bit("a"));

console.log(String.fromCodePoint(134071)); //""

//normalize()
var normalize = value.map(function(text) {
    return text.normalize();
});
normalize.sort(function(first, second) {
    if (first < second) {
        return -1;
    } else if (first === second) {
        return 0;
    } else {
        return 1;
    }
});

value.sort(function(first, second) {
    var firstNormalized = first.normalize(),
        secondNormalized = second.normalize();
    if (firstNormalized < secondNormalized) {
        return -1;
    } else if (firstNormalized === secondNormalized) {
        return 0;
    } else {
        return 1;
    }
});

value.sort(function(first, second) {
    var firstNormalized = first.normalize("NFD"),
        secondNormalized = second.normalize("NFD");
    if (firstNormalized < secondNormalized) {
        return -1;
    } else if (firstNormalized === secondNormalized) {
        return 0;
    } else {
        return 1;
    }
});