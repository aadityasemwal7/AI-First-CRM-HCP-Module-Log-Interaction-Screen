# AI-First CRM HCP Module

An AI-powered Customer Relationship Management (CRM) application for Healthcare Professionals (HCPs). This project enables medical representatives to log and manage HCP interactions through both a structured form and a conversational AI interface powered by **LangGraph** and **Groq LLMs**.

## Tech Stack

### Frontend

* React
* Redux Toolkit
* Tailwind CSS
* Axios

### Backend

* FastAPI
* SQLAlchemy
* PostgreSQL
* LangGraph
* LangChain
* Groq (`gemma2-9b-it`)

---

# Features

* Log HCP interactions using a structured form
* Log HCP interactions using AI chat
* Edit existing interactions
* Search previous interactions
* Delete interactions
* AI-generated interaction summaries
* LangGraph-powered AI agent with multiple tools

---

# Project Structure

```text
project-root/
│
├── frontend/
│
├── backend/
│   ├── app/
│   │   ├── ai/
│   │   ├── api/
│   │   ├── models.py
│   │   ├── schemas.py
│   │   ├── crud.py
│   │   ├── database.py
│   │   └── main.py
│   │
│   ├── requirements.txt
│   └── .env
│
└── README.md
```

---

# Prerequisites

Install the following before running the project:

* Python 3.11+
* Node.js 20+
* npm
* PostgreSQL
* Git

---

# Clone the Repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd <PROJECT_FOLDER>
```

---

# Backend Setup

Navigate to the backend directory.

```bash
cd backend
```

Create a virtual environment.

### Windows

```bash
python -m venv venv
venv\Scripts\activate
```

### Linux/macOS

```bash
python3 -m venv venv
source venv/bin/activate
```

Install Python dependencies.

```bash
pip install -r requirements.txt
```

---

# PostgreSQL Setup

Install PostgreSQL and create a database.

Example database name:

```text
ai_crm
```

Update the `.env` file with your database credentials.

Example:

```env
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/ai_crm

GROQ_API_KEY=YOUR_GROQ_API_KEY
```

---

# Run Backend

```bash
uvicorn app.main:app --reload
```

Backend will be available at:

```text
http://localhost:8000
```

Swagger API documentation:

```text
http://localhost:8000/docs
```

---

# Frontend Setup

Open a new terminal.

```bash
cd frontend
```

Install dependencies.

```bash
npm install
```

Run the development server.

```bash
npm run dev
```

Frontend will run at:

```text
http://localhost:5173
```

---

# Environment Variables

Backend `.env`

```env
DATABASE_URL=

GROQ_API_KEY=
```

---

# LangGraph Tools

The AI agent uses the following tools:

1. Log Interaction
2. Edit Interaction
3. Search Interaction
4. Delete Interaction
5. Summarize Interaction

---

# API Endpoints

| Method | Endpoint            | Description        |
| ------ | ------------------- | ------------------ |
| POST   | `/chat`             | AI chat endpoint   |
| POST   | `/interaction`      | Create interaction |
| GET    | `/interaction`      | List interactions  |
| PUT    | `/interaction/{id}` | Update interaction |
| DELETE | `/interaction/{id}` | Delete interaction |

---

# Running the Complete Application

Start the backend.

```bash
cd backend
uvicorn app.main:app --reload
```

Start the frontend.

```bash
cd frontend
npm run dev
```

Open:

```text
Frontend:
http://localhost:5173

Backend:
http://localhost:8000

Swagger:
http://localhost:8000/docs
```

---

# Future Improvements

* Authentication and authorization
* Role-based access control
* Advanced AI recommendations
* Dashboard and analytics
* Interaction history timeline
* File upload support
* Email and calendar integration

---

# License

This project was developed as part of a technical interview assignment.
