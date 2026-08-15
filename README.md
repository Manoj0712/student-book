# Book Editor Application

A full-stack book editor application with a React-based frontend and Express/MongoDB backend. The application uses `react-grid-layout` to create and manage draggable/resizable book widgets.

## Architecture

* **Client:** React + TypeScript + Vite
* **Backend:** Node.js + Express.js
* **Database:** MongoDB with Mongoose
* **API:** REST APIs for managing books, pages, and widgets
* **Editor:** `react-grid-layout` for draggable and resizable widgets
* **Styling:** Tailwind CSS
* **Application structure:** Frontend and backend are separated into independent applications.

## Setup Instructions

### 1. Clone the repository

```bash
git clone <repository-url>
cd <project-folder>
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

Configure the required environment variables in the backend `.env` file.

Then start the backend:

```bash
npm run dev
```

### 3. Install Client Dependencies

Open a new terminal:

```bash
cd client
npm install
```

Start the frontend:

```bash
npm run dev
```

The frontend and backend ports can be configured through the project environment/configuration files.

## Main npm Packages

### Client

* `react` – UI development
* `react-dom` – React DOM rendering
* `typescript` – Type safety
* `vite` – Development server and build tool
* `react-grid-layout` – Drag-and-drop and resizable widget layout
* `react-router-dom` – Client-side routing
* `axios` – API communication
* `tailwindcss` – Styling

### Backend

* `express` – REST API server
* `mongoose` – MongoDB object modeling
* `cors` – Cross-origin resource sharing
* `dotenv` – Environment variable management
* `nodemon` – Development server auto-restart

## Project Structure

```text
project/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── config/
│   └── server.js
│
└── client/
    ├── src/
    │   ├── api/
    │   ├── components/
    │   ├── pages/
    │   ├── hooks/
    │   ├── types/
    │   └── utils/
    └── package.json
```

## Running the Application

Run both applications in separate terminals:

**Terminal 1 – Backend**

```bash
cd backend
npm install
npm run dev
```

**Terminal 2 – Client**

```bash
cd client
npm install
npm run dev
```

The client communicates with the backend through REST APIs, while MongoDB is used for persistent book and widget data.
