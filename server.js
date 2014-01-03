/*jslint node: true, scripturl: true */

'use strict';

var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);

// Make the public directory public
app.use( express.static(__dirname + '/public'));

// Livereload middleware
app.use(require('grunt-contrib-livereload/lib/utils').livereloadSnippet);

// This is where the fun will take place
io.sockets.on('connection', function () {
    console.log('connected');
});

// Don't worry about this... it's just exporting the
// server so we can run the app with grunt
exports = module.exports = server;
exports.use = function() {
    app.use.apply(app, arguments);
};