import express from 'express'
import { AdminController } from '../controller/admin-controller'
import { ParticipantController } from '../controller/participant-controller'
import { ResultController } from '../controller/result-controller'
import { QuestionController } from '../controller/question-controller'
import { AnswerController } from '../controller/answer-controller'
import { ResultQuestionController } from '../controller/result_question-controller'

export const publicRouter = express.Router()

// Participant API
publicRouter.post('/participants', ParticipantController.create)
publicRouter.get('/participant/:id', ParticipantController.get)
publicRouter.get('/participant/:id/results', ParticipantController.getResultsByParticipantId);

// Result API
publicRouter.post('/result', ResultController.create)
publicRouter.get('/result/:id', ResultController.get)

// Auth API
publicRouter.post('/register', AdminController.register)
publicRouter.post('/login', AdminController.login)

// Question API
publicRouter.post('/questions', QuestionController.getNextQuestion)
publicRouter.get('/initial-question', QuestionController.getInitialQuestion)

// Answer API
publicRouter.get('/questions/:question_id/answers', AnswerController.getAllRandom)

// Result Question API
publicRouter.post('/results/:result_id/submit', ResultQuestionController.create)
