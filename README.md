# Employee Management System

A Full Stack Employee Management System built using ReactJS, FastAPI, and MySQL.

## Project Overview

This application allows users to manage employee records through CRUD operations (Create, Read, Update, Delete). It includes a dashboard with employee statistics, department-wise charts, search functionality, and authentication.

## Features

- User Login Authentication
- Add Employee
- View Employee List
- Update Employee Details
- Delete Employee Records
- Search Employees
- Dashboard Analytics
- Department-wise Employee Chart
- Responsive UI Design

## Technology Stack

### Frontend
- ReactJS
- Axios
- Tailwind CSS
- React Icons
- Recharts

### Backend
- Python
- FastAPI
- Uvicorn

### Database
- MySQL

### Tools
- VS Code
- Git
- GitHub
- Vercel

## Project Structure

```text
employee-management/
│
├── backend/
│   ├── main.py
│   ├── models/
│   └── ...
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── ...
│
├── README.md
└── .gitignore
```

## System Architecture

```text
User
 ↓
ReactJS Frontend
 ↓
Axios API Calls
 ↓
FastAPI Backend
 ↓
MySQL Database
```

## API Endpoints

| Method | Endpoint | Description |
|----------|----------|-------------|
| GET | /employees | Get all employees |
| POST | /employees | Add employee |
| PUT | /employees/{id} | Update employee |
| DELETE | /employees/{id} | Delete employee |

## Installation

### Clone Repository

```bash
git clone https://github.com/Sahana112005/Employee-Management.git
```

### Backend Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## Future Enhancements

- Attendance Management
- Payroll Management
- Role-Based Authentication
- Employee Profile Pictures
- Export Reports to PDF/Excel

## Author

Sahana

Python Full Stack Development Intern