import express from 'express'
import { authMiddleware } from '../middleware/auth-middleware'
import { PostController } from '../controller/post-controller'
import { AdminController } from '../controller/admin-controller'

export const apiRouter = express.Router()

apiRouter.use(authMiddleware)

// Auth API
apiRouter.get('/api/v1/admin', AdminController.get)
apiRouter.put('/api/v1/admin/:id', AdminController.update)

// Post API
apiRouter.post('/api/posts', PostController.create)
apiRouter.put('/api/posts/:id', PostController.update)
apiRouter.delete('/api/posts/:id', PostController.delete)
