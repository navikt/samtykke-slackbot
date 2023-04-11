import dotenv from 'dotenv'
import { App } from '@slack/bolt'
import { slackApp } from '../loaders'
import config from '../config'

export const getChannelFromChannelName = async (channelName: string, cursor: string) => {
    const conversations = await slackApp.client.conversations.list({ token: config.slack.botToken, limit: 1000, cursor })
    
    const channel = conversations.channels?.find(obj => {
        return obj.name === channelName
    })

    if (channel !== undefined && !channel.is_archived) {
        console.log(channel)
        return channel
    } 
    
    if (conversations.response_metadata?.next_cursor !== '' && conversations.response_metadata?.next_cursor !== undefined) {
        await getChannelFromChannelName(channelName, conversations.response_metadata?.next_cursor)
    }
}

// await app.client.chat.postMessage({
//             token: process.env.SLACK_BOT_TOKEN,
//             channel: channel.id!,
//             text: 'Ditt samtykke for: Brukertest av Los Pollos Hermanos. Har utløpt'
//         })