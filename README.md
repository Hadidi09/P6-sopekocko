# Build a secure API for a food review application

This is the front-end and back-end for Project 6 of the Junior Web Developer path.

## Api security in compliance with RGPD and OWASP

.Broken authentication and session management. I use (password-validator ,Bcrypt and jsonwebtoken packages)
.Scripts XSS (Cross-Site Scripting). I use (express-mongo-sanitize)
.Broken access control. 2 types of database administrator rights must be defined:
Access to delete or modify tables, and access to edit the contents of the database
.Exposure of sensitive data. I use (dotenv and maskdata)
.(Helmet) helps me to secure the Express application by defining various HTTP headers

### Installation

Clone this repository,
in the terminal make a cd dwj-project6,
then do a npm install,
then do a npm run start,
wait for ng serve to launch,
it can be long sometimes.
open a new terminal,
make a cd backend,
then do a npm install,
then do a npm run start,
in your browser type localhost:4200,
add your own hot sauce.
