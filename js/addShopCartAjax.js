$(function() {


  //获得当前时间,刻度为一千分一秒
  function showNowTime(){
      var now=new Date();
      var year=now.getFullYear();
      var month=now.getMonth() + 1;
      var day=now.getDate();
      var hours=now.getHours();
      var minutes=now.getMinutes();
      var seconds=now.getSeconds();
      return ""+year+"年"+month+"月"+day+"日 "+hours+":"+minutes+":"+seconds+"";
  }
  // 点击添加购物车的操作
  $('#addShoppingCart').click(function() {
    $.ajax({
      type:'GET',
      url:'./addGoods',
      data: {
        shopNum : $('#shopNum').val(),
        shopPrice:$('#shopPrice').html(),
        imgsrc:$('#shopImg').attr('src'),
        shopDescription : $('#shopDescription').html(),
        shopName:$('#shopName').html()
      },
      success:function(response,state) {
        console.log(response );
      }
    });
  });

  // 点击收藏 添加到收藏夹
  $('#love').click(function() {
    // 根据用户点击的次数在该元素添加自定义属性, 如果是喜欢就为data-love = true,否则为空值
    // 首先判断该元素上是否有属性为data-love如果没有就该属性
    // $(this).find('i').toggleClass('active');
    console.log($(this).find('i').hasClass('active'));
    if($(this).find('i').hasClass('active')) {
      // 已经喜欢了变为不喜欢
      $(this).find('i').removeClass('active');
      console.log('现在不喜欢了');
      $.ajax({
        type:'GET',
        url:'./delLoveGoods',
        data: {
          shopDescription : $('#shopDescription').html(),
          shopName:$('#shopName').html()
        },
        success:function(response,state) {
          console.log(response );
        }
      });
    } else {
      $(this).find('i').addClass('active');
      console.log('喜欢了');
      $.ajax({
        type:'GET',
        url:'./loveGoods',
        data: {
          shopNum : $('#shopNum').val(),
          shopPrice:$('#shopPrice').html(),
          imgsrc:$('#shopImg').attr('src'),
          shopDescription : $('#shopDescription').html(),
          shopName:$('#shopName').html()
        },
        success:function(response,state) {
          console.log(response );
        }
      });
    }

  });




})
