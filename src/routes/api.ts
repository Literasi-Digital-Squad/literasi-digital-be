import express from 'express'
import { authMiddleware } from '../middleware/auth-middleware'
import { AdminController } from '../controller/admin-controller'
import { LevelController } from '../controller/level-controller'

export const apiRouter = express.Router()

apiRouter.use(authMiddleware)

// Auth API
apiRouter.get('/admin', AdminController.get)
apiRouter.put('/admin/:id', AdminController.update)

// Level API
apiRouter.get('/admin/levels', LevelController.getAll)
apiRouter.get('/admin/levels/:id', LevelController.get)
apiRouter.put('/admin/levels/:id', LevelController.update)