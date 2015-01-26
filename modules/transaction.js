var mysqlPool = require("../db/mysqlConn");
var Transaction = module.exports = function(){};
var config = Transaction.prototype;
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
config.add = function(data, callback){
  mysqlPool.getConnection(function(err, connection){
    if(err) throw err;
    connection.query("INSERT INTO `Transaction`(`increment_no`, `terminal_no`, `date`, `money`, `card_no`) VALUES ("+data.incrementNo+","+data.terminalNo+","+data.date+","+data.money+","+data.cardNo+");"
    ,function(err, rows){
      if(err) throw err;
      callback(err);
      connection.release();
    });
  });
};
