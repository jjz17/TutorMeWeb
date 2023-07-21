# TutorMe Web App

## Getting Started

This uses npm!

```sh
npm install
```

Copy the `.env` file to your root folder and start: it should run on [localhost](http://localhost:3000)

```sh
npm start
```

Also run the following for pre-commit hooks:

```sh
pre-commit install
```

## Firebase

- Each chat has its own ticket
- **userTickets** is a list of open and closed tickets (uid) per user
- **tickets** stores all ticket info
- **webUsers** stores user info
- passwords are authenticated separately via firebase
- for now, **userChats** has chats for pairs of users

## idk

After the new update of React, you won't be able to use CRA. But you can easily create your applications with Vite before following the video tutorial.

[Create a React App with Vite](https://github.com/safak/youtube23/tree/react-mini)
