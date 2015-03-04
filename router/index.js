var express = require('express');
var Card = require('../modules/card');
var Transaction = require('../modules/transaction');

var router = express.Router();
// GET root directr
router.get('/',function(req,res){
  res.send('Hello World');
});
//查询卡片信息和卡片的交易信息
router.get('/card/:cardNo',function(req,res){
  var card = new Card();
  card.load(req.params.cardNo,function(err){
    if(err) throw err;
    //查询卡片的交易信息
    var transaction = new Transaction();
    transaction.load(card.cardNo, function(err){
      if(err) throw err;
      card.transactionInfo = transaction.data;
      res.send(card);
    });
    // res.send(card);
  });
});
//根据交易号查询交易信息
router.get('/transaction/:incrementNo',function(req,res){
  var transaction = new Transaction();
  transaction.loadById(req.params.incrementNo,function(err){
    if(err) throw err;
    //查询卡片的信息
    var card = new Card();
    card.load(transaction.data.cardNo, function(err){
      if(err) throw err;
      transaction.data.holder = card.holder;
      res.send(transaction.data);
    });
    // res.send(card);
  });
});
//根据卡号查询交易
router.get('/transaction/:cardNo',function(req,res){
  var transaction = new Transaction();
  transaction.load(req.params.cardNo,function(err){
    if(err) throw err;
    //查询卡片的信息
    var card = new Card();
    card.load(transaction.data.cardNo, function(err){
      if(err) throw err;
      transaction.data.holder = card.holder;
      res.send(transaction.data);
    });
    // res.send(card);
  });
});
//根据卡号更新主账户金额
router.post('/updatemoney',function(req,res){
  var card = new Card();
  card.update(req.body,function(err){
    if(err) throw err;
    res.send('success');
  });
});

module.exports = router;
