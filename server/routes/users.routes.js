const UserController = require('../controllers/users.controller')

module.exports = (app) => {
    app.get('/api/users', UserController.getAll)
    app.post('/api/user/register', UserController.register)
}