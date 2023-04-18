import dotenv from 'dotenv'

dotenv.config()

export default {
    http: {
        port: process.env.HTTP_PORT || 8081
    },
    slack: {
        botToken: process.env.SLACK_BOT_TOKEN,
        signingSecret: process.env.SLACK_SIGNING_SECRET
    }
}