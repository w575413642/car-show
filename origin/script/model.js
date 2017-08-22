$(document).ready(function(){
	// open layer
	$('.lamp-box img').click(function(){
		$('.layer').fadeIn()
		$('.layer .layer-model .model-img').attr('src',$(this).attr('src'))
			model.swipeTo($(this).index(),00,false)
	});
	// close layer
	$('.layer .layer-model .close').click(function(){
		$('.layer').fadeOut()
	});
	// model-img
		var model = new Swiper('.model-img',{
		slidesPerView : 1,
		paginationClickable: true,
	})
});