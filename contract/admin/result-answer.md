## GET Result Answer Lists

This endpoint fetch Questions and Answers history by result

Enfpoint: GET /v1/admin/results/:id/answer_details

Request Header:

* Authorization: Bearer `<token>`

Response Body (Success):

```
{
	"status": "success",
	"data": [
		{
			"id": "b1d389fe-c89f-4fc3-bf43-e7f07850c97f",
			"level_id": 1,
			"body": "lorem ipsum....",
			"image_url": "google.3e.image/image1.jpg",
			"created_at": "2025-18-03 11:01:10",
			"updated_at": "2025-18-03 11:01:10",
			"answers": [
				{
					"id": 1,
					"question_id": 1,
					"body": "lorem ipsum...",
					"image_url": "google.3e.image/image1.jpg",
					"is_correct": false,
					"answered": true,
					"created_at": "2025-18-03 11:01:10",
					"updated_at": "2025-18-03 11:01:10"
				},
				{
					"id": 2,
					"question_id": 1,
					"body": "lorem ipsum...",
					"is_correct": true,
					"answered": false,
					"image_url": "google.3e.image/image1.jpg",
					"created_at": "2025-18-03 11:01:10",
					"updated_at": "2025-18-03 11:01:10"
				}
			]
		},

	]
}
```

Response Body (Failed):

```
{
	"status": "error",
	"error": "Result Not Found"
}
```
