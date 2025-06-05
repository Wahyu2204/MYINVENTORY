import { useState, useEffect } from "react";

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
      <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <a
          href="#"
          className="inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
          role="alert"
        >
          <span className="text-xs bg-primary-600 rounded-full text-white px-4 py-1.5 mr-3">
            New
          </span>
          <span className="text-sm font-medium">Mulai Kelola Stokmu</span>
          <svg
            className="ml-2 w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            ></path>
          </svg>
        </a>
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          {isLogin
            ? isLoading
              ? "Memuat..."
              : `Selamat datang, ${userName}`
            : "Sistem Manajemen Peminjaman Barang"}
        </h1>
        <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
          Pantau stok, dan optimalkan operasional peminjaman barang hanya dalam
          beberapa klik.
        </p>
      </div>
    </section>
  );
}
