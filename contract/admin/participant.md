# PARTICIPANT API SPEC

## GET List Participant

Endpoint: GET /v1/admin/participants?limit=&page=

Request Header:

* Authorization: Bearer `<token>`

Query Parameters:

- Page: `<page number>`
- Limit: `<limit per page>`

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
		},
		{
			"id": 2,
			"name": "rafaz",
			"age": 5000,
			"phone": "0811223334455",
			"email": "iniContohEmail@gmail.com",
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
	"error": "Participants Not Found"
}
```

## PUT Question

Endpoint: PUT /v1/admin/participants/:id

Request Header:

* Authorization: Bearer `<token>`

Request Body:

```
{
	"name": "tantowi"
	"age": 1000
	"phone": "0812345678910"
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
}
```

Response Body (Failed) :

```
{
	"status": "error",
	"error": "Participants Data Is Required"
}
```

## DELETE Question

Endpoint: DELETE /v1/admin/participants/:id

Request Header:

* Authorization: Bearer `<token>`

Response Body (Success):

```
{
	"status": "success"
}
```

Response Body (Failed):

```
{
	"status": "error",
	"error": "Participant Not Found"
}
```
