var mysqlPool = require("../db/mysqlConn");
var Transaction = module.exports = function(){};
var config = Transaction.prototype;
//根据卡号查询交易信息
config.load = function(cardNo, callback)
{
  var self = this;
  mysqlPool.getConnection(function(err, connection){
    if(err) throw err;
    connection.query("SELECT * FROM Transaction WHERE card_no = '"+cardNo+"';"
    ,function(err, rows){
      if(err) throw err;
      var data = rows.map(function(row){
        return {
          "cardNo":row.card_no,
          "holder":row.holder,
          "date":row.date,
          "money":row.money,
          "incrementNo":row.increment_no,
          "terminalNo":row.terminal_no
        };
      });
      self.data = data;
      callback(err);
      connection.release();
    });
  });
};
//根据交易号查询交易信息
config.loadById = function(id, callback)
{
  console.log(cardNo);
  console.log(id);
  var self = this;
  mysqlPool.getConnection(function(err, connection){
    if(err) throw err;
    connection.query("SELECT * FROM Transaction WHERE card_no = '"+cardNo+"';"
    ,function(err, rows){
      if(err) throw err;
      var data = rows.map(function(row){
        return {
          "cardNo":row.card_no,
          "holder":row.holder,
          "date":row.date,
          "money":row.money,
          "incrementNo":row.increment_no,
          "terminalNo":row.terminal_no
        };
      });
      self.data = data;
      callback(err);
      connection.release();
    });
  });
};
//添加交易信息
config.add = function(data, callback){
  mysqlPool.getConnection(function(err, connection){
    if(err) throw err;
    connection.query("INSERT INTO `Transaction`(`increment_no`, `terminal_no`, `date`, `money`, `card_no`, `holder`) VALUES ("+data.incrementNo+","+data.terminalNo+","+data.date+","+data.money+","+data.cardNo+","+data.holder+");"
    ,function(err, rows){
      if(err) throw err;
      callback(err);
      connection.release();
    });
  });
};
