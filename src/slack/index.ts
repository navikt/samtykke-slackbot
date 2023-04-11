import dotenv from 'dotenv'
import { App } from '@slack/bolt'

dotenv.config()

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET
});

async function getValidChannelID(channelName: string, cursor: string) {
    const conversations = await app.client.conversations.list({ token: process.env.SLACK_BOT_TOKEN, limit: 200, cursor })
    
    const channel = conversations.channels?.find(obj => {
        return obj.name === channelName
    })

    if (channel !== undefined && !channel.is_archived) {
        await app.client.chat.postMessage({
            token: process.env.SLACK_BOT_TOKEN,
            channel: channel.id!,
            text: 'Ditt samtykke for: Brukertest av Los Pollos Hermanos. Har utløpt'
        })
        return
    }

    if (conversations.response_metadata?.next_cursor !== '' && conversations.response_metadata?.next_cursor !== undefined) {
        getValidChannelID(channelName, conversations.response_metadata?.next_cursor)
    }
}

getValidChannelID('samtykke-bot-test', '')