const express = require('express')

const OngsController = require('./controllers/OngsController')
const CasosController = require('./controllers/CasosController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')
const routes = express.Router()

routes.post('/session', SessionController.create)

routes.get('/ongs', OngsController.list)
routes.post('/ongs', OngsController.create)

routes.post('/casos', CasosController.create)
routes.get('/casos', CasosController.list)
routes.delete('/casos/:id', CasosController.delete)

routes.get('/profile', ProfileController.list)

module.exports = routes;