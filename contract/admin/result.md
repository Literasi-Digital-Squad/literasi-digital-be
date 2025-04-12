# RESULT API SPEC

## GET List Result

Endpoint: GET /v1/admin/results

Request Header:

* Authorization: Bearer `<token>`

Response Body (Success):

```
{
	"status": "success",
	"data": [
		{
			"id": 1,
			"participant_id": 1,
			"level_result": 10,
			"description": "Lorem Ipsum...",
			"created_at": "2025-18-03 11:01:10",
			"updated_at": "2025-18-03 11:01:10"
		},
		{
			"id": 2,
			"participant_id": "2",
			"level_result": 7,
			"description": "8910",Lorem Ipsum...
			"created_at": "2025-18-03 11:01:10",
			"updated_at": "2025-18-03 11:01:10"
		}
	]
}
```

Response Body (Failed):

```
{
	"status": "error",
	"error": "Results Not Found"
}
```

## GET Single Result

Endpoint: GET /v1/admin/results/:id

Request Header:

* Authorization: Bearer `<token>`

Response Body (Success):

```
{
	"status": "success",
	"data": [
		{
			"id": 1,
			"participant_id": "1",
			"level_result": 10,
			"description": "Lorem Ipsum...",
			"created_at": "2025-18-03 11:01:10",
			"updated_at": "2025-18-03 11:01:10"
		}
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
