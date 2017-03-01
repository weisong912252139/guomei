$(function(){

  // localStorage.clear()
  // 点击添加地址跳转到编辑地址栏
  $('#addAddress').on('click', function() {

    window.location.href = 'addNewAddress.html'
  });

  //转换查询字符串和对象的函数
  function parse(str) {
    var obj = {};
    str.split('&').forEach(function (item) {
      var result = item.split('=');
      obj[result[0]] = result[1];
    });
    return obj;
  }

  // var morenObj = parse(localStorage.getItem('receiveAddress'));
  //
  // console.log(localStorage.getItem('receiveAddress'));
  // $('.addressAll li').eq(0).find('.acceptPeop').html(morenObj.name);
  // $('.addressAll li').eq(0).find('.acceptNum').html(morenObj.phone);
  // $('.addressAll li').eq(0).find('.newAdd').html(morenObj.address);



  // 进入页面默认获取后台的地址数据,有数据库时可以使用
  // $.ajax({
  //   type:'GET',
  //   url:'./allAddress',
  //   data:{
  //       data:'weisong'
  //   },
  //   success:function(response,state) {
  //
  //     $.each(response,function(index,item) {
  //       console.log(item);
  //       var str = `
  //       <li data-id=${item._id}>
  //         <div class="top">
  //           <address class="address">
  //             <img src="./img/uncheck.png" alt="" class="left">
  //             <div class="addressInfo left">
  //               <p class="people">
  //                 <span class="acceptPeop">${item.receiver}</span>
  //                 <span class="acceptNum">${item.phone}</span>
  //               </p>
  //               <p class="sendTarget">
  //                 <span class="moren">默认</span>
  //                 <span class="newAdd">${item.areaOne} ${item.areaTwo}</span>
  //
  //               </p>
  //             </div>
  //           </address>
  //         </div>
  //
  //         <div class="bottom">
  //           <span>
  //             <i class="icon-edit"></i>
  //             编辑
  //           </span>
  //         </div>
  //       </li>
  //       `;
  //
  //       $(str).appendTo($('.addressAll'));
  //
  //     })
  //
  //   }
  // });

  for(var i = 0; i < localStorage.length; i ++) {
        var k = localStorage.key(i);
        if(k.substring(0,10) == 'addAddress') {
          // console.log(k,localStorage.getItem(k));
          var item = parse(localStorage.getItem(k));
          var str = '<li data-id=' + item.times + '><div class="top"><address class="address"><img src="./img/uncheck.png" alt="" class="left"><div class="addressInfo left"><p class="people"><span class="acceptPeop">' + item.receiver+  '</span><span class="acceptNum">' +item.phone +  '</span></p><p class="sendTarget"><span class="moren ' + item.checked +'">默认</span><span class="newAdd">'+  item.areaOne + '</span><span class="detailedAddress">' +  item.areaTwo + '</span></p></div></address></div><div class="bottom" data-checked='+ item.checked + '><span><i class="icon-edit"></i>编辑</span></div></li>';
                $(str).appendTo($('.addressAll'));

                // 遍历当前的界面如果是默认的就勾选上
                $('.addressAll li').each(function(index,item) {
                  if($(this).find('.moren').hasClass('true')) {
                    $(this).siblings().find('img').attr('src',"./img/uncheck.png");
                    $(this).find('img').attr('src',"./img/checked.png");
                  }
                })

        }
  }





  // 点击返回按钮会到上一个页面
  $('#goback').click(function(){
    window.location.href = 'fillOrder.html'
  });



  // 点击地址的操作,让当前的地址存储到本地的格式如下
  // a=1&b=2&c=3的查询字符串的格式
  var str = '';
  var editorStr = '';
  $('.addressAll').on('click','li .top',function() {
    str = 'name=' +$(this).find('.acceptPeop').html()+'&phone=' + $(this).find('.acceptNum').html() +'&address=' + $(this).find('.newAdd').html() + '&checked=' + $(this).next().data('checked')
    localStorage.setItem('receiveAddress',str);
    console.log(localStorage.getItem('receiveAddress'))
    // 让当前 的状态是选中状态并且让其他所有的是 非选中状态
    $('.addressAll').find('address img').attr('src','./img/uncheck.png').end().find('.moren').removeClass('active')
    $(this).find('address img').attr('src','./img/checked.png').end().find('.moren').addClass('active');
    // $(this).parent().prependTo($('.addressAll'));
    // $('section').scrollTop(0)
  });

  // 点击编辑按钮让 进入编辑界面 并且让 传递 参数给 编辑地址界面
  // 同样使用本地存储的方式传递
  $('.addressAll').on('click','li .bottom',function() {
    editorStr = 'name=' +$(this).prev().find('.acceptPeop').html()+'&phone=' + $(this).prev().find('.acceptNum').html() +'&address=' + $(this).prev().find('.newAdd').html() + '&detailedAddress=' + $(this).prev().find('.detailedAddress').html() + '&data_id=' + $(this).parent().attr('data-id') + '&checked=' +  $(this).data('checked');

    console.log(editorStr)
    localStorage.setItem('editorAddress',editorStr);
    window.location.href = 'editorAddress.html'
  });








})
