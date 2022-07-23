const UserController = require('../controllers/users.controller')
const {authenticate} = require('../config/jwt.config')

module.exports = (app) => {
    app.post('/api/user/register', UserController.register)
    app.post('/api/user/login', UserController.login)
    app.get('/api/users', UserController.getAll)
    app.delete('/api/user/:_id', UserController.deleteUser)
}