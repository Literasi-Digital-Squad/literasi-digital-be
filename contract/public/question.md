# QUESTION API SPEC

## GET List Question

Endpoint: GET /v1/questions

Response Body (Success) :

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
			"updated_at": "2025-18-03 11:01:10"
		},
		{
			"id": "a8563ac2-8089-4824-8085-d41298147ba7",
			"level_id": 1,
			"body": "lorem ipsum....",
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
	"error": "level not found"
}
```
