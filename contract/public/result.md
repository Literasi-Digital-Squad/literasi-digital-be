# RESULT API SPEC

## POST Result

Endpoint: POST /v1/results

Request Body:

```
{
	"participant_id": 1,
	"level_result": 10,
	"description": "Lorem Ipsum...",
}
```

Response Body (Success):

```
{
	"status": "success",
	"data": [
		{
			"id": "b1d389fe-c89f-4fc3-bf43-e7f07850c97f",
			"participant_id": 1,
			"level_result": 10,
			"description": "Lorem Ipsum...",
			"created_at": "2025-18-03 11:01:10",
			"updated_at": "2025-18-03 11:01:10"
		}s
	]
}
```

Response Body (Failed):

```
{
	"status": "error",
	"error": "Something Went Wrong"
}
```

## GET Single Result

Enfpoint: GET /v1/results/:id

Response Body (Success):

```
{
	"status": "success",
	"data": [
		{
			"id": "b1d389fe-c89f-4fc3-bf43-e7f07850c97f",
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
