const MessageController = require('../controllers/messages.controller')

module.exports = (app) => {
    app.get('/api/messages', MessageController.getAll)
    app.get('/api/message/:conversationId', MessageController.getOne)
    app.post('/api/message/new', MessageController.newMessage)
    app.delete('/api/message/:_id', MessageController.deleteOne)
}