$(function () {
  // 点击返回按钮会到上一个页面
  $('#goback').click(function(){
    window.location.href = 'index.html'
  });

  // $(document).click(function(event) {
  //   window.location.href = 'index.html'
  // })

  // 点击复选框的选中与非选中状态
  // $('label img').click(function(event) {
  //   console.log(11)
  //   if($(this).next().prop('checked')) {
  //     this.src = './img/uncheck.png';
  //   } else {
  //     this.src = './img/checked.png';
  //   };
  // });

  // 点击全选和不全选
  $('#allCheck img').click(function() {

    if($(this).data('check')){
      $(this).data('check','');
      this.src = './img/uncheck.png';
      $('section .list label img').attr('src','./img/uncheck.png').data('check','');
    } else {
      // 全选中,让section 中所有的全选中,没有data-check属性
      $(this).data('check','true');
      this.src = './img/checked.png';
      $('section .list label img').attr('src','./img/checked.png').data('check','true');

    }

    countAll ();

  })

  // 点击一个店下面的商品全选
  $('section').on('click','.list .listOne img',function() {
    console.log($(this).data('check'));
    var state = $(this).data('check');
    if(state) {
      // 如果是选中状态变为非选中
      $(this).attr({
        src:'./img/uncheck.png'
      }).data('check','');
      // 让对应的子元素变为非选中状态
      $(this).parent().parent().next().find('label img').attr('src','./img/uncheck.png').data('check','');

    } else {
      // 没有选中,变为选中状态
      $(this).attr({
        src:'./img/checked.png'
      }).data('check','true');

      // 让对应的子元素改变为全选
      $(this).parent().parent().next().find('label img').attr('src','./img/checked.png').data('check','true');
    };

    // 最下面的勾选状态
    checkBottom ();

    countAll ();



  });

  function checkBottom () {
    // 如果上面全选了,让下面全选变为选中
    if(isAll($('section'))) {
      // 这里全选了,让全选按钮勾上
      $('#allCheck img').attr('src','./img/checked.png').data('check','true');
    }  else {
      // 取消勾选 状态
      $('#allCheck img').attr('src','./img/uncheck.png').data('check','');
    }
  }


  // 每一件商品的点击状态的改变只有的操作
  $('section').on('click','.list-item label img', function() {
    // 获取原来的件数和总价格
    var allNum = parseInt($('#allNum').html()) ;
    var sumPrice = parseInt($('#sumPrice').html());

    console.log($(this).data('check'));
    var bool = $(this).data('check');
    if(bool) {
      // 表示为选中状态,修改为未选中
      $(this).attr('src','./img/uncheck.png').data('check','');

      // 修改总的件数和价格
      var a = parseInt($(this).parent().parent().parent().parent().find('.countNum').html());
      $('#allNum').html(allNum - a);


    } else {
      // 表示未选中,修改为选中状态
      $(this).attr('src','./img/checked.png').data('check','true');

      // 修改总的件数和价格
      var b = parseInt($(this).parent().parent().parent().parent().find('.countNum').html());
      $('#allNum').html( allNum + b);

    };
    // 判断当前的这个商店内是否全部勾选
    // alert(isAll($(this).parent().parent().parent().parent()))
    if(isAll($(this).parent().parent().parent().parent())) {
      // 表示当前商店内被全部选中,应该被勾选上
      $(this).parent().parent().parent().parent().prev().find('label img').attr('src','./img/checked.png').data('check','true');
    } else {
      // 表示当前商店内没有全部勾上,取消当前的勾勾
      $(this).parent().parent().parent().parent().prev().find('label img').attr('src','./img/uncheck.png').data('check','');
    };
    checkBottom ();
    countAll ();
  })


  // 检测看当前页面内所有元素是否都被选中,如果是返回true,否则返回false
  function isAll (elem) {
    // $(elem).find('label img').data('check');
    var bool = true;
    $(elem).find('label img').each(function(index,item) {
      if(!$(this).data('check')) {
        bool = false;
        return bool;
      }
    });
    return bool;
  };

  // 点击编辑的编辑状态
  $('section').on('click','.list .editor', function() {
    if($(this).html() == '完成') {
      $(this).html('编辑');
      $(this).parent().next().find('.price').css('display','block');
      $(this).parent().next().find('.deleOrLike').css('display','none');
    } else {
      $(this).html('完成');
      // console.log($(this).parent().parent().index())
      $(this).parent().next().find('.price').css('display','none');
      $(this).parent().next().find('.deleOrLike').css('display','block');
      isLove ()
    };



  });


  //这个函数用来判断 当前元素的data-id属性在喜欢列表中是否有显示,如果已经加入过收藏夹就让当前的图标变成红色的,如果没有就是默认颜色
  function isLove () {
  	$.ajax({
  		type:'get',
  		url:'./allLove',
  		success: function(response) {
//			console.log(response);
  			var arr = [];
  			$.each(response,function(index,item) {

				arr.push(item.data_id);
  			});
  			$('section li').each(function(index,item) {
				if($.inArray($(this).data('id'),arr) != -1) {
					// console.log($.inArray($(this).data('id'),arr));
					$(this).find('.deleOrLike i').eq(0).addClass('active');
				}
			})

  		}
  	})
  }



  // 点击让件数加加
  $('section').on('click','.next',function(){
    $(this).prev().html(function(i,value) {
      return parseInt(value) + 1;
    });

    countAll ();
  });

  $('section').on('click','.prev', function(){
    $(this).next().html(function(i,value) {
      if(value == 1) {
        return 1;
      } else {
        return parseInt(value) - 1;
      }

    });

    countAll ();
  });




  // 点击的时候计算总价格和总的件数;

   function countAll () {
     var allNum = 0;
     var sumPrice = 0;
     $('.list-item li').each(function(index,item) {
      //  如果当前的 这件物品被选中
       if($(this).find('label img').data('check')) {
         var a = parseFloat($(this).find('.countNum').html());
         allNum += a;
         var b = parseFloat($(this).find('.eachPrice').html()) * a;
         sumPrice += b ;
       }
     });

     $('#allNum').html(allNum);
     $('#sumPrice').html(sumPrice);

   }


  //  在编辑按钮中 点击删除 按钮的操作 ,删除后台中的数据,成功之后再删除页面的数据
  $('section').on('click','.list .icon-trash',function(){
     var that = this;
    // console.log($(this).parent().parent().parent().parent().remove());
    $.ajax({
      type:'get',
      url:'./deleteGoods',
      data:{
        data_id: $(this).parent().parent().parent().parent().data('id')
      },
      success:function(response) {

      },
      complete:function() {
        // $(that).parent().parent().parent().parent().remove()
        // 完成只有移除当前元素
        // console.log();
        console.log($(that).parent().parent().parent().parent().parent().children().length)
        // 完成之后判断当前元素的父元素是否子元素如果没有删除该元素的父元素
        if($(that).parent().parent().parent().parent().parent().children().length == 1) {
          // $(that).parent().parent().parent().parent().remove()
          $(that).parent().parent().parent().parent().parent().parent().remove()
        } else {
          $(that).parent().parent().parent().parent().remove()
        }


        countAll ()
      }
    });

  });


  //  在编辑按钮中 点击收藏 按钮的操作 ,如果是还没有收藏就添加类名active,并且添加到收藏夹中 , 如果是已经收藏过的就移除类名,并且从数据库中移除
  $('section').on('click','.list .icon-heart-empty',function(){
    if($(this).hasClass('active')) {
    	 //console.log($(this).parent().parent().parent().parent().data('id'));
      // 已经喜欢了变为不喜欢
      $(this).removeClass('active');

      $.ajax({
        type:'GET',
        url:'./delLoveGoods',
        data: {
          id:$(this).parent().parent().parent().parent().data('id')
        },
        success:function(response,state) {
          console.log('现在不喜欢了');
      	  console.log(response);
//        $(this).removeClass('active');
        }
      });
    } else {
//  	data= {
//        shopNum : $(this).parent().parent().parent().parent().find('.countNum').html(),
//        shopPrice:$(this).parent().parent().parent().parent().find('.eachPrice').html(),
//        imgsrc:$(this).parent().parent().parent().parent().find('.shopImg img').attr('src'),
//        shopDescription : $(this).parent().parent().parent().parent().find('.shopDescript p').text(),
//        shopName:$(this).parent().parent().parent().parent().parent().prev().find('.name').html()
//      }
//  	console.log(data);
      $(this).addClass('active');
      console.log('喜欢了');
      $.ajax({
        type:'GET',
        url:'./loveGoods',
        data: {
          shopNum : $(this).parent().parent().parent().parent().find('.countNum').html(),
          shopPrice:$(this).parent().parent().parent().parent().find('.eachPrice').html(),
          imgsrc:$(this).parent().parent().parent().parent().find('.shopImg img').attr('src'),
          shopDescription : $(this).parent().parent().parent().parent().find('.shopDescript p').text(),
          shopName:$(this).parent().parent().parent().parent().parent().prev().find('.name').html(),
          data_id:$(this).parent().parent().parent().parent().data('id')
        },
        success:function(response,state) {
          console.log(response );
        }
      });
    }
  });

  // 点击去结算的时候做一些判断,如果没有被勾选的就不跳转,如果有勾选的再做跳转
  $('.accounts').click(function() {
    if($('#allNum').html() != 0) {

      // $('section .list-item li').each(function(index,item) {
      //   // console.log(index,item);
      //   if($(this).find('label img').data('check') == 'true') {
      //     $.ajax({
      //       type:'get',
      //       url:'./addList',
      //       data: {
      //         shopNum : $(this).find('.countNum').html(),
      //         shopPrice:$(this).find('.eachPrice').html(),
      //         imgsrc:$(this).find('.shopImg img').attr('src'),
      //         shopDescription : $(this).find('.shopDescript p').text(),
      //         data_id:$(this).data('id')
      //       },
      //       success : function(response) {
      //         console.log(response);
      //
      //       }
      //     })
      //   }
      // });

      window.location.href = 'fillOrder.html?sumPrice=' + $('#sumPrice').html();
      localStorage.setItem('sumPrice',$('#sumPrice').html())


    } else {
      alert('请选择要结算的商品')
    }

  })
})
