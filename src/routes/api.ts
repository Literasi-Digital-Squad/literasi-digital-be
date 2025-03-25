import express from 'express'
import { authMiddleware } from '../middleware/auth-middleware'
import { AdminController } from '../controller/admin-controller'
import { LevelController } from '../controller/level-controller'
import { QuestionController } from '../controller/question-controller'
import multer from 'multer'

export const apiRouter = express.Router()

const upload = multer()

apiRouter.use(authMiddleware)

// Auth API
apiRouter.get('/admin/:id', AdminController.get);
apiRouter.put('/admin/:id', AdminController.update);

// Level API
apiRouter.get('/admin/levels', LevelController.getAll)
apiRouter.get('/admin/levels/:id', LevelController.get)
apiRouter.put('/admin/levels/:id', LevelController.update)

// Question API
apiRouter.post('/admin/questions', upload.single('image'), QuestionController.create)
apiRouter.get('/admin/questions', QuestionController.getAll)
apiRouter.get('/admin/questions/:question_id', QuestionController.get)
apiRouter.put('/admin/questions/:question_id', upload.single('image'), QuestionController.update)
apiRouter.delete('/admin/questions/:question_id', QuestionController.delete)