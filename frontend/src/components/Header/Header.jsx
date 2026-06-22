function Header({ handleLogout }) {
  return (
    <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-8 rounded-2xl shadow-lg mb-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-5xl font-bold">
            Employee Management System
          </h1>

          <p className="mt-3 text-pink-100">
            ReactJS + FastAPI + MySQL Full Stack CRUD Project
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-600 px-5 py-3 rounded-lg font-semibold hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Header;