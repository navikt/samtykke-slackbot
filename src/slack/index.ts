import dotenv from 'dotenv'
import { App } from '@slack/bolt'
import { slackApp } from '../loaders'
import config from '../config'
import { ISlackChannel, ISlackMessage } from '../types'
import { generateMessageBlocks } from './message'

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

export const sendMessageToChannel = async (message: ISlackMessage) => {
    // If something is wrong with the "block", post message will default to "text"
    await slackApp.client.chat.postMessage({
        token: config.slack.botToken,
        channel: message.channelId,
        text: 'Noe gikk galt i byggingen av meldingen, vennligst kontakt #researchops',
        blocks: generateMessageBlocks(message)
    })
}