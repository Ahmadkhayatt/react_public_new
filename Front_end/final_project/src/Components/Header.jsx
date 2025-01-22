import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Tracks menu state
  const menuRef = useRef(null); // Ref for the menu
  const toggleRef = useRef(null); // Ref for the toggle button

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev); // Toggle menu open/close state
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close the menu if clicking outside menu or toggle button
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        toggleRef.current &&
        !toggleRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="text-2xl font-extrabold tracking-wide">
          Attendance System
        </div>
        {/* Toggle button */}
        <button
          ref={toggleRef}
          onClick={toggleMenu}
          className="text-white text-2xl sm:hidden focus:outline-none"
        >
          ☰
        </button>
        {/* Navigation menu */}
        <nav
          ref={menuRef}
          className={`transform transition-transform duration-300 ease-in-out ${
            isMenuOpen
              ? "translate-y-0 opacity-100 scale-100"
              : "-translate-y-10 opacity-0 scale-95 pointer-events-none"
          } sm:translate-y-0 sm:opacity-100 sm:scale-100 sm:pointer-events-auto sm:flex sm:space-x-6 w-full sm:w-auto bg-blue-600 sm:bg-transparent absolute sm:static top-full left-0 sm:top-auto sm:left-auto sm:flex-row sm:items-center sm:justify-center px-6 py-4 sm:p-0`}
        >
          <ul className="flex flex-col sm:flex-row sm:space-x-6 space-y-4 sm:space-y-0">
            <li>
              <Link
                to="/"
                className="hover:text-gray-200 transition duration-300 ease-in-out text-lg font-medium"
                onClick={() => setIsMenuOpen(false)} // Close menu on navigation
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/Recognition"
                className="hover:text-gray-200 transition duration-300 ease-in-out text-lg font-medium"
                onClick={() => setIsMenuOpen(false)} // Close menu on navigation
              >
                Begin Recognition
              </Link>
            </li>
            <li>
              <Link
                to="/add-user"
                className="hover:text-gray-200 transition duration-300 ease-in-out text-lg font-medium"
                onClick={() => setIsMenuOpen(false)} // Close menu on navigation
              >
                Add User
              </Link>
            </li>
            <li>
              <Link
                to="/delete-user"
                className="hover:text-gray-200 transition duration-300 ease-in-out text-lg font-medium"
                onClick={() => setIsMenuOpen(false)} // Close menu on navigation
              >
                Delete User
              </Link>
            </li>
            <li>
              <Link
                to="/reports"
                className="hover:text-gray-200 transition duration-300 ease-in-out text-lg font-medium"
                onClick={() => setIsMenuOpen(false)} // Close menu on navigation
              >
                Reports
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
