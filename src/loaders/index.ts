import { Application } from 'express'
import expressLoader from './express'

let loaded = false
export const load = async ({ server }: { server: Application}) => {
    if (loaded) throw new Error('Application already loaded...')

    console.log('-- loading express 🧬')
    const loadedExpress = await expressLoader({ server })
    console.log('------- express loaded ✅\n')

    return { loadedExpress }
}