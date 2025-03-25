# Question API Spec

## Create Question

Endpoint : POST /api/v1/admin/questions

Request Header :

- Authorization : Bearer `<token>`

Request Body :

```
{
	"level_id": 1,
	"body": "lorem ipsum....",
	"image_url": "google.3e.image/image1.jpg"
}
```

Response Body (Success) :

```
{
	"status": "success",
	"data": {
		"id": "b1d389fe-c89f-4fc3-bf43-e7f07850c97f",
		"level_id": 1,
		"body": "lorem ipsum....",
		"image_url": "google.3e.image/image1.jpg",
		"created_at": "2025-18-03 11:01:10",
		"updated_at": "2025-18-03 11:01:10"
	}
}
```

Response Body (Failed) :

```
{
	"status": "error",
	"error": "level not found"
}
```

## Get List Questions

Endpoint : GET /api/v1/admin/questions

Request Header :

- Authorization : Bearer `<token>`

Query Parameters:

- Level: `<level_id>`
- Page: `<page number>`
- Limit: `<limit per page>`

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
	],
	"pagination": {
		"total_items": 5,
		"total_pages": 3,
		"current_page": 1,
		"items_per_page": 2
	}
}
```

Response Body (Failed) :

```
{
	"status": "error",
	"error": "level not found"
}
```

## Get Question

Endpoint : GET /api/v1/admin/questions/:question_id

Request Header :

- Authorization : Bearer `<token>`

Response Body (Success) :

```
{
	"status": "success",
	"data": {
		"id": "b1d389fe-c89f-4fc3-bf43-e7f07850c97f",
		"level_id": 1,
		"body": "lorem ipsum....",
		"image_url": "google.3e.image/image1.jpg",
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

Endpoint : PUT /api/v1/admin/questions/:question_id

Request Header :

- Authorization : Bearer `<token>`

Request Body :

```
{
	"level_id": 1,
	"body": "lorem ipsum edit....",
	"image_url": "google.3e.image/image1.jpg"
}
```

Response Body (Success) :

```
{
	"status": "success",
	"data": {
		"id": "b1d389fe-c89f-4fc3-bf43-e7f07850c97f",
		"level_id": 1,
		"body": "lorem ipsum edit....",
		"image_url": "google.3e.image/image1.jpg",
		"created_at": "2025-18-03 11:01:10",
		"updated_at": "2025-18-03 11:01:10"
	}
}
```

Response Body (Failed) :

```
{
	"status": "error",
	"error": "level_id must not blank"
}
```

## Delete Question

Endpoint : DELETE /api/v1/admin/questions/:question_id

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
