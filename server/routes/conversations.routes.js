const ConversationController = require('../controllers/conversations.controller')

module.exports = (app) => {
    app.get('/api/conversations', ConversationController.getAll)
    app.get('/api/conversation/:userId', ConversationController.getOne)
    app.post('/api/conversation/new', ConversationController.newConversation)
    app.delete('/api/conversation/:_id', ConversationController.deleteOne)
}