"use strict";
var parse = require('co-body');
var db = require('../db.js');

module.exports.get = function *get() {
  this.body = yield db.users.find({});
}

module.exports.getOne = function *getOne(id) {
  var query = yield db.users.findOne({_id: id})
  if (query) {
    this.body = query;
    this.status = 200;
  }
}

module.exports.create = function *create() {
  var postedUser = yield parse(this.request);
  var insertedUser = yield db.users.insert(postedUser);
  if (insertedUser) {
    this.set('location', `/users/${insertedUser._id}`);
    this.status = 201;
  }
};

module.exports.update = function *update(id) {
  var postedUser = yield parse(this.request);
  console.log(postedUser);
  if (yield db.users.findOne({_id: id})) { 
    var updatedUser = yield db.users.updateById(id, postedUser);
    this.set('location', `/users/${updatedUser._id}`);
    this.status = 200;
  }
};

module.exports.remove = function *remove(id){
  yield db.users.remove({_id: id});
  this.set('location', '/users');
  this.status = 204;
};
