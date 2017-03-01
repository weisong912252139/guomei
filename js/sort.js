$(function() {
	$('.nav li').on("click", function() {
		$('.nav li').css({
			backgroundColor: 'rgb(236,236,236)',
			borderLeftWidth: 0,
			borderLeftColor: 'rgb(236,236,236)',
		});
		$(this).css({
			backgroundColor: 'white',
			borderLeftWidth: '0.1rem',
			borderLeftColor: 'red',
		});
		$('li').addClass('grape');
		$(this).siblings().find('p').removeClass('active');
		$(this).children().addClass('active');
		$('.listAll>div').eq($(this).index()).addClass('active').siblings().removeClass('active');
	});
	$('#goback').click(function(){
		history.go(-1);
	});
});