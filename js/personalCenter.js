$(function() {
  // 点击返回按钮会到上一个页面
  $('#goback').click(function(){
    history.go(-1);
  });

  // 点击我的收藏 出现我的收藏列表
  $('#myLove').click(function(){
  	$.ajax({
  		type:'get',
  		url:'./allLove',
  		success: function(response) {
  			console.log(response);
  			$.each(response,function(index,item) {
  				console.log(item);
  				var str = '\
  				<li class="clearfix" data-id=' + item.data_id+'>\
                <div class="shopImg left">\
                  <img src="' + item.imgsrc + '" alt="">\
                </div>\
                <div class="shopDetails left">\
                  <div class="shopDescript">\
                    <p>\
                      ' + item.shopDescription + '<br>\
                      <span>黑色:约2020万</span>\
                    </p>\
                  </div>\
                  <div class="priceNum">\
                    <span class="count">x <span>'+ item.shopNum +'</span></span>\
                    <p class="price">\
                      <span>¥</span>\
                      <span>' + item.shopPrice +'</span>\
                    </p>\
                  </div>\
                </div>\
              </li>\
  				';
  				$('.list-item').append($(str));
  				
  			})
  		}
  	})
  	
  	
    $('aside').css('display','block');
    $('aside .shoppingList').animate({
      right:0
    },400);
    $('aside .shoppingList .asideTitle').animate({
      right:0
    },400);
    
    
    
  });

  // 收藏的关闭按钮
  $('#closeList').click(function(){
    $('aside').css('display','none');
    $('aside .shoppingList').animate({
      right:'-10rem'
    },200);
    $('aside .shoppingList .asideTitle').animate({
      right:'-10rem'
    },200)
  })
  
  // 点击右上角关闭按钮,出现弹框
  $('#logout').click(function(){
    $('.alertModel').css({
      display:'block'
    })
  });
  // 点击弹框上的右上角的close按钮关闭弹窗
  $('#modelClose').click(function(){
    $('.alertModel').css({
      display:'none'
    })
  });

  // 点击继续支付 关闭 弹出框
  $('.continue').click(function(){
    $('.alertModel').css({
      display:'none'
    });
  });

})
