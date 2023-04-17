import { ISlackMessage } from "../types";

export const generateMessageBlocks = (message: ISlackMessage) => {
    const blocks = []

    switch (message.messageType) {
        case "CITIZEN_ACCEPT_CONSENT":
            blocks.push({
                type: 'header',
                text: {
                    type: 'plain_text',
                    text: `En innbygger har gitt samtykke til: ${message.consentTitle}.`
                }
            },
            {
                type: 'divider'
            },
            {
                type: 'section',
                text: {
                    type: 'plain_text',
                    text: `En innbygger har gitt sitt samtykke til din brukertest.`
                },
                fields: [
                    {
                        type: "mrkdwn",
                        text: `<https://samtykke.ekstern.dev.nav.no/ansatt/samtykke${message.ref}|Gå til ditt samtykke for å se mer>`
                    }
                ]
            })
            break
        case "CITIZEN_UPDATE_CONSENT":
            break
        case "CITIZEN_WITHDRAW_CONSENT":
            break
        case "CONSENT_EXPIRE":
            break 
    }

    return blocks
}