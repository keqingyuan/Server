var express = require('express');
var Card = require('../modules/card');
var Transaction = require('../modules/transaction');

var router = express.Router();
// GET root directr
router.get('/',function(req,res){
  res.send('Hello World');
});

router.get('/card/:id',function(req,res){
  var card = new Card();
  card.load(req.params.id,function(err){
    if(err) throw err;
    //查询卡片的交易信息
    var transaction = new Transaction();
    transaction.load(req.params.id, function(err){
      if(err) throw err;
      card.transactionInfo = transaction.data;
      res.send(card);
    });
    // res.send(card);
  });
});
//根据卡号更新卡内金额
router.post('/updatemoney',function(req,res){
  var card = new Card();
  card.update(req.body,function(err){
    if(err) throw err;
    res.send('success');
    });
  });

//查询交易信息根据交易号
router.get('/transactoin/:id',function(req,res){
  var transaction = new Transaction();
  transaction.load(req.params.id,function(err){
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

module.exports = router;
