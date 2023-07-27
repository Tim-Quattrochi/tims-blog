# Blog Talk

This Blog app lets users register, create, read, edit, and delete blog posts.

![picture of the landing](/current-look2.png)

### Table of Contents

---

1. [Development](#development)
2. [What I learned](#what-i-learned)
3. [Server ENV Variables](#server-environment-variables)
4. [Starting the app](#starting-the-app)
5. [Tech Stack](#tech-stack)
6. [Features](#features)

## The Why

This project was started on Nov 22, 2022, while I was still enrolled at Kenzie Academy by Southern New Hampshire University. It was a way for me to practice useReducer, custom React Hooks, Context API, data persistence, and styling. On July 24th, 2023, I decided to refactor (I don't like having incomplete projects). The result is a more visually appealing blog app and a better component/file structure.

### What I learned

---

Working on this App was challenging. I learned more about managing state with useReducer and Context API, making custom React hooks for actions I realized I was using in a lot of components. React Bootstrap is good because it has a lot of pre-built components, but a lot of them are generic and I learned about how to customize them by reading the Bootstrap documentation to get my own personal vision into them.

I also worked more on form validation and how to customize Bootstrap inputs with your own messages and make my inputs more accessible to screen readers or other assistive technology. Since the project was started with React Bootstrap I decided to stick with Bootstrap and learn more about customizing React Bootstrap components.

Looking at the codebase after 7 months was challenging. I have grown so much that seeing my code after all this time made it seem like I was reading someone else's code. For example, in my navbar, I was checking if a user was a returning user by looking in the local storage when I already had this action set up in my AuthProvider. I refactored a lot of code that wasn't DRY, or that I thought would be a more efficient way.
Another example is I was setting a logged-in state in one component when I had an isAuthenticated state in my provider, so I restructured to use that instead.

### Development

---

Blog Talk requires [Node.js](https://nodejs.org/) v10+ to run. Tested on version `18.16.0`

This App uses [NPM](https://www.npmjs.com/) Node Package Manager to manage its dependencies and packages.

from the **Root** directory

```
$ npm install
```

This will install dependencies for the front end and backend simultaneously as I have configured [Workspaces] to define the `client` and `server` directories.

### Server environment variables

---

Create a .env file in the server folder and add your values.

For example:

```
 PORT=3001
 API_URL="api"
 NODE_ENV=development
 DB_URL=DB_URI=YOUR_OWN_MONGO_DB_CONNECTION_STRING
 JWT_SECRET=YOUR_JWT_SECRET
```

### Starting the app

---

This App uses [concurrently] to start both the client and server. I have configured the root `package.json` to define workspaces with the client and server. So in the ROOT directory:

```
$ npm start
```

This will start your `client` on `http://localhost:3000/` and backend in development mode on `http://localhost:3001/`, with the server listening on `PORT` 3001.

## Features

- Login and Register.
- User Profile
- Authentication using JSON web tokens.
- Create, Read, Update, and delete blogs.
- Protected client side routes.
- Save a draft blog.
- See most recent blog previews.

## Tech Stack

### **Front-end**

- [Create-React-App] - is a command-line tool that automates the setup process for React.js projects, providing a pre-configured development environment. It simplifies React project creation, allowing developers to focus on building their applications without worrying about complex build configurations.

- [React] - React is a JavaScript library for building user interfaces, using a declarative and component-based approach for efficient UI development.

- [React Bootstrap] - React Bootstrap is a library that integrates Bootstrap components seamlessly into React applications, simplifying UI development with pre-built, reusable components.

### **Back-end**

---

- [Mongoose] - is an object modeling tool for MongoDB and Node.js.

- [Node.js] - Cross-platform, open-source server environment that can run on Windows, Linux, Unix, macOS, and more. Node.js is a backend JavaScript runtime environment that runs on the V8 JavaScript Engine and executes JavaScript code outside a web browser.

- [Express] - is a backend web application framework for building RESTful APIs with Node.js

- [MongoDB] - is a fully managed cloud database service that allows you to quickly deploy, scale, and operate MongoDB databases in the cloud.

- [JSON Web Tokens] - are a secure way to represent claims between parties. They are commonly used for user authentication and authorization in web applications, providing efficient and scalable solutions. JWTs store user information in a compact format and are widely adopted due to their stateless nature, improving performance and scalability. However, security measures must be taken to protect JWTs from potential attacks.

- [Bcrypt] - is a secure cryptographic hashing function used to hash passwords in web applications. It provides strong protection against password-related attacks, making it a preferred choice for password storage and authentication.

**Find a bug?**

I welcome contributions. Simply fork the repository and open a pull request and I will review them.

[tailwind css]: https://tailwindcss.com/docs/guides/vite
[Bcrypt]: https://www.npmjs.com/package/bcrypt
[create-react-app]: https://create-react-app.dev/
[mongoose]: https://mongoosejs.com/
[mongodb]: https://www.mongodb.com/atlas/database
[React Bootstrap]: https://react-bootstrap.netlify.app/
[node.js]: http://nodejs.org
[JSON Web Tokens]: https://jwt.io/
[express]: http://expressjs.com
[react]: https://react.dev/
[concurrently]: https://www.npmjs.com/package/concurrently
[http://54.90.137.205/]: http://54.90.137.205/
[Workspaces]: https://docs.npmjs.com/cli/v8/using-npm/workspaces
