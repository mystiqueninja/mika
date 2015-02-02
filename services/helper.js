"use strict";
module.exports.env = 'development';
module.exports.forEach = function forEach(obj, callback) {
  for (let x = 0; x < obj.length; x++) {
    for (let key in obj[x]) {
      let val = obj[x][key];
      callback(key, val);
    }
  }
};
module.exports['404'] = function* (next){
  this.status = 404;
  this.body = this.response;
  yield next;
};