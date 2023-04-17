import { Router } from 'express'
import { getChannelFromChannelName } from '../slack'

const routes = Router()

routes.get('/isalive', async (req, res, next) => {
    res.sendStatus(200)
})
routes.get('/isready', async (req, res, next) => {
    res.sendStatus(200)
})

routes.get('/validChannel/:channelName', async (req, res, next) => {
    try {
        if (await getChannelFromChannelName(req.params.channelName, '')) {
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    } catch(error) {
        res.sendStatus(500)
    }
})

export default Router().use(routes)