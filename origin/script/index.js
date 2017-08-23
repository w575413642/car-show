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
	window.agoSwiper = new Swiper('.ago-swiper',{
		slidesPerView : 4,
		calculateHeight : true,
		paginationClickable: true
	})
	var gilrsSwiper = new Swiper('.gilrs-swiper',{
		slidesPerView : 4,
		calculateHeight : true,
		paginationClickable: true,
    onSlideClick: function(swiper){
      $('.layer').fadeIn();
        // img layer
      window.modelImg_P = new Swiper('.model-img',{
        slidesPerView : 1,
      })
      modelImg_P.swipeTo(gilrsSwiper.clickedSlideIndex,100,false)
    }
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
    // model
    $('.layer .layer-model .left').on('click', function(e){
      e.preventDefault()
      modelImg_P.swipePrev()
    });
    $('.layer .layer-model .right').on('click', function(e){
      e.preventDefault()
      modelImg_P.swipeNext()
    });
  	// change timeSelect
  	function timeSelect(){
  		$('#data').get(0).selectedIndex = $('.time-line .swiper-slide-active').attr('rel');
  	}
  	/* ====> Dynamic change 1 
  	   循环日期 - loop.data*/

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
    // focus
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
      navTo(parseInt($(this).index()))
  	});
    // close
    $('.close').click(function(){
        $('.layer').fadeOut()
    });
  	// change light
  	function changeLight(){
  		setTimeout(function(){
		$('.time-box').removeClass('light')
  		$('.time-line .swiper-slide-active .time-box').eq(0).addClass('light')
		imgCopy.swipeTo(parseInt($('.time-line .swiper-slide-active .time-box').eq(0).attr('rel')), 1000, false);
  		},500)
  	}
    // nav scrollTo
    window.navTo = function(target){
      switch(target){
        case 1:
        $('html,body').animate({scrollTop: $(".user").offset().top}, 800);
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
    }
    // hash to
  navTo(parseInt(location.hash.substr(1,2)));
    // scroll window
    $(window).scroll(function() {
        ($(document).scrollTop() > 200) ? $('.to-top').fadeIn() :  $('.to-top').fadeOut()
    });
    // click top
    $('.to-top').click(function(){
        $('html,body').animate({scrollTop: 0}, 800);
    })
    // test-drive -> click
    $('.test-drive').click(function(){
        navTo(5);
    });
});