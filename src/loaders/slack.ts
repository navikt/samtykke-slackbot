import { App } from '@slack/bolt'
import config from '../config'

export default () => {
    return new App({
        token: config.slack.botToken,
        signingSecret: config.slack.signingSecret
    })
}