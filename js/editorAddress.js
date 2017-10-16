$(function() {
  // 点击返回按钮会到上一个页面
  $('#goback').click(function(){
    window.location.href = 'receivingAddress.html'
  });
  $('#areaAddress').focus(function() {
    $('aside').css({
      display:'block',
      right:0
    });
  });
  $('section .area').click(function() {
    $('aside').css({
      display:'block',
      right:0
    });
  });
  // 选择城市中返回地址页面按钮
  $('aside #goback').click(function(){
    $('aside').css({display:'none',right:'7.5rem'})
  });
  // 选择城市中的关闭按钮
  $('#close').click(function(){
    $('aside').css({display:'none',right:'7.5rem'})
  });
  var province = '';
  var citys = '';
  var country = '';
  var areaAddress = '请选择';
  $('#areaAddress').html(areaAddress);

  // 城市选项发生变化时处理地址栏
  $('#province').change(function() {
//  console.log(this.options[this.selectedIndex].text);
    province = this.options[this.selectedIndex].text;
    $('#areaAddress').val(province);
  });


  $('#citys').change(function() {
    var that = this;
//  console.log(this.options[this.selectedIndex].text);
    citys = this.options[this.selectedIndex].text == '你所在城市' ? '':this.options[this.selectedIndex].text;
    $('#areaAddress').val(province + citys);
  });

  $('#county').change(function() {
    var that = this;
//  console.log(this.options[this.selectedIndex].text);
    country = this.options[this.selectedIndex].text == '你所在区/县' ? '':this.options[this.selectedIndex].text;
    $('#areaAddress').val(province + citys + country);
  });
});
