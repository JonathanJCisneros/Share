const UserController = require('../controllers/users.controller')

module.exports = (app) => {
    app.post('/api/user/register', UserController.register)
    app.post('/api/user/login', UserController.login)
    app.get('/api/users', UserController.getAll)
    app.get('/api/user/:_id', UserController.getOne)
    app.get('/api/user/checkUser', UserController.checkIfUser)
    app.get('/api/user/logout', UserController.logout)
    app.put('/api/user/update/:_id', UserController.updateUser)
    app.delete('/api/user/:_id', UserController.deleteUser)
}