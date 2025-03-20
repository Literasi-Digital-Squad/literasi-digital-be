# PARTICIPANT API SPEC

## POST Participant

Endpoint: POST /v1/participants

Request Body :

```
{
	"name": "tantowi",
	"age": 1000,
	"phone": "0812345678910",
	"email": "iniEmail@gmail.com"
}
```

Response Body (Success):

```
{
	"status": "success",
	"data": [
		{
			"id": 1,
			"name": "tantowi",
			"age": 1000,
			"phone": "0812345678910",
			"email": "iniEmail@gmail.com",
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
	"error": "Something Went Wrong"
}
```

## GET Single Participant

Endpoint: GET /v1/participants/:id

Response Body (Success):

```
{
	"status": "success",
	"data": [
		{
			"id": 1,
			"name": "tantowi",
			"age": 1000,
			"phone": "0812345678910",
			"email": "iniEmail@gmail.com",
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
	"error": "Participant Not Found"
}
```

## GET Single Result by Participant

Endpoint: GET /v1/participants/:id/results

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
