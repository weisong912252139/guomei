$(function(){
	localStorage.setItem('issue','我是潘亚飞');
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
     $('.btn').on('click',function(){
     	if ($('.add').val()=='') {
			return alert('请输入内容');
		}
     	var times = new Date().getTime();
     	var str = $('.add').val();
     	localStorage.setItem('times',times);
     	localStorage.setItem('issue' + times,str);
     		$('.neirong').html(function(index,item) {
			return item + '<li data-k=issue' + times + '><div class="content">'+
			'<img class="head_portrait" src="img/headPortrait.png" />'+
			'<span class="name">松子</span><img src="img/xingxing.png" />'+
			'<p class="text">'+$('.add').val()+'</p>'+
			'<span class="commodity">颜色:银灰 版本:全网通</span><p class="buy_time">3013-08-23 17:37:00</p></div><input class="btn2" type="button" value="删除" /></li>';
		});
// var str = `
// <li data-k=issue${times} class="content">
// 	<img class="head_portrait" src="img/headPortrait.png" />
// 	<span class="name">松子</span>
// 	<img src="img/xingxing.png" />
// 	<p class="text">${$('.add').val()}</p>
// 	<span class="commodity">颜色:银灰 版本:全网通</span>
// </li>
// `;
// $('.comments').append($(str));
$('.comments').html(function(index,item){
	return item+'<li  data-k==issue'+times+' class="content">'+
					'<img class="head_portrait" src="img/headPortrait.png" />'+
					'<span class="name">松子</span>'+
					'<img src="img/xingxing.png" />'+
					'<p class="text">'+$('.add').val()+'</p>'+

					'<span class="commodity">颜色:银灰 版本:全网通</span>'+
				'</li>'
});
$('.add').val('');
     });

     $('.neirong').on('click','li .btn2',function(){
//console.log($(this).parent(),$(this).parent().data('k'))
     	$('.comments').find('li').eq($(this).parent().index()).remove()
     	localStorage.removeItem($(this).parent().data('k'))
     	$(this).parent().remove();
     })
})
