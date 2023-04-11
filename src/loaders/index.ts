import { App } from '@slack/bolt'
import { Application } from 'express'
import expressLoader from './express'
import slackLoader from './slack'

let loaded = false
let slackApp: App
export const load = async ({ server }: { server: Application}) => {
    if (loaded) throw new Error('Application already loaded...')

    console.log('-- loading express 🧬')
    const loadedExpress = await expressLoader({ server })
    console.log('------- express loaded ✅\n')

    console.log('-- loading slack-app 🧬')
    const loadedSlackApp = slackLoader()
    console.log('------- slack-app loaded ✅\n')

    slackApp = loadedSlackApp

    loaded = true
}

export { slackApp }