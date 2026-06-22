import { useState } from "react";
import axios from "axios";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/login",
        {
          username,
          password,
        }
      );

      if (response.data.success) {
        localStorage.setItem("loggedIn", "true");
        onLogin();
      }
    } catch (error) {
      alert("Invalid Username or Password");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h1 className="text-3xl font-bold text-center mb-6">
          Employee Login
        </h1>

        <form onSubmit={handleLogin}>
          <input
            className="border w-full p-3 rounded-lg mb-4"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
            required
          />

          <input
            className="border w-full p-3 rounded-lg mb-4"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

          <button
            className="bg-blue-600 text-white w-full p-3 rounded-lg hover:bg-blue-700"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-center text-gray-500">
          Username: admin <br />
          Password: admin123
        </div>
      </div>
    </div>
  );
}

export default Login;