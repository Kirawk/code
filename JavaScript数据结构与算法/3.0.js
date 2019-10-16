/**
 * 栈
 */
function Stack() {
    let items = [];
    // 入栈
    this.push = function(element) {
        items.push(element)
    };
    // 出栈
    this.pop = function() {
        return items.pop()
    };
    // 返回栈顶元素
    this.peek = function() {
        return items[0];
    };
    // 判断是否为空栈
    this.empty = function() {
        return items.length === 0
    };
    // 清空栈
    this.clear = function() {
        items = [];
    };
    // 栈的大小
    this.size() = function() {
        return items.length;
    };
    this.print = function() {
        console.log(items.toString())
    };
}