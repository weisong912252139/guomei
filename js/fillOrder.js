$(function() {
  // 点击返回按钮会到上一个页面
  $('#goback').click(function(){
    window.location.href = 'shoppongcart.html'
  });
  $('address').click(function() {
    window.location.href = 'receivingAddress.html'
  });

  // 获取前一个页面的商品价格
  // console.log(window.location.search);


  $('#shopSum').html(localStorage.getItem('sumPrice'));

  $('.payMoney').html(localStorage.getItem('sumPrice'))

  if(!localStorage.getItem('receiveAddress')) {
    var obj = {
      name:'姓名',
      phone:'电话',
      address:'请点击选择地址'
    }
    var moren = stringify(obj)

    localStorage.setItem('receiveAddress',moren)
  }




  //根据用户点击的那个让页面显示对应的地址
  var addressObj = parse(localStorage.getItem('receiveAddress'))
  $('address .acceptPeop').html(addressObj.name);
  $('address .acceptNum').html(addressObj.phone);
  $('address .newAdd').html(addressObj.address);
  $('address .moren').addClass(addressObj.checked);


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




  // 点击填写订单上的地址栏的时候跳转到接收订单页面
  // $('#address').click(function() {
  //   $('.sa_header').css('display','block').animate({
  //     right:0
  //   },200);
  //   $('.sa_footer').css('display','block').animate({
  //     right:0
  //   },200);
  //   $('.selectAddress').css('display','block').animate({
  //     right:0
  //   },200)
  //   // window.location.href = 'receivingAddress.html';
  // });
  // $('#sa_back').click(function() {
  //   $('.sa_header').css('display','block').animate({
  //     right:'-10rem'
  //   },200);
  //   $('.sa_footer').css('display','block').animate({
  //     right:'-10rem'
  //   },200);
  //   $('.selectAddress').css('display','none').animate({
  //     right:'-10rem'
  //   },200);
  // });

  // 对收货地址中的单选按钮进行操作
  // $('.addressAll .checkImg img').click(function() {
  //
  // })
  // 点击收货地址中的新增收货地址跳转至新增页面
  // $('.sa_footer button').click(function() {
  //   console.log('wekj ')
  //   window.location.href = 'addNewAddress.html'
  // })

  // 点击出现购物的列表
  $('#rightList').click(function() {
    $('aside').fadeIn(800);
    $('aside .shoppingList .asideTitle').animate({
      right:0
    },500);

    $('aside .shoppingList').animate({
      right:0
    },500);
  });

  // 加载页面默认 加载 购物列表里面的信息,有后台数据库时可以使用
  // $.ajax({
  //   type:'get',
  //   url:'./getList',
  //   success : function(response) {
  //     $.each(response,function(index,item) {
  //       // console.log(index,item);
  //       var str = `
  //       <li class="clearfix" data-id=${item.data_id}>
  //         <div class="shopImg left">
  //           <img src="${item.imgsrc}" alt="">
  //         </div>
  //         <div class="shopDetails left">
  //           <div class="shopDescript">
  //             <p>
  //               ${item.shopDescription}<br>
  //
  //             </p>
  //           </div>
  //
  //           <div class="priceNum">
  //             <span class="count">x <span>${item.shopNum}</span></span>
  //             <p class="price">
  //               <span>¥</span>
  //               <span>${item.shopPrice}</span>
  //             </p>
  //           </div>
  //         </div>
  //       </li>
  //       `;
  //       $('aside .list-item').append($(str));
  //
  //     })
  //   }
  // })

  // 购物列表的关闭按钮
  $('#closeList').click(function() {
    $('aside').fadeOut(800);
    $('aside .shoppingList .asideTitle').animate({
      right:'-10rem'
    },500);

    $('aside .shoppingList').animate({
      right:'-10rem'
    },500);
  });
  // 点击屏幕也可以隐藏当前
  // $('aside').click(function() {
  //   $('aside').css('display','none');
  // });

  // 发送方式的侧边栏
  $('#sendOne').click(function() {
    $('.sendMessage').css('display','block');
  });

  // 发送方式的选择 侧边栏的点击操作和修改数据
  $('.sendMessage #back').click(function() {
    $('.sendMessage').css('display','none');
  });
  $('.sendMessage .sendTime span').click(function() {
    $(this).addClass('active').siblings().removeClass('active');
    $('#sendTime').html($(this).html());
  });

  $('.sendMessage .sendMethod span').click(function() {
    $(this).addClass('active').siblings().removeClass('active');
    $('#sendMethod').html($(this).html())
  });


  $('.sendMessage #sure').click(function() {
     $('.sendMessage').css('display','none');
  });



  // 发票的选择 侧边栏的点击操作和修改数据
  //
  // // 发票的侧边栏
  var isNeed = true;
  $('#sendTwo').click(function() {
    $('.invoice').css('display','block');
  });
  $('.invoice #invoiceback').click(function() {
       $('.invoice').css('display','none');
  });

  $('#need').click(function() {
    $(this).addClass('active').siblings().removeClass('active');
    $('.selectOne').css('display','block');
    $('.selectTwo').css('display','block');
    $('.invoiceOne').html($('.selectOne .option .active').html());
    $('.invoiceTwo').html($('.selectTwo .option .active').html());
  });
  $('#notNeed').click(function() {
    $(this).addClass('active').siblings().removeClass('active');
    $('.selectOne').css('display','none');
    $('.selectTwo').css('display','none');
    $('.invoiceOne').html('不需要发票');
    $('.invoiceTwo').html('不需要明细');
  });

  $('.selectOne .option span').click(function(){
    $(this).addClass('active').siblings().removeClass('active');
    $('.invoiceOne').html($(this).html());
  });
  $('.selectTwo .option span').click(function(){
    $(this).addClass('active').siblings().removeClass('active');
    $('.invoiceTwo').html($(this).html());
  })



  $('.invoice #invoicesure').click(function() {
    if($('#need').hasClass('active')) {
      $('.invoiceOne').html($('.selectOne .option .active').html());
      $('.invoiceTwo').html($('.selectTwo .option .active').html());

    };
    $('.invoice').css('display','none');


  });

  // 点击提交订单的时候点击提交订单按钮的操作
  $('.submit').click(function() {
    window.location.href = 'orderPayment.html?sumPrice=' + $('.payMoney').html();
  })




  // // 获取search值得内容并且显示在页面内
  // function parse(str) {
	// 	var obj = {};
	// 	var arr = str.substring(1).split('&');
	// 	for (var i = 0; i < arr.length; i++) {
	// 		var arr1 = arr[i].split('=');
	// 		obj[arr1[0]] = arr1[1];
  //
	// 	}
  //
	// 	return obj;
	// };
  // var obj = parse(decodeURI(location.search));
  // $('#sendTime').html(obj.sendTime);
  // $('#sendMethod').html(obj.sendMethod);

})
