/**
 * mvc和类
 */
/**
 * 模型
 */

//bad
var user = users["foo"];
destroyUser(user);
//good
var user = User.find("foo");
user.destroy();

/**
 * 视图
 */
//<div>  bad
<script>
function formatData(date) {
    /** */
};
</script>
//${formaatDate(this.date)}
//</div>

//good help.js
var help = {};
help.formatDate = function(){

};

/**
 * 控制器
 */
var Controller = {};
//使用匿名函数来封装一个作用域
(Controller.users = function($){
    var nameClick = function(){
        /** */
    };
    //在页面加载时绑定事件监听
    $(function(){
        $("#view .name").click(nameClick);
    });
})(jQuery);


