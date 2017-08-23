// status Nav
$('.menu .li a').click(function(e){
	var ev = window.event || e;
	ev.preventDefault();
	if (status == 1) return ;
	window.open($(this).attr('href'));
})

$('.sidebar .test-drive').click(function(e){
	var ev = window.event || e;
	ev.preventDefault();
	if (status == 1) return ;
	window.open($(this).attr('rel'));
})