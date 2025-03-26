import express from 'express'
import { AdminController } from '../controller/admin-controller'
import { ParticipantController } from '../controller/participant-controller'

export const publicRouter = express.Router()

// Auth API
publicRouter.post('/register', AdminController.register)
publicRouter.post('/login', AdminController.login)

// Participant API
publicRouter.post('/participants', ParticipantController.create)
publicRouter.get('/participant/:id', ParticipantController.get)