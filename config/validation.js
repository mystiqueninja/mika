"use strict";
class Validator {
  validate(schema, data) {
    var errors;
    for (let key in schema) {
      let testData = data[key];
      switch (schema[key]) {
        case 'String':
          if (typeof(testData) !== 'string') errors.push(new Error(key + ' Datatype != String, Validation Faild'));
          break;
        case 'Number':
          if (typeof(testData) !== 'number') errors.push(new Error(key + ' Datatype != Number, Validation Faild'));
          break;
        case 'Email':
          if (typeof(testData) !== 'string') errors.push(new Error(key + ' The email address provided is not a string, Validation Faild'));
          //if (1 === 1) errors.push(new Error(key + ' The email address provided is invalid, Validation Faild'));
          break;
        case 'Phone':
          if (testData.length !== 10) errors.push(new Error(key + 'Phone number doesn\'t have the correct number of characters, Validation Failed'));
        case 'Password':
          break;
        case 'Date':
          break;
        case 'Boolean':
          if (typeof(testData) !== 'boolean') errors.push(new Error(key + ' Must be a boolean value, Validation Faild'));
          break;
      }
    }
    if (errors !== []) return errors;
    else return true;  
  }
  checkUnique (item, col) {
    let query = {};
    query[item[key]] = item.value;
    let temp = co(this.col[col].find(query));
    if (temp.length > 0) return false;
    return true;
  }
}

module.exports = new Validator();
//example schema
//--------------
//users
//{
//  name: {type: 'String', required: false, 'default': 'new user', unique: false},
//  email: {type: 'Email', required: true, unique: true},
//  posts: {type: 'Array', inArray: 'ObjectIds', ref: 'Posts'}
//  password: {type: 'Password', required: true}
//}
//posts 
//{
//  title: {type: 'String', required: true, 'default': 'new post' unique: false},
//  slug: {unique: true, required: true type: 'String'},
//  content: {type: 'String', required: true},
//}