/**
 * 解构
 */
let options = {
    repeat: true,
    save: false
}
let repeat = options.repeat;
save = options.save;

/**
 * 对象解构
 */
let node = {
    type: "Identifier",
    name: "foo"
};
let { type, name } = node;
console.log(type); //"Identifier"
console.log(name); //"foo"

//解构赋值
let node = {
        type: 'Identifier',
        name: 'foo'
    },
    type = "Literal",
    name = 5;
//使用解构语法为多个变量赋值
({ type, name } = node);
console.log(type); //"Identifier"
console.log(name); //"foo"

function outputInfo(value) {
    console.log(value === node); //true
}
outputInfo({ type, name } = node);

//默认值
let node = {
    type: 'Identifier',
    name: 'foo'
};
let { type, name, value } = node;
console.log(type); //Identifier
console.log(name); //foo
console.log(value); //undefined

let node = {
    type: 'Identifier',
    name: 'foo'
};
let { type, name, value = true } = node;
console.log(type);
console.log(name);
console.log(value); //true

//非同名局部变量赋值
let node = {
    type: "Identifier",
    name: 'foo'
}
let { type: localType, name: localName } = node;
console.log(localType);
console.log(localName);

let node = {
    type: "Identifier"
};

let { type: localType, name: localName = "bar" } = node;
console.log(localType);
console.log(localName);

//嵌套对象解构
let node = {
    type: 'Identifier',
    name: 'foo',
    loc: {
        start: {
            line: 1,
            column: ''
        },
        end: {
            line: 1,
            column: 4
        }
    }
}
let { loc: { start } } = node;
console.log(start.line); //1
console.log(start.column); //1
let { loc: { start: localStart } } = node;
console.log(localStart.line);
console.log(localStart.column);

//数组解构
let colors = ['red', 'green', 'blue'];
let [firstColor, secondColor] = colors;
console.log(firstColor); //'red'
console.log(secondColor); //'green'
let [, , thirdColor] = colors;
console.log(thirdColor);

//解构赋值
let colors = ['red', 'green', 'blue'],
    firstColor = 'black',
    secondColor = 'purple';
[firstColor, secondColor] = colors;
console.log(firstColor); //'red'
console.log(secondColor); //'green'

//es6交换变量
let a = 1,
    b = 2;
[a, b] = [b, a];
console.log(a); //2
console.log(b); //1

//默认值
let colors = ["red"];
let [firstColor, secondColor = "green"] = colors;
console.log(firstColor); //"red"
console.log(secondColor); //"green"

//嵌套数组解构
let colors = ["red", ["green", "lightgreen"], "bar"];
let [firstColor, [secondColor]] = colors;
console.log(firstColor);
console.log(secondColor);

//不定元素
let colors = ["red", "green", "white"];
let [firstColor, ...secondColor];
console.log(secondColor.length); //2
console.log(secondColor[0]); //"green"
console.log(secondColor[1]); //"blue"

//赋值元素
let colors = ["red", "blue", "white"];
let [...copyColors] = colors;
console.log(copyColors);

//混合解构
let node = {
    type: "Identifier",
    name: "foo",
    loc: {
        start: {
            line: 1,
            column: 1
        },
        end: {
            line: 1,
            column: 4
        }
    },
    rang: [0, 3]
};

let {
    loc: { start },
    range: [startIndex]
} = node;
console.log(start.line); //1
console.log(start.column); //1
console.log(startIndex); //0