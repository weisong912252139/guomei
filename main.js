var express = require('express');
app = express();

var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://127.0.0.1:27017/shoppingCart');

//   此数据库 名字为 shoppingCart
//   此数据库下一共需要 4个集合 分别为 allList , loveGoods,
//   receiptAddress   shopping

db.connection.on('error',function(err){
    console.log('链接数据库失败' + err);
})

db.connection.on('open',function(){
    console.log('链接数据库成功')
})

// 我的收货地址集合
var myAddress = new mongoose.Schema({
  receiver : {type:String},
  phone  : {type:Number},
  areaOne : {type:String},
  areaTwo: {type:String},
  checked:{type:String}
},{
    collection:'receiptAddress'
})

var ModelAddress = db.model('receiptAddress',myAddress);

// 处理前端传送  添加  地址的数据
app.get('/addNewAddress',function(request,response){
    console.log(request.query);
    // 把前端接收的数据保存在数据库中
    ModelAddress.create({
      receiver:request.query.receiver,
      phone:request.query.phone,
      areaOne:request.query.areaOne,
      areaTwo:request.query.areaTwo,
      checked:request.query.checked
    },function(err,doc){
        if(err){
            console.error(err);
        } else {
            response.send('插入成功')
        }
    });

});

// 处理前端传送  更新  收货地址的数据
app.get('/updateAddress',function(request,response){
    console.log(request.query);
    // 把前端接收的数据保存在数据库中
    ModelAddress.update({
      _id:request.query.data_id
    },{
      $set:{
        receiver:request.query.receiver,
        phone:request.query.phone,
        areaOne:request.query.areaOne,
        areaTwo:request.query.areaTwo,
        checked:request.query.checked,
      }
    },function(err,doc){
        if(err){
            console.error(err);
        } else {
            response.send('更新成功')
        }
    });

});

// 处理前台 请求 所有 收货地址的接口

app.get('/allAddress',function(request,response){
    ModelAddress.find({},null,function(err,doc){
        if(err){
            response.send({err:1,msg:'fail'});
            return console.error(err);
        } else {
            response.send(doc);
        }
    });

});


// 我的购物车集合
var myTableSchema = new mongoose.Schema({
    shopNum : {type:String},
    shopPrice  : {type:Number},
    imgsrc : {type:String},
    shopDescription: {type:String},
    shopName:{type:String}
},{
    collection:'shopping'
});

var ModelTable = db.model('shopping',myTableSchema);

// 测试请求
app.get('/test',function(request,response){
  console.log(request.query)
  response.send('删除数据成功!');
})


// 根据前端传递过来的数据判断是否应该添加到购物车
app.get('/findUnique',function(request,response){
    console.log(request.query.index);
    ModelTable.find({index : request.query.index},function(err,doc) {
        if(err){
            return console.error(err);
        } else {
            console.log(doc.length);
            if(doc.length == 0) {
                response.send({err:0})
            } else {
                response.send({err:1})
            }
        }
    });



})


// 处理前端传送添加购物车的数据
app.get('/addGoods',function(request,response){
    console.log(request.query);
    // 把前端接收的数据保存在数据库中
    ModelTable.create({
        shopNum :request.query.shopNum,
        shopPrice:request.query.shopPrice,
        imgsrc:request.query.imgsrc,
        shopDescription:request.query.shopDescription,
        shopName:request.query.shopName
    },function(err,doc){
        if(err){
            console.error(err);
        } else {
            response.send('插入成功')
        }
    });

});

// 处理前端传送  删除购物车的数据

app.get('/deleteGoods',function(request,response){
    // console.log(request.query);
    ModelTable.remove({_id:request.query.data_id},function(err){
        if(err){
            return console.error(err);
        } else {
            response.send('删除数据成功');
        }
    })
});


// 处理 添加 收藏的 集合操作

var mySchema = new mongoose.Schema({
  shopNum : {type:String},
  shopPrice  : {type:String},
  imgsrc : {type:String},
  shopDescription: {type:String},
  shopName:{type:String},
  data_id:{type:String}
},{
    collection:'loveGoods'
})

var Model = db.model('loveGoods',mySchema);

// 处理前端传送 添加收藏 的数据
app.get('/loveGoods',function(request,response){
    console.log('sdfdf' + request.query.shopNum);
    // 把前端接收的数据保存在数据库中
    Model.create({
        shopNum :request.query.shopNum,
        shopPrice:request.query.shopPrice,
        imgsrc:request.query.imgsrc,
        shopDescription:request.query.shopDescription,
        shopName:request.query.shopName,
        data_id:request.query.data_id
    },function(err,doc){
        if(err){
            console.error(err);
        } else {
            response.send('收藏成功')
        }
    });

});


// 处理前端传送 取消收藏 的数据
app.get('/delLoveGoods',function(request,response){
    console.log(request.query);
    // 把前端接收的数据保存在数据库中
    Model.remove({data_id:request.query.id},function(err){
        if(err){
            return console.error(err);
        } else {
            response.send('已经删除');
        }
    })

});

// 用来返回收藏中的所有 元素到前端 集合中已经保存过的数据到前台
app.get('/allLove',function(request,response){
    Model.find({},null,function(err,doc){
        if(err){
            response.send({err:1,msg:'fail'});
            return console.error(err);
        } else {
            response.send(doc);
        }
    });

});



// 我的  全部订单列表  集合
var allListSchema = new mongoose.Schema({
    shopNum : {type:String},
    shopPrice  : {type:Number},
    imgsrc : {type:String},
    shopDescription: {type:String},
    data_id:{type:String}
},{
    collection:'allList'
});

var ModelAllList = db.model('allList',allListSchema);

// 处理前端传送 添加到订单列表 的数据
app.get('/addList',function(request,response){
    console.log('sdfdf' + request.query.shopNum);
    // 把前端接收的数据保存在数据库中
    ModelAllList.create({
        shopNum :request.query.shopNum,
        shopPrice:request.query.shopPrice,
        imgsrc:request.query.imgsrc,
        shopDescription:request.query.shopDescription,
        data_id:request.query.data_id
    },function(err,doc){
        if(err){
            console.error(err);
        } else {
            response.send('添加列表成功')
        }
    });

});

// 用来返回 所有的添加订单 元素到前端 集合中已经保存过的数据到前段
app.get('/getList',function(request,response){

    ModelAllList.find({},null,function(err,doc){
        if(err){
            response.send({err:1,msg:'fail'});
            return console.error(err);
        } else {
            response.send(doc);
        }
    });

});






// 处理前端传送过来的修改用户的数据
app.get('/changeData',function(request,response){
    // console.log(request.query);
    // 把前端接收的数据保存在数据库中
    Model.update({_id :request.query._id},{
        $set :{
            name:request.query.name,
            age :request.query.age
        }
    },function(err,doc){
        if(err){
            console.error(err);
        } else {
            // console.log(doc);
        }
    })

    response.send('修改数据成功');
});

// 用来返回table 集合中已经保存过的数据到前台
app.get('/getOrder',function(request,response){
    ModelTable.find({},null,function(err,doc){
        if(err){
            response.send({err:1,msg:'fail'});
            return console.error(err);
        } else {
            response.send(doc);
        }
    });

});



// 用来返回数据库中已经保存过的数据到前台
app.get('/showAll',function(request,response){
    ModelTable.find({},null,function(err,doc){
        if(err){
            response.send({err:1,msg:'fail'});
            return console.error(err);
        } else {
            response.send(doc);
        }
    });

});

// app.get('/order',function(request,response){
//
//       var pathname = __dirname + 'order.html';
//       response.sendFile(decodeURI(pathname));
//
//
// })
app.get('/delete',function(request,response){
    // console.log(request.query);
    ModelTable.remove({_id:request.query.id},function(err){
        if(err){
            return console.error(err);
        } else {
            response.send('删除数据成功');
        }
    })
})

app.get('*',function(request,response){
    console.log(request.path);
    var reg = /\.[a-z]+$/;
    if(reg.test(request.path)) {
        var pathname = __dirname + request.path;
        response.sendFile(decodeURI(pathname));
    }

})
app.listen(3000,'127.0.0.1',function(){
    console.log('链接服务器成功');
});
