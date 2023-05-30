import { Router } from 'express'
import config from '../config'
import { getChannelFromChannelName, sendMessageToChannel } from '../slack'
import { authAzureToken } from './auth/authenticationMiddleware'

const routes = Router()

routes.get('/isalive', async (req, res, next) => {
    res.sendStatus(200)
})
routes.get('/isready', async (req, res, next) => {
    res.sendStatus(200)
})

if (config.nais.cluster === 'dev-gcp' || config.nais.cluster === 'prod-gcp') {
    routes.get('/validChannel/:channelName', authAzureToken, async (req, res, next) => {
        try {
            const channel = await getChannelFromChannelName(req.params.channelName, '') 
            if (channel) {
                res.status(200).json({
                    slackChannelId: channel.id,
                    sizeWarning: channel.sizeWarning
                });
            } else {
                res.sendStatus(404);
            }
        } catch(error) {
            res.sendStatus(500)
        }
    })

    routes.post('/message/:channelId', authAzureToken, async (req, res, next) => {
        try {
            await sendMessageToChannel({
                channelId: req.params.channelId,
                ...req.body
            })
            res.sendStatus(200)
        } catch (error) {
            res.sendStatus(500)
        }
    })
} else {
    routes.get('/validChannel/:channelName', async (req, res, next) => {
        try {
            const channel = await getChannelFromChannelName(req.params.channelName, '') 
            if (channel) {
                res.status(200).json({
                    slackChannelId: channel.id,
                    sizeWarning: channel.sizeWarning
                });
            } else {
                res.sendStatus(404);
            }
        } catch(error) {
            res.sendStatus(500)
        }
    })

    routes.post('/message/:channelId', async (req, res, next) => {
        try {
            await sendMessageToChannel({
                channelId: req.params.channelId,
                ...req.body
            })
            res.sendStatus(200)
        } catch (error) {
            res.sendStatus(500)
        }
    })
}


export default Router().use(routes)