import express from 'express'
import config from './config'
import { load } from './loaders'

console.log('\n========== ⚡ BOOTING UP ⚡ =========== \n')

async function boot() {
    try {
        const server = express()

        await load({ server })

        server.listen(config.http.port, () => {
            console.log(`
=========  LISTENING ON ${config.http.port}  =========`)
        })
    } catch (error) {
        console.log('\n\n=========== 💥  TERROR 💥  ============\n\n')
        console.log(error)
    }
}

void boot()