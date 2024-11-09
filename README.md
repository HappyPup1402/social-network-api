# social-network-api

## Description

The Social Network API is a backend API designed for a social networking application. This API allows users to share thoughts, react to friends' thoughts, and manage a list of friends. Built with Express.js and MongoDB, with Mongoose as the ODM, this project provides a robust foundation for a social network platform, supporting user interaction and dynamic content sharing.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Demo](#demo)
- [Questions](#questions)

## Installation

To get started with the Social Network API, clone the repository and follow these steps:

1. Clone the repository:
    ```
    git clone git@github.com:HappyPup1402/social-network-api.git
    ```

2. Navigate to the project directory:
    ```
    cd social-network-api
    ```

3. Install the necessary dependencies:
    ```
    npm install
    ```

5. Build the project:
    ```
    npm run build
    ```

6. Seed the database (optional for testing data):
    ```
    npm run seed
    ```

7. Start the server:
    ```bash
    npm run start
    ```

The server will start, and Mongoose will connect to the MongoDB database, syncing the models.

## Usage

Once the server is running, you can test the API endpoints using a tool like Insomnia or Postman. The API supports the following interactions:

1. **Users**
   - **GET** `/api/users` - Retrieve all users.
   - **POST** `/api/users` - Create a new user.
   - **PUT** `/api/users/:id` - Update user information by ID.
   - **DELETE** `/api/users/:id` - Remove a user by ID.

2. **Thoughts**
   - **GET** `/api/thoughts` - Retrieve all thoughts.
   - **POST** `/api/thoughts` - Create a new thought.
   - **PUT** `/api/thoughts/:id` - Update a thought by ID.
   - **DELETE** `/api/thoughts/:id` - Remove a thought by ID.

3. **Friends**
   - **POST** `/api/users/:userId/friends/:friendId` - Add a friend to a user's friend list.
   - **DELETE** `/api/users/:userId/friends/:friendId` - Remove a friend from a user's friend list.

4. **Reactions**
   - **POST** `/api/thoughts/:thoughtId/reactions` - Add a reaction to a thought.
   - **DELETE** `/api/thoughts/:thoughtId/reactions/:reactionId` - Remove a reaction from a thought.

## Features

- **User Management**: Create, read, update, and delete users with a full CRUD API.
- **Thought Sharing**: Users can post thoughts, update them, and delete them.
- **Reactions to Thoughts**: Users can react to thoughts with subdocument reactions.
- **Friend List Management**: Add and remove friends from a user's friend list.
- **Error Handling**: Comprehensive error handling for smooth API usage and improved developer experience.

## Demo

Walkthrough video: [Demo](https://app.screencastify.com/v3/watch/J2R4NKp17sIQetmOpqxZ)

## Questions

If you have any questions about this project, feel free to reach out to me at [izaacramirez1402@gmail.com](mailto:izaacramirez1402@gmail.com) or visit my GitHub profile at [HappyPup1402](https://github.com/HappyPup1402).
