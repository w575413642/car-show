$(document).ready(function(){
	// now them
	var mySwiper = new Swiper('.this-week',{
		pagination: '.week-pagination',
		loop:true,
		calculateHeight : true,
		paginationClickable: true
	})
	// time line
	var timeLine = new Swiper('.time-line',{
		slidesPerView : 6,
		calculateHeight : true,
		paginationClickable: true,
		onSlideTouch:function() {
			$('.time-line .swiper-slide').removeClass('light'); 
			$(timeLine.clickedSlide).addClass('light');
			imgCopy.swipeTo($(timeLine.clickedSlide).index(), 1000, false);
		}

	})
	// img copy
	var imgCopy = new Swiper('.img-copy',{
		slidesPerView : 1,
		calculateHeight : true,
		paginationClickable: true,
		onSlideChangeEnd: function(){
			console.log(imgCopy.activeIndex);
			$('.time-line .swiper-slide').removeClass('light'); 
			$('.time-line .swiper-slide').eq(imgCopy.activeIndex).addClass('light');
		}
	})
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
  	})
  	$('.click-swiper-owner .right').on('click', function(e){
    	e.preventDefault()
    	ownerSwiper.swipeNext()
  	})
});