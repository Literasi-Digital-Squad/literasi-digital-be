import express from 'express'
import { AdminController } from '../controller/admin-controller'
import { PostController } from '../controller/post-controller'

export const publicRouter = express.Router()

// Auth API
publicRouter.post('/api/v1/admin/register', AdminController.register)
publicRouter.post('/api/v1/admin/login', AdminController.login)

// Post API
publicRouter.get('/api/posts', PostController.getAll)
publicRouter.get('/api/posts/:id', PostController.get)
publicRouter.get('/api/users/:username/posts', PostController.getPostByUser)  