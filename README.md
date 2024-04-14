# Book Library Application

This application is a user-friendly book library developed using Next.js and React. It interfaces with a Spring Boot backend and uses PostgreSQL for database management.

## Description

The application allows you to manage a collection of books, authors, and publishers. This includes adding new entries, editing existing ones, and deleting outdated records. The frontend is built with Next.js and React, providing a dynamic and interactive user interface.

## Contents

- [Running the Application](#running-the-application)
- [Docker](#docker)
- [Backend Repository](#backend-repository)
- [Developer Contacts](#developer-contacts)

## Running the Application

To run the application, you need to have Node.js and npm installed on your machine. You can then clone the repository and run the application using the following commands:

```sh
git clone https://github.com/fozboom/book-library-ui.git
cd book-library-ui
npm install
npm run dev
```

The application will start and be accessible at `http://localhost:3000`.

## Docker

This application can also be run using Docker. The Dockerfile is included in the repository. To build and run the Docker image, use the following commands:

```sh
docker build -t book_lib_frontend .   
docker run -p 3000:3000 book_lib_frontend
```

The application will start and be accessible at `http://localhost:3000`.

## Backend Repository

The backend code for this application is located in a separate repository. You can find it [here](https://github.com/fozboom/book-library-ui).

## Developer Contacts

For any questions or suggestions, please contact the developer at <fozboom@gmail.com>.
