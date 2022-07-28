const express = require('express');
const cookieParser = require('cookie-parser')
const cors = require('cors')
const app = express();
const port = 8000;

require('dotenv').config();
require('./config/mongoose.config')

app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json())
app.use(express.urlencoded({extended : true}))

require('./routes/users.routes')(app);
require('./routes/posts.routes')(app);
require('./routes/comments.routes')(app);
require('./routes/conversations.routes')(app);
require('./routes/messages.routes')(app);


const server = app.listen(port, () => console.log(`Listening on port: ${port}`));

const io = require('socket.io')(server, { cors: true });

io.on('connection', socket => {

    socket.emit('message', 'Welcome to Chat!')

    socket.broadcast.emit('message', 'A user has joined the chat');

    socket.on('disconnect', () => {
        io.emit('message', 'A user has left the chat')
    })
});