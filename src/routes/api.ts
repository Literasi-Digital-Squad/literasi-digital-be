import express from 'express'
import { authMiddleware } from '../middleware/auth-middleware'
import { AdminController } from '../controller/admin-controller'
import { LevelController } from '../controller/level-controller'
import { QuestionController } from '../controller/question-controller'
import { ParticipantController } from '../controller/participant-controller'
import { ResultController } from '../controller/result-controller'
import multer from 'multer'
import { AnswerController } from '../controller/answer-controller'

export const apiRouter = express.Router()

const upload = multer()

apiRouter.use(authMiddleware)

// Participant API
apiRouter.get('/admin/participants', ParticipantController.getAll)
apiRouter.put('/admin/participants/:id', ParticipantController.update)
apiRouter.delete('/admin/participants/:id', ParticipantController.delete)

// Result API
apiRouter.get('/admin/results', ResultController.getAll)

// Auth API
apiRouter.get('/admin', AdminController.get);
apiRouter.put('/admin', AdminController.update);

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

// Answer API
apiRouter.post('/admin/questions/:question_id/answers', upload.single('image'), AnswerController.create)
apiRouter.get('/admin/questions/:question_id/answers', AnswerController.getAll)
apiRouter.get('/admin/questions/:question_id/answers/:answer_id', AnswerController.get)
apiRouter.put('/admin/questions/:question_id/answers/:answer_id', upload.single('image'), AnswerController.update)
apiRouter.delete('/admin/questions/:question_id/answers/:answer_id', AnswerController.delete)