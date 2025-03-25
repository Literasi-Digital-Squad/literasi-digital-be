import express from 'express'
import { Request, Response } from 'express'
import { publicRouter } from '../routes/public-api'
import { errorMiddleware } from '../middleware/error-middleware'
import { apiRouter } from '../routes/api'
import { APIPrefix, Server } from '../lib/constant'

export const app = express()
const port = process.env.PORT || Server.PORT

app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    res.json({ message: Server.RunningMsg })
})

// Router
app.use(APIPrefix.V1, publicRouter)
app.use(APIPrefix.V1, apiRouter)

// Error middleware
app.use(errorMiddleware)

app.listen(port, () => {
    console.log(Server.StartMsg(port))
})