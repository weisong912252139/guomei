$(function(){

  // 点击返回按钮会到上一个页面
  $('#goback').click(function(){
    history.go(-1);
  });

  function parse(str) {
    var obj = {};
    str.split('&').forEach(function (item) {
      var result = item.split('=');
      obj[result[0]] = result[1];
    });
    return obj;
  }

  console.log(parse(window.location.search.substring(1)).sumPrice);
  $('#sumPrice').html(parse(window.location.search.substring(1)).sumPrice)

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
