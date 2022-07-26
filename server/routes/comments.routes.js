const CommentController = require('../controllers/comments.controller');

module.exports = (app) => {
    app.get('/api/comment', CommentController.getAll)
    app.get('/api/comment/:_id', CommentController.getOne)
    app.post('/api/comment', CommentController.newComment)
    app.put('/api/comment/:_id', CommentController.updateComment)
    app.delete('/api/comment/:_id', CommentController.deleteComment)
}