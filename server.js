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
io.sockets.on('connection', function (socket) {
    function getUser (data, done) {
        socket.get('user-data', function (err, user) {
            if (user) {
                done(user);
            } else {
                socket.set('user-data', {
                    userId: new Date().getTime()
                }, function () {
                    socket.get('user-data', function (err, user) {
                        socket.broadcast.emit('user.joined', {
                            message: data.name + ' has joined!'
                        });
                        done(user);
                    });
                });
            }
        });
    }
    socket.emit('chat.render', {
        name: 'Chat Bot',
        message: 'Welcome to the NashJS chat room',
        userId: 11110000
    });
    socket.on('chat.post', function (data, done) {
        getUser(data, function (user) {
            data.userId = user.userId;
            io.sockets.emit('chat.render', data);
            done('Your message was posted.');
        });
    });
});

// Don't worry about this... it's just exporting the
// server so we can run the app with grunt
exports = module.exports = server;
exports.use = function() {
    app.use.apply(app, arguments);
};