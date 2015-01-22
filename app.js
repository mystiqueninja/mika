"use strict";
var koa     = require('koa'),
    $router     = require('koa-route'), // Router
    _static = require('koa-static'), // Used as route
    users  = require('./routes/users'), // User route
    products = require('./routes/products'), // Products route
    // Custom middleware
    logger  = require('./services/logger'),
    _ = require('./services/helper'),
    // Create application
    app     = module.exports = koa(); 

/* Custom Logger */
app.use(logger);

/* Serve static content from static folder */
app.use( $router.get( '/', _static( './static' ) ) ); // Render static content on root route

// USERS API
app.use($router.post('/users',        users.create)); // CREATE new users
app.use($router.get('/users',         users.get));    // READ/GET all read users from database
app.use($router.get('/users/:id',     users.getOne)); // READ/GET single user from database
app.use($router.put('/users/:id',     users.update)); // UPDATE a users information
app.use($router.delete('/users/:id',  users.remove)); // DELETE a user document

/* Catch 404 errors */
app.use(_['404']); 

app.listen(process.env.PORT || 3000, function (err){
  if (err) throw new Error('Could not start server on given PORT');
  console.log(`Listening on port: ${process.env.PORT || 3000}`);
});
