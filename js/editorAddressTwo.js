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

  var addressObj = parse(localStorage.editorAddress);
  console.log(addressObj);

  // 获取localStorage的信息并且显示到页面上
  $('#receiver').val(addressObj.name);
  $('#to_phone').val(addressObj.phone);
  $('#areaAddress').val(addressObj.address);
  $('#areaTwo').val(addressObj.detailedAddress);
  if(addressObj.checked == 'true') {
    $('label .block').css('left','0.6rem');
    $('label .animate').css('background','red');
    $('#c').prop('checked',true);
  }

  $('#c').click(function() {
    if($(this).prop('checked')) {
      $('label .block').css('left','0.6rem');
      $('label .animate').css('background','red');
      $('#c').prop('checked',true);
    } else {
      $('label .block').css('left','0rem');
      $('label .animate').css('background','gray');
      $('#c').prop('checked',false);
    }
  })


  // 点击添加的时候验证数据的有效性包括 手机号要是 11位并且保证收货人不为空
  // 选择地区不能为空,详细地址不能为空,
  function checkPhone(){
      var phone = document.getElementById('to_phone').value;
      // console.log(phone == '');
      if(!(/^1[34578]\d{9}$/.test(phone))){
          return false;
      }
      return true;
  };

  // 验证保存按钮是否可用
  function isUse () {
    console.log(checkPhone(), $('#receiver').val() !== '' , $('#to_phone').val() !== '' , $('#areaAddress').val() !== '请选择' ,
    $('#areaAddress').val() !== '所在省份', $('#areaTwo').val() != '' )
    if(checkPhone() && $('#receiver').val() !== '' && $('#to_phone').val() !== '' && $('#areaAddress').html() !== '请选择' && $('#areaTwo').val() != '' ) {
      return true;
    } else {
      return false;
    }
  }


  $('#to_phone').on('focus',function() {
    console.log(1111)
    $('#to_phone').removeClass('active').val('');
  });
  $('#to_phone').on('blur',function() {
    if($(this).val() == '' || !checkPhone()) {
      $(this).val('请输入有效手机号').addClass('active');
    }
    // isUse ();
  });

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


  $('#addNew').click(function() {
    // console.log(isUse ())
    if(isUse ()) {
      var obj = {
        receiver:$('#receiver').val(),
        phone:$('#to_phone').val(),
        areaOne:$('#areaAddress').val(),
        areaTwo:$('#areaTwo').val(),
        checked:$('#c').prop('checked'),
        times:addressObj.data_id
      };
      console.log($('#c').prop('checked'));
      if($('#c').prop('checked')) {

        for(var i = 0; i < localStorage.length; i ++) {
              var k = localStorage.key(i);
              if(k.substring(0,10) == 'addAddress') {
                // console.log(k,localStorage.getItem(k));
                var item = parse(localStorage.getItem(k));
                // console.log(item)
                // 把其他所有的变为false,并且转化为字符串再返回
                item.checked = 'false';
                var str = stringify(item);
                localStorage.setItem(k,str);
                // console.log(k,localStorage.getItem(k));

              }
        }
      };
      var newStr = stringify(obj);
      localStorage.setItem('addAddress' + addressObj.data_id,newStr);
      window.location.href = 'receivingAddress.html'
      // $.ajax({
      //   type:'GET',
      //   url:'./updateAddress',
      //   data:{
      //       receiver:$('#receiver').val(),
      //       phone:$('#to_phone').val(),
      //       areaOne:$('#areaAddress').val(),
      //       areaTwo:$('#areaTwo').val(),
      //       checked:$('#c').prop('checked'),
      //       data_id:addressObj.data_id
      //   },
      //   success:function(response,state) {
      //     console.log(response );
      //     window.location.href = 'receivingAddress.html'
      //   },
      //   fail:function() {
      //     window.location.href = 'receivingAddress.html'
      //   }
      // });
    } else {
      if($('#receiver').val() == '') {
        $('#receiver').prop('placeholder','请输入用户').addClass('error');
      }
      if($('#to_phone').val() == '' || !checkPhone()) {
        $('#to_phone').prop('placeholder','请输入有效手机号').addClass('error');
      }
      if($('#areaAddress').val() == '') {
        $('#areaAddress').prop('placeholder','请选择地区').addClass('error');
      }
      if($('#areaTwo').val() == '') {
        $('#areaTwo').prop('placeholder','请输入具体地址').addClass('error');
      }
    }

  })

})
