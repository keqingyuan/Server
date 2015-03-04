var mysqlPool = require("../db/mysqlConn");
var Transaction = require("./transaction");
var Card = module.exports = function(){};
var config = Card.prototype;
config.load = function(cardNo, callback)
{
  var self = this;
  mysqlPool.getConnection(function(err, connection){
    if(err) throw err;
    connection.query("SELECT * FROM Card WHERE card_no = '"+cardNo+"';"
    ,function(err, rows){
      if(err) throw err;
      //设置卡片数据
      self.cardNo=rows[0].card_no;
      self.holder=rows[0].holder;
      self.money=rows[0].money;
      self.expire=rows[0].expire;
      //执行错误提示的回调函数
      callback(err);
      //释放数据库连接
      connection.release();
    });
  });
};
config.add = function(data, callback){
  mysqlPool.getConnection(function(err, connection){
    if(err) throw err;
    connection.query("INSERT INTO `Card`(`card_no`, `holder`, `money`, `expire`) VALUES ("+data.cardNo+","+data.holder+","+data.money+","+data.expire+");"
    ,function(err, rows){
      if(err) throw err;
      callback(err);
      connection.release();
    });
  });
};
//更新金额
config.update = function(data,callback){
  console.log(data.money);
  console.log(data.cardNo);
  mysqlPool.getConnection(function(err, connection){
    if(err) throw err;
    connection.query("UPDATE `Card` SET `money`="+data.money+" WHERE `card_no`='"+data.cardNo+"';"
    ,function(err, rows){
      if(err) throw err;
      callback(err);
      connection.release();
    });
  });
};
