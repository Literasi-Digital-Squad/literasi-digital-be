# 📑 Asesmen Literasi Digital Backend

## 📌 About

This application is a self-assessment tool designed to measure users' digital literacy using the Item Response Theory (IRT) algorithm. By adapting questions based on individual ability levels, it provides more accurate and personalized assessment results.

## 🚀 **Features**

**🔹Assesment Digital Literation**

🔹**Admin Dashboard**

## 🔧Getting started

**Clone**

```
git clone https://github.com/Literasi-Digital-Squad/literasi-digital-be.git
cd literasi-digital-be

```

**Setup Environment**

```
cp .env.example .env
```

**Install local dependencies**

```
npm install
```

**Generate & Migrate the database**

```
npx prisma generate
npx prisma migrate dev
```

**Running Service**

```
npm run dev
```

## 🛠️Technologies (Backend)

**TypeScript** : A statically typed superset of JavaScript used for building scalable and maintainable back-end applications.

**Express** : A minimal and flexible Node.js framework for handling HTTP requests and building web APIs.

## 📁Project Structure (Backend)

```
|-- doc/                # API Documentation folder
|-- prisma/             # Database related folder
|-- src/
|   |-- app/
|       |-- app.ts      # Main server code
|       |-- controller/ # Controller using service
|       |-- error/      # Error handler logic
|       |-- lib/      	# Helper module
|       |-- middleware/ # Middleware
|       |-- model/      # Model type for database
|       |-- routes/     # Routes logic
|       |-- service/    # Service Application logic
|       |-- types/      # Extended type for model
|       |-- validation/ # Request validation
|-- test/               # Testing folder
```

## 🧾License

This project is licensed under the [MIT](https://github.com/tantowish/zenspire-be/blob/main/MIT-LICENSE.txt) License. You are free to use, modify, and distribute the code as you see fit.
