import express from 'express'
import cors from 'cors'
import { Request, Response } from 'express'
import { publicRouter } from '../routes/public-api'
import { errorMiddleware } from '../middleware/error-middleware'
import { apiRouter } from '../routes/api'
import { AllowedCorsHeaders, AllowedCorsMethods, APIPrefix, ENV, NotAllowedCorsErr, Server, ServerHost } from '../lib/constant'

export const app = express()
const port = Number(process.env.PORT) || Server.PORT
let host = process.env.HOST
if (!host) {
    host = process.env.ENV === ENV.DEVELOPMENT ? ServerHost.Development : ServerHost.Production
}

const isDev = process.env.ENV === ENV.DEVELOPMENT
const allowedOrigins = process.env.ORIGINS?.split(',') || []

app.use(cors({
    origin: (origin, callback) => {
        if (isDev) {
          callback(null, true);
        } else {
          if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
          } else {
            callback(NotAllowedCorsErr);
          }
        }
      },
    methods: AllowedCorsMethods,
    allowedHeaders: AllowedCorsHeaders,
    credentials: true
  }));

app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    res.json({ message: Server.RunningMsg })
})

// Router
app.use(APIPrefix.V1, publicRouter)
app.use(APIPrefix.V1, apiRouter)

// Error middleware
app.use(errorMiddleware)

app.listen(port, host, () => {
    console.log(Server.StartMsg(host, port))
})