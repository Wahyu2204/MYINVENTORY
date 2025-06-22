import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import NotifikasiDropdown from "../dashboard/NotifikasiDropdown";
// import axios from "axios";
import { jwtDecode } from "jwt-decode";

export default function Navbar() {
  const [Login, setLogin] = useState(!!localStorage.getItem("token"));
  const [role, setRole] = useState(null);
  // const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setRole(decoded.role);
      } catch {
        setRole(null);
      }
    } else {
      setRole(null);
    }
  }, []);

  console.log("Role di navbar:", role);

  // Tambahkan fungsi smooth scroll
  const handleScroll = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleStorageChange = () => {
      setLogin(!!localStorage.getItem("token"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLogin(false);
    navigate("/");
    // setShowDropdown(false);
  };

  // Navbar setelah login
  const renderNavLinks = () => {
    if (role === "user" || role === "admin") {
      return (
        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `flex items-center py-2 pr-4 pl-3 ${
                  isActive
                    ? "text-white bg-primary-700 rounded" // Hapus lg:bg-transparent dan lg:text-primary-700
                    : "text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700"
                } lg:p-0 dark:text-gray-400 lg:dark:hover:text-white`
              }
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/alatUser"
              className={({ isActive }) =>
                `flex items-center py-2 pr-4 pl-3 ${
                  isActive
                    ? "text-white bg-primary-700 rounded" // Hapus lg:bg-transparent dan lg:text-primary-700
                    : "text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700"
                } lg:p-0 dark:text-gray-400 lg:dark:hover:text-white`
              }
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
              Alat
            </NavLink>
          </li>
          {role === "user" && (
            <>
              <li>
                <NavLink
                  to="/peminjaman"
                  className={({ isActive }) =>
                    `flex items-center py-2 pr-4 pl-3 ${
                      isActive
                        ? "text-white bg-primary-700 rounded" // Hapus lg:bg-transparent dan lg:text-primary-700
                        : "text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700"
                    } lg:p-0 dark:text-gray-400 lg:dark:hover:text-white`
                  }
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                  Peminjaman
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/riwayat"
                  className={({ isActive }) =>
                    `flex items-center py-2 pr-4 pl-3 ${
                      isActive
                        ? "text-white bg-primary-700 rounded" // Hapus lg:bg-transparent dan lg:text-primary-700
                        : "text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700"
                    } lg:p-0 dark:text-gray-400 lg:dark:hover:text-white`
                  }
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Riwayat
                </NavLink>
              </li>
            </>
          )}

          {role === "admin" && (
            <>
              <li>
                <NavLink
                  to="/akses"
                  className={({ isActive }) =>
                    `flex items-center py-2 pr-4 pl-3 ${
                      isActive
                        ? "text-white bg-primary-700 rounded"
                        : "text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700"
                    } lg:p-0 dark:text-gray-400 lg:dark:hover:text-white`
                  }
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12h6m2 0a8 8 0 11-16 0 8 8 0 0116 0z"
                    />
                  </svg>
                  Akses
                </NavLink>
              </li>
            </>
          )}
        </ul>
      );
    }

    return (
      <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
        <li>
          <NavLink
            to="/"
            className="flex items-center py-2 pr-4 pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white"
            aria-current="page"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Home
          </NavLink>
        </li>
        <li>
          <a
            href="#about"
            onClick={(e) => handleScroll(e, "about")}
            className="flex items-center py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            About
          </a>
        </li>
        <li>
          <a
            href="#contact"
            onClick={(e) => handleScroll(e, "contact")}
            className="flex items-center py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            Contact
          </a>
        </li>
      </ul>
    );
  };

  return (
    <header>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800 w-full top-0 z-50">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <NavLink to="/" className="flex items-center">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="mr-3 h-8 sm:h-10 transition-transform hover:scale-110"
              alt="Flowbite Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              My Inventory
            </span>
          </NavLink>
          <div className="flex items-center lg:order-2">
            {!Login ? (
              <>
                <NavLink
                  to="/login"
                  className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-3 transition-all duration-200 hover:scale-105 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                >
                  Masuk
                </NavLink>
                <NavLink
                  to="/regis"
                  className="text-white bg-gradient-to-r from-primary-600 to-blue-500 hover:bg-gradient-to-r hover:from-primary-700 hover:to-blue-600 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 transition-all duration-200 hover:scale-105 focus:outline-none dark:focus:ring-primary-800 shadow-md"
                >
                  Daftar
                </NavLink>
              </>
            ) : (
              <div className="relative flex items-center space-x-4">
                {/* Notifikasi */}
                <NotifikasiDropdown />
                {/* Profil */}
                <button
                  onClick={handleLogout}
                  className="flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded focus:outline-none"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 11-4 0v-1m4-8V5a2 2 0 10-4 0v1"
                    ></path>
                  </svg>
                  Logout
                </button>
              </div>
            )}

            {/* ...existing mobile menu button code... */}
          </div>
          {/* ...existing navigation menu code... */}
          <div
            className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          >
            {renderNavLinks()}
          </div>
        </div>
      </nav>
    </header>
  );
}
