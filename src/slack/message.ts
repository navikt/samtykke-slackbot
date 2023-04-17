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
        case "CITIZEN_WITHDRAW_CONSENT":
            blocks.push({
                type: 'header',
                text: {
                    type: 'plain_text',
                    text: `En innbygger har trukket sitt samtykke til: ${message.consentTitle}.`
                }
            },
            {
                type: 'divider'
            },
            {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: `En innbygger med løpenummer: *${message.trackingNumbers![0].split("-")}* har trukket sitt samtykke til: ${message.consentTitle}. Nå må du slette all ekstern data knyttet til innbyggeren.`
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
            blocks.push({
                type: 'header',
                text: {
                    type: 'plain_text',
                    text: `En innbygger har redigert sitt samtykke til: ${message.consentTitle}.`
                }
            },
            {
                type: 'divider'
            },
            {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: `En innbygger med løpenummer: *${message.trackingNumbers![0].split("-")}* har redigert sitt samtykke til: ${message.consentTitle}. Nå må du oppdatere all ekstern data knyttet til innbyggeren.`
                },
                fields: [
                    {
                        type: "mrkdwn",
                        text: `<https://samtykke.ekstern.dev.nav.no/ansatt/samtykke${message.ref}|Gå til ditt samtykke for å se mer>`
                    }
                ]
            })
            break
        case "CONSENT_EXPIRE":
            blocks.push({
                type: 'header',
                text: {
                    type: 'plain_text',
                    text: `Samtykket ditt: ${message.consentTitle}, har utløpt!`
                }
            },
            {
                type: 'divider'
            },
            {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: `Ditt samtykke: ${message.consentTitle} har utløpt, og disse løpenummerene er knyttet til samtykket: *${formatTrackingNumbers(message.trackingNumbers!)}*. Nå må du slette all ekstern data knyttet til innbyggerne`
                }
            })
            break 
    }

    return blocks
}

const formatTrackingNumbers = (trackingNumbers: Array<string>) => {
    let formattedTrackingNumbers = ""

    trackingNumbers.map((trackingNumber: string, index: number) => {
        if (index === trackingNumbers.length - 1) {
            formattedTrackingNumbers = formattedTrackingNumbers.concat(trackingNumber.split("-")[0])
        } else {
            formattedTrackingNumbers = formattedTrackingNumbers.concat(`${trackingNumber.split("-")[0]}, `)
        }
    })
    return formattedTrackingNumbers
}