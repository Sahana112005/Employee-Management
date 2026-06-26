import { useEffect, useState } from "react";
import axios from "axios";
import Login from "./Login";
import "./App.css";
import { FaUsers, FaMoneyBillWave, FaTrophy, FaBuilding } from "react-icons/fa";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import DepartmentChart from "./components/DepartmentChart/DepartmentChart";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("loggedIn") === "true"
  );

  const [employees, setEmployees] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    department: "",
    salary: "",
  });

  const API_URL = "https://employee-management-backend-sahana.onrender.com";

  const getEmployees = async () => {
    const response = await axios.get(`${API_URL}/employees`);
    setEmployees(response.data);
  };

  useEffect(() => {
    if (isLoggedIn) {
      getEmployees();
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    setIsLoggedIn(false);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const saveEmployee = async (e) => {
    e.preventDefault();

    const employeeData = {
      name: form.name,
      email: form.email,
      department: form.department,
      salary: parseFloat(form.salary),
    };

    if (editingId) {
      await axios.put(`${API_URL}/employees/${editingId}`, employeeData);
      alert("Employee Updated Successfully!");
      setEditingId(null);
    } else {
      await axios.post(`${API_URL}/employees`, employeeData);
      alert("Employee Added Successfully!");
    }

    setForm({
      name: "",
      email: "",
      department: "",
      salary: "",
    });

    getEmployees();
  };

  const editEmployee = (emp) => {
    setEditingId(emp.id);

    setForm({
      name: emp.name,
      email: emp.email,
      department: emp.department,
      salary: emp.salary,
    });
  };

  const deleteEmployee = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (confirmDelete) {
      await axios.delete(`${API_URL}/employees/${id}`);
      alert("Employee Deleted Successfully!");
      getEmployees();
    }
  };

  const filteredEmployees = employees.filter((emp) =>
    `${emp.name} ${emp.email} ${emp.department}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const totalSalary = employees.reduce(
    (sum, emp) => sum + Number(emp.salary),
    0
  );

  const highestSalary =
    employees.length > 0
      ? Math.max(...employees.map((emp) => Number(emp.salary)))
      : 0;

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <Header handleLogout={handleLogout} />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-6">
          <div className="bg-white p-6 rounded-xl shadow">
  <div className="flex items-center gap-3">
    <FaUsers className="text-pink-500 text-3xl" />
    <div>
      <p className="text-gray-500">Total Employees</p>
      <h2 className="text-3xl font-bold">{employees.length}</h2>
    </div>
  </div>
</div>

          <div className="bg-white p-6 rounded-xl shadow">
  <div className="flex items-center gap-3">
    <FaBuilding className="text-purple-500 text-3xl" />
    <div>
      <p className="text-gray-500">IT Department</p>
      <h2 className="text-3xl font-bold">
        {
          employees.filter(
            (e) => e.department.toLowerCase() === "it"
          ).length
        }
      </h2>
    </div>
  </div>
</div>

          <div className="bg-white p-6 rounded-xl shadow">
  <div className="flex items-center gap-3">
    <FaMoneyBillWave className="text-green-500 text-3xl" />
    <div>
      <p className="text-gray-500">Total Salary</p>
      <h2 className="text-3xl font-bold">₹{totalSalary}</h2>
    </div>
  </div>
</div>

          <div className="bg-white p-6 rounded-xl shadow">
  <div className="flex items-center gap-3">
    <FaTrophy className="text-yellow-500 text-3xl" />
    <div>
      <p className="text-gray-500">Highest Salary</p>
      <h2 className="text-3xl font-bold">₹{highestSalary}</h2>
    </div>
  </div>
</div>

        </div>


        <div className="bg-white p-6 rounded-xl shadow mb-6">
          <h2 className="text-2xl font-bold mb-4">
            {editingId ? "Update Employee" : "Add Employee"}
          </h2>

          <form
            onSubmit={saveEmployee}
            className="grid grid-cols-1 md:grid-cols-5 gap-4"
          >
            <input
              className="border p-3 rounded-lg"
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              required
            />

            <input
              className="border p-3 rounded-lg"
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />

            <select
              className="border p-3 rounded-lg"
              name="department"
              value={form.department}
              onChange={handleChange}
              required
            >
              <option value="">Select Department</option>
              <option value="IT">IT</option>
              <option value="HR">HR</option>
              <option value="Finance">Finance</option>
              <option value="Marketing">Marketing</option>
            </select>

            <input
              className="border p-3 rounded-lg"
              type="number"
              name="salary"
              placeholder="Salary"
              value={form.salary}
              onChange={handleChange}
              required
            />

            <button className="bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">
              {editingId ? "Update" : "Add"}
            </button>
          </form>
        </div>
          <DepartmentChart employees={employees} />


        <div className="bg-white p-6 rounded-xl shadow">
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
            <h2 className="text-2xl font-bold">Employee List</h2>

            <input
              className="border p-3 rounded-lg w-full md:w-80"
              type="text"
              placeholder="Search by name, email, department..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-900 text-white">
                  <th className="p-4">ID</th>
                  <th className="p-4">Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Department</th>
                  <th className="p-4">Salary</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredEmployees.map((emp) => (
                  <tr key={emp.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">{emp.id}</td>
                    <td className="p-4">{emp.name}</td>
                    <td className="p-4">{emp.email}</td>
                    <td className="p-4">{emp.department}</td>
                    <td className="p-4">₹{emp.salary}</td>

                    <td className="p-4">
                      <button
                        onClick={() => editEmployee(emp)}
                        className="bg-yellow-500 text-white px-4 py-2 rounded-lg mr-2"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteEmployee(emp.id)}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}

                {filteredEmployees.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center p-5 text-gray-500">
                      No Employees Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
          <Footer />
      </div>
    </div>
  );
}

export default App;                        