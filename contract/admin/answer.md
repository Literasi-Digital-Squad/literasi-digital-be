# Answer API Spec

## Create Answer

Endpoint : POST /api/v1/admin/questions/:question_id/answers

Request Header :

- Authorization : Bearer `<token>`

Request Body :

```
{
	"body": "lorem ipsum...",
	"image": File Image (via form data),
	"is_correct": false
}
```

Response Body (Success) :

```
{
	"status": "success",
	"data": {
		"id": 1,
		"question_id": 1,
		"body": "lorem ipsum...",
		"image_url": "google.3e.image/image1.jpg",
		"is_correct": false,
		"created_at": "2025-18-03 11:01:10",
		"updated_at": "2025-18-03 11:01:10"
	}
}
```

Response Body (Failed) :

```
{
	"status": "error",
	"error": "there is no correct answer"
}
```

## Get List Answer

Endpoint : GET /api/v1/admin/questions/:question_id/answers

Request Header :

- Authorization : Bearer `<token>`

Response Body (Success) :

```
{
	"status": "success",
	"data": [
		{
			"id": 1,
			"question_id": 1,
			"body": "lorem ipsum...",
			"image_url": "google.3e.image/image1.jpg",
			"is_correct": false,
			"created_at": "2025-18-03 11:01:10",
			"updated_at": "2025-18-03 11:01:10"
		},
		{
			"id": 2,
			"question_id": 1,
			"body": "lorem ipsum...",
			"is_correct": true,
			"image_url": "google.3e.image/image1.jpg",
			"created_at": "2025-18-03 11:01:10",
			"updated_at": "2025-18-03 11:01:10"
		}
	]
}
```

Response Body (Failed) :

```
{
	"status": "error",
	"error": "question not found"
}
```

## Get Answer

Endpoint : GET /api/v1/admin/questions/:question_id/answers/:answer_id

Request Header :

- Authorization : Bearer `<token>`

Response Body (Success) :

```
{
	"status": "success",
	"data": {
		"id": 1,
		"question_id": 1,
		"body": "lorem ipsum...",
		"image_url": "google.3e.image/image1.jpg",
		"is_correct": false,
		"created_at": "2025-18-03 11:01:10",
		"updated_at": "2025-18-03 11:01:10"
	}
}
```

Response Body (Failed) :

```
{
	"status": "error",
	"error": "question not found"
}
```


## Update Question

Endpoint : PUT /ap//v1/admin/questions/:question_id/answers/:answer_id

Request Header :

- Authorization : Bearer `<token>`

Request Body :

```
{
	"body": "lorem ipsum edit...",
	"image": File Image (via form data),
	"is_correct": false,
}
```

Response Body (Success) :

```
{
	"status": "success",
	"data": {
		"id": 1,
		"question_id": 1,
		"body": "lorem ipsum...",
		"image_url": "google.3e.image/image1.jpg",
		"is_correct": false,
		"created_at": "2025-18-03 11:01:10",
		"updated_at": "2025-18-03 11:01:10"
	}
}
```

Response Body (Failed) :

```
{
	"status": "error",
	"error": "question not found"
}
```


## Delete Answer

Endpoint : DELETE /api/v1/admin/questions/:question_id/answers/:answer_id

Request Header :

- Authorization : Bearer `<token>`

Response Body (Success) :

```
{
	"status": "success"
}
```

Response Body (Failed) :

```
{
	"status": "error",
	"error": "question not found"
}
```
