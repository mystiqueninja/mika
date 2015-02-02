//"use strict";
//function validate (schema, data) {
//  var errors = []
//  for (let key in schema) {
//    let testData = data[key];
//    // 
//    switch (schema[key]) {
//      case 'String':
//        if (typeof(testData) !== 'string') errors.push(new Error(key + ' Datatype != String, Validation Faild'));
//        break;
//      case 'Number':
//        if (typeof(testData) !== 'number') errors.push(new Error(key + ' Datatype != Number, Validation Faild'));
//        break;
//      case 'Email':
//        if (typeof(testData) !== 'string') errors.push(new Error(key + ' The email address provided is not a string, Validation Faild'));
//        if (!validateEmail(testData[key])) errors.push(new Error(key + ' The email address provided is invalid, Validation Faild'));
//        break;
//      case 'Password':
//        break;
//      case 'Date':
//        break;
//      case 'Boolean':
//        if (typeof(testData) !== Boolean)
//        break;
//    }
//  }
//  if (errors !== []) return errors;
//  return true;
//}
//function validateEmail(email) {
//  return true;
//}
//var s = {
//  username: 'String',
//  password: 'Password',
//  email: 'Email',
//  loggedIn: 'Boolean'
//}
//var t = {
//  username: '123',
//  password: '123',
//  email: '123',
//  loggedIn: false
//}
//var msgs = validate(s, t);
//console.log(msgs);