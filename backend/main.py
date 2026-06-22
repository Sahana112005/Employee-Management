from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import mysql.connector

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="May2026",
        database="employee_db"
    )

class Employee(BaseModel):
    name: str
    email: str
    department: str
    salary: float

class LoginData(BaseModel):
    username: str
    password: str

@app.get("/")
def home():
    return {"message": "Employee Management API Running"}

@app.post("/login")
def login(data: LoginData):
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute(
        "SELECT * FROM users WHERE username=%s AND password=%s",
        (data.username, data.password)
    )

    user = cursor.fetchone()

    cursor.close()
    conn.close()

    if user:
        return {
            "success": True,
            "message": "Login Successful"
        }

    raise HTTPException(
        status_code=401,
        detail="Invalid Username or Password"
    )

@app.get("/employees")
def get_employees():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT * FROM employees")
    employees = cursor.fetchall()

    cursor.close()
    conn.close()

    return employees

@app.post("/employees")
def add_employee(employee: Employee):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        """
        INSERT INTO employees
        (name,email,department,salary)
        VALUES(%s,%s,%s,%s)
        """,
        (
            employee.name,
            employee.email,
            employee.department,
            employee.salary
        )
    )

    conn.commit()

    cursor.close()
    conn.close()

    return {"message": "Employee Added Successfully"}

@app.put("/employees/{employee_id}")
def update_employee(employee_id: int, employee: Employee):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        """
        UPDATE employees
        SET name=%s,
            email=%s,
            department=%s,
            salary=%s
        WHERE id=%s
        """,
        (
            employee.name,
            employee.email,
            employee.department,
            employee.salary,
            employee_id
        )
    )

    conn.commit()

    cursor.close()
    conn.close()

    return {"message": "Employee Updated Successfully"}

@app.delete("/employees/{employee_id}")
def delete_employee(employee_id: int):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        "DELETE FROM employees WHERE id=%s",
        (employee_id,)
    )

    conn.commit()

    cursor.close()
    conn.close()

    return {"message": "Employee Deleted Successfully"}