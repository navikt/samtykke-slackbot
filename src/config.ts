import dotenv from 'dotenv'

dotenv.config()

export default {
    http: {
        port: process.env.HTTP_PORT || 8080 
    }
}