$(document).ready(function(){
	var mouse;
	// now them
	var mySwiper = new Swiper('.this-week',{
		pagination: '.week-pagination',
		loop:true,
		calculateHeight : true,
		paginationClickable: true
	})
	// time line
	var timeLine = new Swiper('.time-line',{
		slidesPerView : 1,
		calculateHeight : true,
		paginationClickable: true,
		onSlideTouch:function() {
		},
		onSlideChangeEnd: function(){
			changeLight();
			timeSelect();
		}

	})
	// img copy
	var imgCopy = new Swiper('.img-copy',{
		slidesPerView : 1,
		calculateHeight : true,
		paginationClickable: true,
		onlyExternal:true,
		onSlideChangeEnd: function(){
			console.log(imgCopy.activeIndex);
			$('.time-line .swiper-slide').removeClass('light'); 
			$('.time-line .swiper-slide').eq(imgCopy.activeIndex).addClass('light');
		}
	})
	// mousedown listen
	$('.time-box').mousedown(function(e){
		var e = window.event || e;
			return mouse = {
					seX:e.screenX,
					seY:e.screenY,
					click:function(_target){
						$('.time-box').removeClass('light');
						_target.addClass('light');
						imgCopy.swipeTo(parseInt(_target.attr('rel')), 1000, false);
					},
					tips:function(){
						console.log('move')
					}
			}
	});
	// mouseup
	$('.time-box').mouseup(function(e){
		var e = window.event || e,
		_this = $(this);
		(mouse.seX == e.screenX && mouse.seY == e.screenY) ? mouse.click(_this) : mouse.tips();
	});
	// ago show
	var agoSwiper = new Swiper('.ago-swiper',{
		slidesPerView : 4,
		calculateHeight : true,
		paginationClickable: true
	})
	var gilrsSwiper = new Swiper('.gilrs-swiper',{
		slidesPerView : 4,
		calculateHeight : true,
		paginationClickable: true
	})
	var ownerSwiper = new Swiper('.owner-swiper',{
		slidesPerView : 4,
		calculateHeight : true,
		paginationClickable: true
	})
	// ago show click
  	//   --- 1 ---   //
	$('.click-swiper-ago .left').on('click', function(e){
   	 	e.preventDefault()
    	agoSwiper.swipePrev()
  	})
  	$('.click-swiper-ago .right').on('click', function(e){
    	e.preventDefault()
    	agoSwiper.swipeNext()
  	})
  	//   --- 2 ---   //
  	$('.click-swiper-gilrs .left').on('click', function(e){
   	 	e.preventDefault()
    	gilrsSwiper.swipePrev()
  	})
  	$('.click-swiper-gilrs .right').on('click', function(e){
    	e.preventDefault()
    	gilrsSwiper.swipeNext()
  	})
  	//   --- 3 ---   //
  	$('.click-swiper-owner .left').on('click', function(e){
   	 	e.preventDefault()
    	ownerSwiper.swipePrev()
  	});
  	$('.click-swiper-owner .right').on('click', function(e){
    	e.preventDefault()
    	ownerSwiper.swipeNext()
  	});
  	$('.click-swiper .right').on('click', function(e){
    	changeLight()
    	e.preventDefault()
    	timeLine.swipeNext()
    	timeSelect()
  	});
  	$('.click-swiper .left').on('click', function(e){
    	changeLight()
    	e.preventDefault()
    	timeLine.swipePrev()
    	timeSelect()
  	});
  	// change timeSelect
  	function timeSelect(){
  		$('#data').get(0).selectedIndex = $('.time-line .swiper-slide-active').attr('rel');
  	}
  	/* ====> Dynamic change 1 
  	   循环日期 */

  	$('#data').change(function(){
  		timeLine.swipeTo(parseInt($(this).val()), 1000, false);
  		changeLight();
  	})

  	/* <==== */
  	// siblings changes -input
  	$('.slec-box input').blur(function(){
  		setTimeout(function(){
  		$('.slec-box input').siblings('p').text($('.slec-box input').val())
  	},500)
  	});
  	// siblings changes -select
  	$('.slec-box select').change(function(){
  		console.log($(this).siblings('p').text($(this).val()))
  	});
  	// test input
  	$('input').blur(function(){
  		switch(parseInt($(this).attr('rel'))){
  			case 1:
  				($(this).val() == '') ? $(this).val('请输入姓名') : $(this).val();
  			break;
  			case 2:
  				($(this).val() == '') ? $(this).val('请输入11位手机号码') : $(this).val();
  			break;
  		}
  	});
  	$('input').focus(function(){
  		switch(parseInt($(this).attr('rel'))){
  			case 1:
  				($(this).val() == '请输入姓名') ? $(this).val('') : $(this).val();
  			break;
  			case 2:
  				($(this).val() == '请输入11位手机号码') ? $(this).val('') : $(this).val();
  			break;
  		}
  	});
  	// nav scroll
  	$('.menu li').on('click', function(){
  		switch(parseInt($(this).index())){
  			case 1:
  			$('html,body').animate({scrollTop: $(".toSwiper").offset().top}, 800);
  			break;
  			case 2:
  			$('html,body').animate({scrollTop: $(".show").offset().top}, 800);
  			break;
  			case 3:
  			$('html,body').animate({scrollTop: $(".show-gilrs").offset().top}, 800);
  			break;
  			case 4:
  			$('html,body').animate({scrollTop: $(".the-owner").offset().top}, 800);
  			break;
  			case 5:
  			$('html,body').animate({scrollTop: $(".customer").offset().top}, 800);
  			break;

  		}
  	});
  	// change light
  	function changeLight(){
  		setTimeout(function(){
		$('.time-box').removeClass('light')
  		$('.time-line .swiper-slide-active .time-box').eq(0).addClass('light')
		imgCopy.swipeTo(parseInt($('.time-line .swiper-slide-active .time-box').eq(0).attr('rel')), 1000, false);
  		},500)
  	}
});