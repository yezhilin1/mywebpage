$(function(){

  /*carousel start*/
  var parent = $(".xm-slider-box ul").eq(0);
  var ctrBtn = $(".xm-slider-box ul").eq(1);
  var cur = 0;
  /*利用事件冒泡机制直接在父元素上绑定hover事件也能在子元素上执行事件函数，二*/
  ctrBtn.click(function(e){
    e = e || window.event;
    carousel(e);
  });
  var timer = setInterval(carousel,3000);
  parent.hover(function(){
    clearInterval(timer);
  },function(){
    timer = setInterval(carousel,3000);
  });
  ctrBtn.hover(function(){
    clearInterval(timer);
  },function(){
    timer = setInterval(carousel,3000);
  });

  function carousel(e){
    /*注意设置checked、selected属性时只能用prop方法，不能使用attr()方法*/
    e?(cur = $(e.target.parentNode).index()):(cur<4?cur++:cur = 0);
    parent.children().eq(cur).addClass("active").siblings().removeClass("active");
    ctrBtn.children().find("input:checked").prop("checked",false);
    ctrBtn.children().eq(cur).find("input").prop("checked",true);
  }

});
$(function() {
  var $slider = $(".xm-star,.recommend");

  // 给xm-star 和recommend添加鼠标移入事件,根据this指向的对象查找按钮并添加点击事件
  $slider.mouseenter(function () {
    var $this = $(this),
      $sliderItem = $this.find(".brick-list"),
      $pre = $this.find(".btn-group .pre"),
      $next = $this.find(".btn-group .next"),
      len = $sliderItem.children().length,
      width = 248 * len,
      page = 0,
      max = len / 5;

    //设置ul宽度，以便使所有li排成一排
    $sliderItem.css("width", width);
    $pre.on("click",clickHandleFn);

    //设置button hover效果
    $pre.hover(mouseIn, mouseOut);
    $next.hover(mouseIn, mouseOut);

    function mouseIn() {
      if (!$(this).hasClass("disabled")) {
        $(this).addClass("active");
      }
    }

    function mouseOut() {
      if (!$(this).hasClass("disabled")) {
        $(this).removeClass("active");
      }
    }

    function clickHandleFn(e) {
      e.stopPropagation();
      console.log(e.currentTarget);
      if($(this).index()){
        page--;
      }else{
        page++;
      }
      move(page);
      $pre.off("click",clickHandleFn);
      $next.off("click",clickHandleFn);
      disable(page);
      enable(page);

    }

    //移动
    function move(page){
      $sliderItem.css("transform","translate("+ (-width / max)*page +"px)");
    }

    //禁用按钮
    function disable(page){
      if(page === 0){
        $next.off("click",clickHandleFn).addClass("disabled").removeClass("active");
      }
      if(page === max-1){
        $pre.off("click",clickHandleFn).addClass("disabled").removeClass("active");
      }
    }

    //激活按钮
    function enable(page) {
      if (page > 0) {
        $next.on("click", clickHandleFn).removeClass("disabled");
      }
      if (page < max - 1) {
        $pre.on("click", clickHandleFn).removeClass("disabled");
      }
    }
  });
});

$(function(){
  var items = $(".home-elect,.intelligence,.match,.parts,.others");

  items.mouseenter(function(){
    var tabItems   = $(this).find(".h-tab li"),
      brickList = $(this).find(".brick-list"),
      moreLink = $(this).find(".brick-item .more-link small"),
      curIndex =0;
    tabItems.mouseenter(function(){
      var $this = $(this);
      $this.addClass("selected").siblings().removeClass("selected");
      brickList.removeClass("active");
      curIndex = $this.index();
      brickList.eq(curIndex).addClass("active");
      moreLink.text($this.text());
    });
  });
});
