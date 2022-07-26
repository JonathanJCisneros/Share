const PostController = require('../controllers/posts.controller');

module.exports = (app) => {
    app.get('/api/posts', PostController.getAll)
    app.get('/api/post/:_id', PostController.getOne)
    app.post('/api/post', PostController.newPost)
    app.put('/api/post/:_id', PostController.updatePost)
    app.delete('/api/post/:_id', PostController.deletePost)
}