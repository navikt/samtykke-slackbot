import { json, Application} from 'express'
import cors from 'cors'
import routes from '../api'

export default ({ server }: { server: Application}) => {
    server.use(cors())
    server.use(json())
    server.use(routes)
    return server
}