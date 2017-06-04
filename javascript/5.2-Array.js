/*Javascript 高级程序设计-Array类型*/

//toString() valueOf() toLocaleString()
var colors=["red","blue","yellow"];
console.log(colors.toString());//"red,blue,yellow"
console.log(colors.valueOf());//["red","blue","yellow"]
console.log(colors.toLocaleString());//"red,blue,yellow"
console.log(colors.join("||"));//"red||blue||yellow"

//pop() push()
var colors=new Array();
var count=colors.push("white","blue");
console.log(count);//2
var item=colors.pop();
console.log(item);//"blue"
console.log(colors.length);//1
