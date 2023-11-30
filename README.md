# Node.js + PostgreSQL Task

In this task, I chose to use CommonJS modules to demonstrate my understanding of them. Additionally, I deliberately pushed dev.env to showcase the local variables I worked with.

The backend meets all neccessary requirements:

1. /users POST - create user with the next fields: first_name (required, only letters),
   last_name (only letters), email (required, unique, correct format), phone (correct format),
   password (hash)
2. /login POST - create API for user login by email and password. Use JWT authentication
3. /users/:id GET - get 1 user by id.
4. /users/:id PUT - update user, add validation. Connect Socket.IO for sending push
   notifications after user update.

The task includes the following technologies and libraries:

1. PostgreSQL Database
2. JavaScript
3. Node.js/Express.js
4. Bctypt
5. Joi
6. JWT
7. Pg
8. Socket.io
