import { useEffect, useState } from "react";
import Signup from "../components/Signup";
import Login from "../components/Login";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AddAddress from "../components/AddAddress";
import SelectAddress from "../components/SelectAddress";
import { Link } from "react-router-dom";

function Auth() {
  const [active, setActive] = useState(0);
  // Parse user object from localStorage on load
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Sync user state to localStorage when it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("token"); // Clear token too
    }
  }, [user]);

  const handleLogout = () => {
    setUser(null);
    setActive(0);
  };

  return (
    <div className="min-h-screen">
      {!user ? (
        active === 0 ? (
          <Signup setActive={setActive} setUser={setUser} />
        ) : (
          <Login setActive={setActive} setUser={setUser} />
        )
      ) : (
        <div>
          <Navbar />
          <div className="min-h-[500px] pb-[1190px] sm:pb-[1150px] md:pb-[610px] lg:pb-[500px] ">
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-500 to-orange-700 rounded-lg shadow-md mx-4 md:mx-12">
              <h2 className="text-white text-lg font-semibold tracking-wide">
                Welcome {user?.name || user}
              </h2>
              <button
                className="px-5 py-2 bg-white text-orange-700 font-medium rounded-full shadow-lg hover:bg-orange-100 hover:scale-105 transform transition duration-200"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
            <div className="flex items-center justify-center pt-4">
              <div className="bg-white shadow-xl rounded-2xl px-6 py-4 font-semibold text-md space-y-3">
                <h1 className="flex items-center gap-2">
                  <span className="text-gray-600">Name:</span>
                  <span className="border border-gray-300 px-3 py-1 rounded-full bg-gray-50">
                    {user.name}
                  </span>
                </h1>

                <h1 className="flex items-center gap-2">
                  <span className="text-gray-600">E-mail:</span>
                  <span className="border border-gray-300 px-3 py-1 rounded-full bg-gray-50">
                    {user.email}
                  </span>
                </h1>
                <SelectAddress />
                <button>
                  <Link
                    to="/addaddress"
                    className="inline-flex items-center mt-8 gap-2 px-5 py-2.5 
             bg-orange-500 text-white font-semibold rounded-lg
             shadow-md hover:bg-orange-600 hover:shadow-lg"
                  >
                    + Add New Address
                  </Link>
                </button>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
}

export default Auth;
