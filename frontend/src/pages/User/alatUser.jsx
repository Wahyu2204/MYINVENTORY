import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/LandingPages/navbar";
import { jwtDecode } from "jwt-decode";

export default function AlatUser() {
  const [alat, setAlat] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [role, setRole] = useState(null);
  const [formData, setFormData] = useState({
    nama: "",
    jenis: "",
    stok: "",
    keterangan: "",
  });
  const [formError, setFormError] = useState(null);
  const [formSuccess, setFormSuccess] = useState(null);

  const fetchAlat = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token tidak ditemukan. Silakan login ulang.");
      }

      const response = await axios.get("http://localhost:3000/api/alat", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Backend response:", response.data);

      let alatData = Array.isArray(response.data.data)
        ? response.data.data
        : [response.data.data];

      console.log("Converted data:", alatData);

      setAlat(alatData);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching alat:", err);
      if (err.response?.status === 403) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
      setError(err.message || "Gagal mengambil data alat");
      setLoading(false);
    }
  };

  useEffect(() => {
    const getUserRole = () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const decoded = jwtDecode(token);
          setRole(decoded.role || "user");
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        setRole("user");
      }
    };

    fetchAlat();
    getUserRole();
  }, []); // Kosongkan dependency array

  // Tambahkan di bawah useEffect yang sudah ada
  useEffect(() => {
    console.log("Current alat state:", alat);
    console.log("Number of items:", alat.length);
  }, [alat]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    setFormSuccess(null);
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token tidak ditemukan. Silakan login ulang.");
      }

      if (
        !formData.nama ||
        !formData.jenis ||
        !formData.stok ||
        !formData.keterangan
      ) {
        throw new Error("Semua kolom harus diisi.");
      }
      if (isNaN(formData.stok) || Number(formData.stok) < 0) {
        throw new Error("Stok harus angka positif.");
      }

      const newAlat = {
        nama: formData.nama,
        jenis: formData.jenis,
        stok: Number(formData.stok),
        keterangan: formData.keterangan,
      };

      const response = await axios.post(
        "http://localhost:3000/api/alat",
        newAlat,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("POST response:", response.data); // Debug: Inspect POST response

      setFormSuccess("Alat berhasil ditambahkan!");
      setFormData({ nama: "", jenis: "", stok: "", keterangan: "" });

      // Fetch all items to ensure the UI reflects the database
      await fetchAlat();
    } catch (err) {
      console.error("Submit error:", err);
      if (err.response?.status === 403) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
      setFormError(err.message || "Gagal menambahkan alat");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <section className="bg-white dark:bg-gray-900 min-h-screen">
        <div className="container mx-auto px-4 sm:px-8">
          <div className="py-8">
            {role === "admin" && (
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Tambah Alat Baru
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Nama Alat
                    </label>
                    <input
                      type="text"
                      name="nama"
                      value={formData.nama}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-800 dark:text-white"
                      placeholder="Masukkan nama alat"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Jenis
                    </label>
                    <input
                      type="text"
                      name="jenis"
                      value={formData.jenis}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-800 dark:text-white"
                      placeholder="Masukkan jenis alat"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Stok
                    </label>
                    <input
                      type="number"
                      name="stok"
                      value={formData.stok}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-800 dark:text-white"
                      placeholder="Masukkan jumlah stok"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Keterangan
                    </label>
                    <textarea
                      name="keterangan"
                      value={formData.keterangan}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-800 dark:text-white"
                      placeholder="Masukkan keterangan"
                      rows="4"
                    />
                  </div>
                  {formError && (
                    <div className="text-red-600 text-sm">{formError}</div>
                  )}
                  {formSuccess && (
                    <div className="text-green-600 text-sm">{formSuccess}</div>
                  )}
                  <div>
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Tambah Alat
                    </button>
                  </div>
                </form>
              </div>
            )}

            {error && <div className="mb-4 text-red-600 text-sm">{error}</div>}
            <div className="flex flex-col">
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Nama Alat
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Jenis
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Stok
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Keterangan
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800">
                        {loading ? (
                          <tr>
                            <td colSpan="4" className="px-6 py-4">
                              <div className="flex justify-center">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
                              </div>
                            </td>
                          </tr>
                        ) : alat.length === 0 ? (
                          <tr>
                            <td
                              colSpan="4"
                              className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-300"
                            >
                              Tidak ada data alat tersedia.
                            </td>
                          </tr>
                        ) : (
                          alat.map((item, index) => (
                            <tr key={item.id || index}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900 dark:text- white">
                                  {item.nama || "-"}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                  {item.jenis || "-"}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900 dark:text-white">
                                  {item.stok || 0}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                  {item.keterangan || "-"}
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
