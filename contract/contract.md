# _Admin API_

## Auth & User Endpoint

POST /v1/admin/login/

POST /v1/admin/register/

GET /v1/admin/

PUT /v1/admin/

## Level Endpoint

GET /v1/admin/levels

GET /v1/admin/levels/:id

PUT /v1//admin/levels/:id

## Question Endpoint

POST /v1/admin/questions

GET /v1/admin/questions?level=

GET /v1/admin/questions/:question_id

PUT /v1/admin/questions/:question_id

DELETE /v1/admin/questions/:id

## Answer Endpoint

POST /v1/admin/questions/:question_id/answers (bulk insert only using array)

GET /v1/admin/questions/:question_id/answers

GET /v1/admin/questions/:question_id/answers/:answer_id

PUT /v1/admin/questions/:question_id/answers/:answer_id

DELETE /v1/admin/questions/:question_id/answers/:answer_id'

## Participant API

GET /v1/admin/participants?limit=&offset=

PUT /v1/admin/participants/:id

DELETE /v1/admin/participants/:id

## Result API

GET /v1/admin/results

GET /v1/admin/results/:id

# Public API

## Participant API

POST /v1/participants

GET /v1/participants/:id

GET /v1/participants/:id/results

## Results API

POST /v1/results

GET /v1/results/:id

## Question API

GET /v1/questions
