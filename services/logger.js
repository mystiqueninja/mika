"use strict";
var co = require('co');
var fs = require('fs');

module.exports = function * (next){
  var start = new Date;
  yield next;
  var end = new Date;
  
  if (this.status === 200)      var status = '\x1b[32m' + this.status + '\x1b[0m';
  if (this.status === 201)      var status = '\x1b[42m' + this.status + '\x1b[0m';
  if (this.status === 307)      var status = '\x1b[93m' + this.status + '\x1b[0m';
  if (this.status === 403)      var status = '\x1b[47m' + this.status + '\x1b[0m';
  if (this.status === 404)      var status = '\x1b[31m' + this.status + '\x1b[0m';
  if (!status)                  var status = this.status;
  
  if (this.method === 'GET')    var method = '\x1b[42m' + this.method + '\x1b[0m';
  if (this.method === 'POST')   var method = '\x1b[43m' + this.method + '\x1b[0m';
  if (this.method === 'PUT')    var method = '\x1b[44m' + this.method + '\x1b[0m';
  if (this.method === 'DELETE') var method = '\x1b[41m' + this.method + '\x1b[0m';
  if (!method)                  var method = this.method;
  
  var msg = `${method} ${status} '${this.url}' \x1b[100m+${end - start}ms\x1b[0m \n- ${this.request.header['user-agent']}`;
  
  console.log(msg);
  co(logFile(msg));
}
function *logFile(msg) {
  var stream = fs.createWriteStream('./appLog.log', {flags: 'a'});
  stream.write(msg + '\n');
  stream.end('Logged: ' + new Date + '\n------------------------------------------------------------------------------\n');
}