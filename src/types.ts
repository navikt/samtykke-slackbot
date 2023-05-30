export interface ISlackChannel {
    id: string
    name: string
    isPrivate: boolean
    sizeWarning: boolean
}

export type MessageType = "CITIZEN_ACCEPT_CONSENT" | "CITIZEN_WITHDRAW_CONSENT" | "CITIZEN_UPDATE_CONSENT" | "CONSENT_EXPIRE"

export interface ISlackMessage {
    messageType: MessageType
    channelId: string
    consentTitle: string
    trackingNumbers?: Array<string>
    ref?: string
}