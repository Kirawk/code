/**
 * 控制器和状态
 */
(function(){
/**
 * 
 */
})();

(function($){
/** */
})(jQuery);

//全局导出
(function($,exports){
exports.Foo = 'wem';
})(jQuery,window);

//添加少量上下文
(function(){
   var mod = {};
   mod.contextFunction = function(){
       assertEqual(this,mod);
   };
   mod.contextFunction();
})();

(function($){
 var mod = {};
 mod.load = function(func){
     $($.proxy(func,this));
 };
 mod.load(function(){
     this.view = $("#view");
 });
 mod.assetsClick = function(e){
     //处理点击
 };
 mod.load(function(){
   this.view.find(".assets").click(
       $.proxy(this,assetsClick,this)
   );
 });
})(jQuery)



