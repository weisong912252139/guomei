$(function() {
  $.ajax({
    type: 'get',
    url :'/showAll',
    success: function (response) {
      for(var i = 0,len = response.length; i < len; i ++) {
        // console.log(response[i])
        // console.log(checkUnique(response[i].shopName));
        if(checkUnique(response[i].shopName)) {
          var str = `
          <div class="list">
            <p class="shopName">
              <label class="listOne">
                <img src="./img/uncheck.png" alt="">
              </label>


              <span class="name">${response[i].shopName}</span>
              <span class="editor">编辑</span>
            </p>
            <ul class="list-item">
              <li class="clearfix" data-id=${response[i]._id}>
                <div class="checkOne left">
                  <label>
                    <img src="./img/uncheck.png" alt="">
                  </label>
                </div>
                <div class="shopImg left">
                  <img src=${response[i].imgsrc} alt="">
                </div>
                <div class="shopDetails left">
                  <div class="shopDescript">
                    <p>
                      ${response[i].shopDescription}<br>
                      <span>黑色:约2020万</span>

                    </p>
                  </div>

                  <div class="priceNum clearfix">
                    <div class="price left">
                      <span>¥</span>
                      <span class="eachPrice">${response[i].shopPrice}</span>
                    </div>
                    <div class="deleOrLike left">
                      <i class="icon-heart-empty"></i> | <i class="icon-trash"></i>
                    </div>

                    <div class="count right">
                      <span class="prev">-</span>
                      <span class="countNum">${response[i].shopNum}</span>
                      <span class="next">+</span>
                    </div>
                  </div>
                </div>


              </li>
            </ul>

          </div>
          `;

          // console.log('没有相同的商店')

          // $(str).appendTo($('section'));
          $('.clearDisable').before($(str));
        } else {
          $('section .list').each(function(index,item) {

            if($(this).find('.name').html() == response[i].shopName) {
              var str = `
              <li class="clearfix" data-id=${response[i]._id}>
                <div class="checkOne left">
                  <label>
                    <img src="./img/uncheck.png" alt="">
                  </label>
                </div>
                <div class="shopImg left">
                  <img src=${response[i].imgsrc} alt="">
                </div>
                <div class="shopDetails left">
                  <div class="shopDescript">
                    <p>
                      ${response[i].shopDescription}<br>
                      <span>黑色:约2020万</span>

                    </p>
                  </div>

                  <div class="priceNum clearfix">
                    <div class="price left">
                      <span>¥</span>
                      <span class="eachPrice">${response[i].shopPrice}</span>
                    </div>
                    <div class="deleOrLike left">
                      <i class="icon-heart-empty"></i> | <i class="icon-trash"></i>
                    </div>

                    <div class="count right">
                      <span class="prev">-</span>
                      <span class="countNum">${response[i].shopNum}</span>
                      <span class="next">+</span>
                    </div>
                  </div>
                </div>


              </li>
              `;

              $(this).find('.list-item').html(function(index,doc) {
                return doc + str;
              });


            }
          })
        }
      }
    }
  });

//function checkLove () {
//
//	$('section li').each(function(index,item) {
//		console.log(isLove ($(this).data('id')));
//	})
//}



  function checkUnique (name) {
    // console.log(  $('section .name').length);
    // 如果返回true 表示店铺名字是唯一的就要新创建,如果返回false ,就说明有一样的店铺,就加载当前店铺下面
    var unique = true;
    $('section .name').each(function(index,item) {
      // console.log($(this).html(),name)
      if($(this).html() == name) {
        unique = false;
        return unique;
      }
    });
    return unique;
  };






})
