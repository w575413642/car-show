//baseUrl
var baseURL="http://test2.cloud-top.com.cn/1612_jiangling_qingka/qingka/";
//获取页面可视宽度
var viewWidth,viewHeight;
$(window).resize(function () {
	if (window.innerWidth) {
		viewWidth = Math.max(document.documentElement.clientWidth,document.body.clientWidth,window.innerWidth);
		viewHeight = Math.max(document.documentElement.clientHeight,window.innerHeight);
	}
	else{
		viewWidth = Math.max(document.documentElement.clientWidth,document.body.clientWidth);
		viewHeight = Math.max(document.documentElement.clientHeight);
	}
}).resize()

$(document).ready(function () {
	var $nav_redBg = $(".nav_redBg")//pc下导航的红条
	var $nav_menu = $(".common_nav .menu")//头部一级导航的容器 （pad wap 用）
	var $nav_list  = $(".common_nav .navs")//头部一级导航的集合
	var $drop_list = $(".common_nav .has_dropdown")//头部有下拉菜单的一级导航集合
	var $dropdown_menu = $(".common_nav .dropdown_menu")//头部所有的下拉菜单集合
	var $dropdown_node = $(".common_nav .dropdown_menu li")//头部下拉菜单的子选项集合
	var $footer_drop_list = $(".footer_link_left .has_dropdown")//底部有下拉菜单的一级导航集合
	// 更换logotext的样式
	var $logo_text = $(".logo-text")
	$logo_text.mouseenter(function () {
		$(this).attr("src",baseURL + "images/logo-text-act.png")
	})
	$logo_text.mouseleave(function () {
		$(this).attr("src",baseURL + "images/logo-text.png")
	})
	$nav_list.mouseenter(function () {
		$nav_list.removeClass('nav_act')
		$(this).addClass("nav_act")
	})
	$nav_list.mouseleave(function() {
		$nav_list.removeClass('nav_act')
	});
	// -------------------------PC导航移入移出事件 开始 ------------------------
	// pc端导航移入事件
	$drop_list.mouseenter(function() {
		$nav_redBg.show()
	});
	// pc端导航移出事件
	$drop_list.mouseleave(function() {
		$nav_redBg.hide()
	});
	// -------------------------PC导航移入移出事件 结束 ------------------------

	//---------------------Pad Wap下拉菜单点击开始-------------------
	// 导航图标点击事件
	var $menu_wrap_icon = $(".menu_wrap_icon")
	$menu_wrap_icon.click(function () {
		 $nav_menu.toggle()
		 if( $nav_menu.css("display") == "block"){
			 $(this).find("img").attr("src",baseURL + "images/nav-active.png")
		 }else{
			 $(this).find("img").attr("src",baseURL + "images/nav-normal.png")
		 }
	})
	//pad wap 导航点击事件
	$drop_list.click(function(e) {
		dropDownMenu(e,1000,this)
	});
	//wap底部导航点击事件
	$footer_drop_list.click(function(e) {
		dropDownMenu(e,767,this)
	});
	function dropDownMenu(e,_width,_this) {
		var e = e || event
		var target = e.target || e.srcElement
		var $nav_icon = $(_this).find("span")
		var $this_icon = $(_this).find("span")
		if (viewWidth < _width) {
			$nav_redBg.hide()
			//如果是open状态下点击
			if ($this_icon[0].className == "open" && ($(target).hasClass("drop_title") || target.tagName == "SPAN") ) {
				$this_icon[0].className = "close"
				$(_this).find(".dropdown_menu").hide()
			}else{
				$this_icon[0].className = "open"
				$(_this).find(".dropdown_menu").show()
			}
		}
	}
	//---------------------Pad Wap下拉菜单点击结束-------------------------------

	//---------------------计算PC导航栏下边的下拉菜单的宽度开始-------------------
	//每一个下拉菜单的宽度  在这里是110px
	var $dropdown_node_width = parseInt($dropdown_node.outerWidth())
	//得出父级的导航的宽度
	var $navs_width = $nav_list.innerWidth()
	
	if (viewWidth > 1000) {
		for (var i = 0; i < $dropdown_menu.length; i++) {
			//得出每个下拉菜单下的选项的个数
			var $dropdown_node_len = $dropdown_menu.eq(i).find("li").length;
			var $dropdown_menu_width = $dropdown_node_width*$dropdown_node_len
			$dropdown_menu.eq(i).css({
				"width":$dropdown_menu_width,
				"left": ((-$dropdown_menu_width/2) + $navs_width/2)
			})
		}
		// 最后一个超出了 多一些left
		$dropdown_menu.eq($dropdown_menu.length-1).css({
			"left": (-$dropdown_menu_width + $navs_width)
		})
	}
	//---------------------计算PC导航栏下边的下拉菜单的宽度结束-------------------
	var topValue=$('.footer_fri_links').outerHeight()+$('.footer_bottom').outerHeight()+4;
	var offsetTop=$(".kv-bg").height();
	// $(".toTop").css("bottom",topValue)
	$(".toTop").click(function(){
		$('body,html').animate({'scrollTop':'0'},300)
	})
	$(window).scroll(function(){
		if ($(window).scrollTop()>offsetTop) {
			$('.toTop').css("display","block")
		}else{
			$('.toTop').css("display","none")
		}
	})
	var $ratio = 1.8;
	function setImgWrapCss () {
		if ($(".imgWrap")[0]) {
			var imgWrapList = $(".imgWrap")
			for (var i = 0; i < imgWrapList.length; i++) {
				var imgWrapWidth = imgWrapList.eq(i).width()
				imgWrapList.eq(i).css("height",imgWrapWidth/$ratio)
			}
		}
	}
	window.onload = function () {
		setImgWrapCss()
	}
	$(window).resize(function() {
		setImgWrapCss()
	}).resize()
	//这里是$(document).ready
})
