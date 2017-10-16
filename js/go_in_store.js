$(function(){
	$('.sort li').on('click',function(){
		$('.sort li').addClass('get_red');
		$(this).siblings().removeClass('get_red');
		var i=$(this).index();
		$('.red_tiao').css('left',i*1.875+'rem');
	});
	$('.show_sorts').on('click',function(){
		$('.all_sorts').show();
		$('.sorts>li').on('click',function(){
			$(this).siblings().find('.individual_sorts').css('display','none')
			$(this).find('.individual_sorts').css('display','block');
			$('.sorts>li').find('.biao').removeClass('down');
			$(this).find('.biao').addClass('down');
		});
		$('section').on('click',function(){
			$('.all_sorts').hide();
		});
	});
		$('#goback').click(function(){
			history.go(-1);
		});
});