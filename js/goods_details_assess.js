$(function(){
	//转换查询字符串和对象的函数
	function parse(str) {
	    var obj = {};
	    str.split('&').forEach(function (item) {
	      var result = item.split('=');
	      obj[result[0]] = result[1];
	    });
	    return obj;
	}
	function stringify(obj) {
	    var str = '';
	    for (var attr in obj) {
	      if (str) {
	        str += '&' + attr + '=' + obj[attr];
	      } else {
	        str += attr + '=' + obj[attr];
	      }
	    }
	    return str;
	}
	 for(var i = 0; i < localStorage.length; i++) {
	 	var times = new Date().getTime();
	    	var k = localStorage.key(i);
//	    console.log(localStorage)
	    	if(k.substring(0,5) == 'issue') {
	    			//console.log(k,localStorage.getItem(k));
	    		$('.neirong').html(function(index,item) {
			return item + '<li data-k='+k+'><div class="content">'+
			'<img class="head_portrait" src="img/headPortrait.png" />'+
			'<span class="name">松子</span><img src="img/xingxing.png" />'+
			'<p class="text">'+localStorage.getItem(k)+'</p>'+
			'<span class="commodity">颜色:银灰 版本:全网通</span><p class="buy_time">'+localStorage.getItem('times')+'</p></div><input class="btn2" type="button" value="删除" /></li>';
			});
			$('.comments').html(function(index,item){
				return item+'<li  data-k='+k+' class="content">'+
								'<img class="head_portrait" src="img/headPortrait.png" />'+
								'<span class="name">松子</span>'+
								'<img src="img/xingxing.png" />'+
								'<p class="text">'+localStorage.getItem(k)+'</p>'+
								'<span class="commodity">颜色:银灰 版本:全网通</span>'+
							'</li>'
			});
		}
	}


	$('.data div').on('click',function(){
		$('.data div').addClass('title');
		$(this).siblings().removeClass('title');
		var i=$(this).index();
		$('.red_tiao').css('left',0.7+i*1.7+"rem");
		$('.texts>li').eq(i).addClass('show').siblings().removeClass('show');
		$('.details>li').on('click',function(){
			$('.details>li').addClass('marque');
			$(this).siblings().removeClass('marque');
			var i=$(this).index();
			$('.parameter>li').eq(i).addClass('show1').siblings().removeClass('show1');
		});
	});
	var timer=setInterval(function(){
		for (var i=0;i<$('.bo>img').length;i++) {
			$('.bo').animate({
				left: -$('.view').width() * i
			},2000);
		}
	},500);
	var num = $('#shopNum').val();
	var remainNum = $('.remainNum').html();

	$('.jian').click(function(){


		if(num <= 1) {
			$('#shopNum').val('1');
		} else {
			num --;
			remainNum ++;
			$('#shopNum').val(num);
			$('.remainNum').html(remainNum);
		}
	});
	$('.jia').click(function(){




		// console.log(remainNum,num);
		if(remainNum > 0) {
			num ++;
			remainNum --;
			$('#shopNum').val(num);
			$('.remainNum').html(remainNum);
		} else {
			alert('没有剩余的商品了')
		}

	});
	$('.area').click(function(){
		var province = '';
		var citys = '';
		var country = '';

		$('#province').change(function() {
   			province = this.options[this.selectedIndex].text;
    			$('.select_province').html(province);
  		});
  		$('#citys').change(function() {
   			province = this.options[this.selectedIndex].text;
    			$('.select_city').html(province);
  		});
  		$('#county').change(function() {
   			province = this.options[this.selectedIndex].text;
    			$('.select_county').html(province);
					$('aside').css({display:'none',right:'7.5rem'})
  		});
	})
	 $('.goback').click(function(){
    		$('aside').css({display:'none',right:'7.5rem'})
 	 });
});
