TinyURL
This project is a URL shortening service similar to TinyURL. It allows users to shorten long URLs into more manageable links. Users can create shortened links, manage their account details, and track click analytics.

Technologies Used
Node.js: Backend JavaScript runtime environment.
Express: Web application framework for Node.js.
MongoDB: NoSQL database used for storing user and link data.
Mongoose: MongoDB object modeling for Node.js.
Cors: Middleware for enabling Cross-Origin Resource Sharing.
dotenv: Module for loading environment variables from a .env file.
Project Structure
The project consists of the following main components:

Database Setup (database.js): Establishes connection to MongoDB and defines basic database operations.

User Routes (userRoutes.js): Handles user-related HTTP requests (e.g., create, read, update, delete users).

Link Routes (linkRoutes.js): Manages link-related HTTP requests (e.g., create, read, update, delete links).

Models (user.js, link.js): Mongoose schemas defining the structure of User and Link objects stored in the database.

Controllers (userController.js, linkController.js): Implements the business logic for handling user and link operations.

Getting Started
Clone the repository:

bash
Copy code
git clone https://github.com/your/repository.git
cd repository-folder
Install dependencies:

bash
Copy code
npm install
Set environment variables:

Create a .env file in the root directory and add the following:

bash
Copy code
PORT=3000
MONGODB_URI=mongodb://localhost:27017/tinyurl
Adjust MONGODB_URI based on your MongoDB configuration.

Start the server:

bash
Copy code
npm start
The server will start at http://localhost:3000.

API Endpoints
Users
POST /users: Create a new user.
GET /users: Retrieve all users.
GET /users/:id: Retrieve a user by ID.
PATCH /users/:id: Update a user by ID.
DELETE /users/:id: Delete a user by ID.
Links
POST /links: Create a new shortened link.
GET /links: Retrieve all shortened links.
GET /links/:id: Retrieve a shortened link by ID.
PATCH /links/:id: Update a shortened link by ID.
DELETE /links/:id: Delete a shortened link by ID.
GET /redirect/:id: Redirect to the original URL and update click analytics.
GET /links/:id/clicksBySource: Retrieve click analytics grouped by different sources.
Contributors
Your Name: Role/Responsibility
License
This project is licensed under the MIT License - see the LICENSE file for details.

