$(document).ready(function(){
	// open layer
	$('.lamp-box img').click(function(){
		$('.layer').fadeIn()
		$('.layer .layer-model .model-img').attr('src',$(this).attr('src'))	
	});
	// close layer
	$('.layer .layer-model .close').click(function(){
		$('.layer').fadeOut()
	});
});