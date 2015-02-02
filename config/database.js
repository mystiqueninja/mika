"use strict";
/*
* All database settings
*/
var monk = require('monk');
var wrap = require('co-monk');
var co = require('co');
var validator = require('./validation.js').validate;

class Database {
  constructor(settings) {
    // Create the settings 
    for (let setting in settings) {
      let value = settings[setting];
      this[setting] = value;
    }
    if (this.autoConnect !== false)     this.db = monk(this.connectionString());
    if (this.autoCollections !== false) this.createCollections();
  }
  connectionString() {
    if (this.port) {
      var conStr = `${this.host}:${this.port}/${this.database}`;
    } else {
      var conStr = `${this.host}/${this.database}`;
    }
    if (this.username && this.password) {
      let auth = `${this.username}:${this.password}`;
      let tmp = `${auth}@${conStr}`;
      conStr = tmp;
    }
    return conStr;
  }
  createCollections() {
    for (let x = 0; x < this.collections.length; x++) {
      let col = this.collections[x];
      if (!this.col) this.col = {};
      this.col[col] = wrap(this.db.get(col));
    }
  }
  insert(collection, schema, data) {
    var errors = this.validate(schema, data);
    if (typeof(errors) === 'array') return errors;
    return co(this.col[collection].insert(data));
  }

  validate(schema, data) {
    let ret = validator(schema, data);
    if (ret.length > 0) {
      return ret;
    } else {
      true;
    }
  }
}
/*
* TODO: Move to app
*/
var settings = {
  host: 'localhost',
  database: 'test',
  collections: [
      'users',
      'products'
    ],
  autoCollections: true
}
var db = new Database(settings);
module.exports.database = db.db;
module.exports.collections = db.col;

/*
* TODO: Attach schema object to collections 
* 
*/