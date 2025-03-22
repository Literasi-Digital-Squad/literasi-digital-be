# Admin Auth API Spec

## Register Admin

Endpoint : POST /api/v1/admin/register

Request Body :

```
{
	"name": "Admin 1"
	"password": "12354",
	"email": "admin1@gmail.com"
}
```

Response Body (Success) :

```
{
	"status": "success"
	"data": {
        	"id": 1,
        	"name": "Tantowi Shah Hanif",
        	"email": "tantows001@gmail.com",
		"created_at": "2025-18-03 11:01:10",
		"updated_at": "2025-18-03 11:01:10"
	}
}
```

Response Body (Failed) :

```
{
	"status": "error"
	"error": "username or password is wrong"
}
```

## Login Admin

Endpoint : POST /api/v1/admin/login

Request Body :

```
{
	"email": "admin1@gmail.com",
	"password": "12354"
}
```

Response Body (Success) :

```
{
	"status": "success",
	"data": {
       		"id": 1,
       		"name": "Admin 1",
       		"email": "admin1@gmail.com",
		"created_at": "2025-18-03 11:01:10",
		"updated_at": "2025-18-03 11:01:10"
    	},
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6Isadlsankldnaskldjajoiijwqoidjioqwjdoqw"
}
```

Response Body (Failed) :

```
{
	"status": "error",
	"error": "username must not blank"
}
```

## Get Admin

Endpoint : GET /api/v1/admin

Request Header :

- Authorization: Bearer `<token>`

Response Body (Success) :

```
{
	"status": "success",
	"data": {
        	"id": 1,
       		"name": "Admin 1",
       		"email": "admin1@gmail.com",
		"created_at": "2025-18-03 11:01:10",
		"updated_at": "2025-18-03 11:01:10"
	}
}
```

Response Body (Failed) :

```
{
	"status": "error",
	"error": "user is not found, ..."
}
```

## Update Admin

Endpoint : PATCH /api/v1/admin

Request Header :

- Authorization : Bearer `<token>`

Request Body :

```
{
	"name": "Admin 1",
	"password": "12354",
	"email": "admin1@gmail.com"
}
```

Response Body (Success) :

```
{
	"status": "success",
	"data": {
        	"id": 1,
       		"name": "Admin 1",
       		"email": "admin1@gmail.com",
		"created_at": "2025-18-03 11:01:10",
		"updated_at": "2025-18-03 11:01:10"
	}
}
```

Response Body (Failed) :

```
{
	"status": "error",
	"error": "unauthorized"
}
```
