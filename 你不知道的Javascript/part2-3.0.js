/*对象*/
var string ="I am string";
typeof string;//"string"
string instanceof String;//false;

var string=new String("I am string");
typeof string;//"Object"
string instanceof String;//true

var string="I am string";
console.log(string.length);
console.log(string.charAt(3));//