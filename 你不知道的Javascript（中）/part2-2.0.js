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
