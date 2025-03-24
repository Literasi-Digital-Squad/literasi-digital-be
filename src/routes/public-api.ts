import express from 'express'
import { AdminController } from '../controller/admin-controller'

export const publicRouter = express.Router()

// Auth API
publicRouter.post('/admin/register', AdminController.register)
publicRouter.post('/admin/login', AdminController.login)