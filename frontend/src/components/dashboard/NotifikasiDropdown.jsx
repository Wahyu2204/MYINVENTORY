import { useEffect, useState, useRef } from "react";
import axios from "axios";

export default function NotifikasiDropdown() {
  const [notifikasi, setNotifikasi] = useState([]);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const fetchNotifikasi = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:3000/api/notifikasi", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setNotifikasi(res.data.data || []);
      } catch (err) {
        console.error("Gagal fetch notifikasi", err);
      }
    };

    fetchNotifikasi();
  }, []);

  // Tutup dropdown jika klik di luar area
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setTimeout(() => {
          setOpen(false);
        }, 100); // Delay 100ms agar hover pindah ke dropdown
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const unreadCount = notifikasi.filter((n) => !n.status_dibaca).length;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 text-gray-600 hover:text-gray-500 dark:text-white"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11
               a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341
               C8.67 6.165 8 7.388 8 8.75v5.408c0 .538-.214
               1.055-.595 1.437L6 17h5m0 0v1a3 3 0 006 0v-1m-6 0h6"
          />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 w-3 h-3 bg-red-600 rounded-full border-2 border-white"></span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
          <div className="p-2 max-h-64 overflow-y-auto">
            {notifikasi.length === 0 ? (
              <p className="text-sm text-gray-500 dark:text-gray-300">
                Tidak ada notifikasi
              </p>
            ) : (
              notifikasi.map((n, i) => (
                <div
                  key={i}
                  className={`px-3 py-2 rounded-md text-sm ${
                    n.status_dibaca
                      ? "text-gray-500"
                      : "text-black font-semibold dark:text-white"
                  } hover:bg-gray-100 dark:hover:bg-gray-700`}
                >
                  {n.pesan}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
