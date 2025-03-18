# Level API Spec

## Get List Level

Endpoint : GET /api/v1/admin/levels

Request Header :

- Authorization : Bearer `<token>`

Response Body (Success) :

```
{
	"status": "success"
	"data": [
		{
			"id": 1,
			"level": 1,
			"description": "lorem ipsum...."
			"created_at": "2025-18-03 11:01:10"
			"updated_at": "2025-18-03 11:01:10"
		},
		{
			"id": 2,
			"level": 2,
			"description": "lorem ipsum...."
			"created_at": "2025-18-03 11:01:10"
			"updated_at": "2025-18-03 11:01:10"
		},
	]
}
```

Response Body (Failed) :

```
{
	"status": "error"
	"error": "unauthenticated"
}
```

## Get Level

Endpoint : GET /api/v1/admin/levels

Request Header :

- Authorization : Bearer `<token>`

Response Body (Success) :

```
{
	"status": "success"
	"data": {
		"id": 1,
		"level": 1,
		"description": "lorem ipsum...."
		"created_at": "2025-18-03 11:01:10"
		"updated_at": "2025-18-03 11:01:10"
	}
}
```

Response Body (Failed) :

```
{
	"status": "error"
	"error": "level not found"
}
```

## Update Level (Only description)

Endpoint : PUT /api/v1/admin/levels/:level_id

Request Header :

- Authorization : Bearer `<token>`

Request Body :

```
{
	"description": "lorem ipsum edit..."
}
```

Response Body (Success) :

```
{
	"status": "success"
	"data": {
		"id": 1,
		"level": 1,
		"description": "lorem ipsum edit..."
		"created_at": "2025-18-03 11:01:10"
		"updated_at": "2025-18-03 11:19:21"
	}
}
```

Response Body (Failed) :

```
{
	"status": "error"
	"error": "unauthorized"
}
```
