# Chat-App


A full-stack, real-time chat application built with the MERN stack (MongoDB, Express, React, Node.js) and Socket.IO. This application allows users to sign up, log in, chat with other users in real-time, see their online status, and share text messages and images.

## Features

- **Real-Time Messaging**: Instant message delivery using WebSockets (Socket.IO).
- **User Authentication**: Secure user signup and login functionality with JWT (JSON Web Tokens).
- **One-on-One Chat**: Private conversations between users.
- **Online Status**: See which users are currently online.
- **Image Sharing**: Upload and send images in chats, powered by Cloudinary.
- **User Profiles**: View and update your profile, including your profile picture.
- **Customizable Themes**: Multiple UI themes to personalize your experience, powered by DaisyUI.
- **Responsive Design**: A clean and modern interface that works on all screen sizes.

## Tech Stack

| Category      | Technology                                                                                                    |
|---------------|---------------------------------------------------------------------------------------------------------------|
| **Frontend**  | [React](https://reactjs.org/), [Vite](https://vitejs.dev/), [Tailwind CSS](https://tailwindcss.com/), [DaisyUI](https://daisyui.com/), [Zustand](https://github.com/pmndrs/zustand), [Socket.io-client](https://socket.io/docs/v4/client-api/), [Axios](https://axios-http.com/) |
| **Backend**   | [Node.js](https://nodejs.org/), [Express.js](https://expressjs.com/), [Socket.IO](https://socket.io/), [MongoDB](https://www.mongodb.com/), [Mongoose](https://mongoosejs.com/), [JWT](https://jwt.io/), [bcryptjs](https://github.com/dcodeIO/bcrypt.js), [Cloudinary](https://cloudinary.com/) |

## Project Structure

The repository is structured as a monorepo with two main directories:

-   `Backend/`: Contains the Node.js/Express server, API routes, controllers, models, and WebSocket logic.
-   `Frontend/`: Contains the React application, built with Vite, including components, pages, and state management with Zustand.

## Prerequisites

-   Node.js (v18.x or higher)
-   npm
-   MongoDB instance (local or remote, e.g., MongoDB Atlas)
-   A Cloudinary account for image storage

## Getting Started

Follow these steps to set up and run the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/vishalkumarkhatri/Chat-App.git
cd Chat-App
```

### 2. Backend Setup

1.  Navigate to the backend directory:
    ```bash
    cd Backend
    ```

2.  Install the required dependencies:
    ```bash
    npm install
    ```

3.  Create a `.env` file in the `Backend` directory and add the following environment variables. Replace the placeholder values with your own.

    ```env
    PORT=3000
    MONGODB_URI=<your_mongodb_connection_string>
    JWT_SECRET=<your_jwt_secret>
    CLOUDINARY_CLOUD_NAME=<your_cloudinary_cloud_name>
    CLOUDINARY_API_KEY=<your_cloudinary_api_key>
    CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>
    ```

4.  Start the backend server:
    ```bash
    # For development with automatic restarts
    npm run dev

    # For production
    npm start
    ```
    The backend server will be running at `http://localhost:3000`.

### 3. Frontend Setup

1.  Open a new terminal window and navigate to the frontend directory:
    ```bash
    cd Frontend
    ```

2.  Install the required dependencies:
    ```bash
    npm install
    ```

3.  Start the frontend development server:
    ```bash
    npm run dev
    ```
    The React application will be available at `http://localhost:5173`.

### 4. Usage

1.  Open `http://localhost:5173` in your web browser.
2.  Create a new account on the Signup page. To test the chat functionality, create at least two different accounts.
3.  Open the application in two separate browser windows (or an incognito window) and log in with the different accounts.
4.  You will see the other user's status as "Online" in the sidebar.
5.  Click on a user in the sidebar to start a conversation.
6.  Send text messages or upload images to chat in real-time.
