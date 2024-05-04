# Next Auth Application
This is a simple Login application with credentials and github.

## Technologies Used
- Next.js: A React framework for building server-side rendered (SSR) and statically generated web applications.
- MongoDB: A NoSQL database for storing note data.
- Tailwind CSS: A utility-first CSS framework for designing responsive and customizable UI components.

## Features
- User login with credentials and github.
- Authorisation and authentication using next-auth
- password encrypt with bcryptjs
- Protected routes
- Error handling
- Form Validation

### Install dependencies
- Clone the repository: 
```
    https://github.com/ALPMadhuranga/next-auth-app.git
```
- Install dependencies:
```
  npm install
```
### Configuration
- Create a .env.example file in the root directory and add the following environment variables:
  ```
     - MONGO_URL= your mongodb connection url
     - NEXTAUTH_URL="http://localhost:3000"
     - NEXTAUTH_SECRET= `abcd1234`
     - GITHUB_ID= your github ID
     - GITHUB_SECRET= your github secret key
  ```

### Getting Started

```bash
   npm run dev
```
- Access the application in your browser: http://localhost:3000
