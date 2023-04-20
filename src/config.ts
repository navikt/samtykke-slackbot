import dotenv from 'dotenv'

dotenv.config()

export default {
    http: {
        port: process.env.HTTP_PORT || 8081
    },
    slack: {
        botToken: process.env.SLACK_BOT_TOKEN,
        signingSecret: process.env.SLACK_SIGNING_SECRET
    },
    nais: {
        cluster: process.env.NAIS_CLUSTER_NAME
    },
    azure: {
        jwksURI: process.env.AZURE_OPENID_CONFIG_JWKS_URI,
        issuer: process.env.AZURE_OPENID_CONFIG_ISSUER,
        audience: process.env.AZURE_APP_CLIENT_ID
    }
}