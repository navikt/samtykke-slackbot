import { Router } from 'express'

const routes = Router()

routes.get('/isalive', async (req, res, next) => {
    res.sendStatus(200)
})
routes.get('/isready', async (req, res, next) => {
    res.sendStatus(200)
})

export default Router().use(routes)