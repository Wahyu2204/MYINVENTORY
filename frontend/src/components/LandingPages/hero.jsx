import { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function Hero() {
  const [isLogin, setIsLogin] = useState(false);
  const [userName, setUserName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        setIsLogin(true);
        setIsLoading(true);

        try {
          const response = await fetch("http://localhost:3000/api/profile", {
            // Ganti dengan URL API Anda
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          console.log("Status API:", response.status);
          if (response.ok) {
            const user = await response.json();
            console.log("Data dari API:", user);
            setUserName(user.data.nama || "Tamu"); // Ubah ke user.data.nama
          } else {
            setError(
              `Gagal mengambil data pengguna, status: ${response.status}`
            );
            setUserName("Tamu");
            if (response.status === 401) {
              localStorage.removeItem("token");
              setIsLogin(false);
              window.location.href = "/login";
            }
          }
        } catch (error) {
          console.error("Error saat fetch:", error);
          setError("Terjadi kesalahan jaringan");
          setUserName("Tamu");
        } finally {
          setIsLoading(false);
        }
      } else {
        console.log("Token tidak ditemukan");
      }
    };

    fetchUserData();
  }, []);

  return (
    <section className="bg-white dark:bg-gray-900 min-h-screen flex items-center justify-center">
      {/* Background decoration
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-40 w-72 h-72 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div> */}

      <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12 relative z-10">
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4"
          >
            <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-md">
              <p className="text-red-700">{error}</p>
            </div>
          </motion.div>
        )}
        <motion.a
          href="#"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex justify-between items-center py-2 px-4 mb-7 text-sm text-gray-700 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 dark:bg-gray-800 dark:text-white border border-gray-200 dark:border-gray-700"
          role="alert"
        >
          <span className="text-xs bg-gradient-to-r from-primary-600 to-blue-500 rounded-full text-white px-4 py-1.5 mr-3">
            New
          </span>
          <span className="text-sm font-medium">Mulai Kelola Stokmu</span>
          <svg
            className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            ></path>
          </svg>
        </motion.a>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 text-4xl font-extrabold tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-blue-500 md:text-5xl lg:text-6xl"
        >
          {isLogin
            ? isLoading
              ? "Memuat..."
              : `Selamat datang, ${userName}`
            : "Sistem Manajemen Peminjaman Barang"}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8 text-lg font-normal text-gray-600 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-300"
        >
          Pantau stok, dan optimalkan operasional peminjaman barang hanya dalam
          beberapa klik.
        </motion.p>
      </div>
    </section>
  );
}
