const {EventEmitter} = require('events');
const emitter = new EventEmitter();
function sendMessage(user, message, emitter) {
    emitter.emit('message', {user, message});
}
emitter.on('message', ({user, message}) => {
    console.log(`${user}: ${message}`);
});

sendMessage('Alice', 'Hello, Bob!', emitter);
sendMessage('Bob', 'Как дела?', emitter);
sendMessage('Charlie', 'Все ок!', emitter);
sendMessage('Alice', 'Давай дальше практиковаться с EventEmitter!', emitter);

