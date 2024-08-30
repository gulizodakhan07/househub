import {config} from 'dotenv'
config()
export const appConfig = {
    port: parseInt(process.env.APP_PORT) || 3002,
    host: process.env.APP_HOST
}