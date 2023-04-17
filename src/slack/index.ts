import dotenv from 'dotenv'
import { App } from '@slack/bolt'
import { slackApp } from '../loaders'
import config from '../config'
import { ISlackChannel } from '../types'

export const getChannelFromChannelName = async (channelName: string, cursor: string): Promise<ISlackChannel | undefined> => {
    const conversations = await slackApp.client.conversations.list({ token: config.slack.botToken, limit: 1000, cursor })
    
    const channel = conversations.channels?.find(obj => {
        return obj.name === channelName
    })

    if (conversations.response_metadata?.next_cursor !== '' && conversations.response_metadata?.next_cursor !== undefined && channel === undefined) {
        return await getChannelFromChannelName(channelName, conversations.response_metadata?.next_cursor)
    } else if (channel !== undefined && !channel.is_archived) {
        return {
            id: channel.id!,
            name: channel.name!,
            isPrivate: channel.is_private!
        }
    } else {
        return undefined
    }
}

// await app.client.chat.postMessage({
//             token: process.env.SLACK_BOT_TOKEN,
//             channel: channel.id!,
//             text: 'Ditt samtykke for: Brukertest av Los Pollos Hermanos. Har utløpt'
//         })