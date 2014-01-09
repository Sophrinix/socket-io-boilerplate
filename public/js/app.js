/*global io, $ */
var socket = io.connect('http://localhost:7777');

function renderMessage (data) {
    console.log(data);
    $('#messages').prepend('<div><p>' + data.message + '</p><strong>' + data.name + '</strong><hr /></div>');
}

function postMessage (data) {
    socket.emit('chat.post', data, function (message) {
        $('body').prepend('<div class="alert alert-warning">' + message + '</div>');
    });
}

socket.on('chat.render', renderMessage);

socket.on('user.joined', function (data) {
    $('body').prepend('<div class="alert alert-warning">' + data.message + '</div>');
});

$(function () {
    $('#message-form').bind('submit', function (e) {
        e.preventDefault();
        postMessage({
            name: $(this).find('input[name=name]').val(),
            message: $(this).find('textarea[name=message]').val()
        });
    });
});