var DB = require('mysql');
var mysqlPool  = DB.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'root',
  password        : '',
  database        : 'payDemo'
});
module.exports = mysqlPool;
