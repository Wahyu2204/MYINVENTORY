import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/LandingPages/navbar";

export default function RiwayatUser() {
  const [riwayat, setRiwayat] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRiwayat = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token tidak ditemukan. Silakan login ulang.");
        }
        const response = await axios.get("http://localhost:3000/api/riwayat", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRiwayat(response.data.data);
        setLoading(false);
      } catch (err) {
        if (err.response && err.response.status === 403) {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }
        setError(`Gagal mengambil data riwayat: ${err.message}`);
        setLoading(false);
      }
    };

    fetchRiwayat();
  }, []);

  const handleKembalikan = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:3000/api/pinjaman/${id}/kembali`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Alat berhasil dikembalikan");
      window.location.reload(); // atau panggil ulang fetch
    } catch (err) {
      alert(
        `Gagal mengembalikan alat: ${
          err.response?.data?.message || err.message
        }`
      );
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <Navbar />
      <section className="bg-white dark:bg-gray-900 min-h-screen">
        <div className="container mx-auto px-4 sm:px-8">
          <div className="py-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Nama
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Alat
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Tanggal Pinjam
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Tanggal Kembali
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800">
                  {riwayat.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {item.nama_user || item.user_id}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">
                          {item.nama_alat || item.alat_id || "Tidak diketahui"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">
                          {new Date(item.tanggal_pinjam).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">
                          {item.tanggal_kembali
                            ? new Date(
                                item.tanggal_kembali
                              ).toLocaleDateString()
                            : "-"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.status === "disetujui" &&
                        !item.tanggal_kembali ? (
                          <button
                            onClick={() => handleKembalikan(item.id)}
                            className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded"
                          >
                            Kembalikan
                          </button>
                        ) : (
                          <span className="text-gray-400 italic text-sm">
                            -
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
