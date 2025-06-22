import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/LandingPages/navbar";

export default function Akses() {
  const [pinjaman, setPinjaman] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:3000/api/pinjaman", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPinjaman(Array.isArray(res.data.data) ? res.data.data : []);
      console.log("DATA PINJAMAN:", res.data.data);
    } catch (err) {
      console.error("Gagal mengambil data pinjaman:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAksi = async (id, aksi) => {
    try {
      const token = localStorage.getItem("token");
      const url = `http://localhost:3000/api/pinjaman/${id}/${aksi}`;
      await axios.put(
        url,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(`Berhasil ${aksi} pinjaman.`);
      fetchData(); // Refresh data
    } catch (err) {
      alert(
        `Gagal ${aksi} pinjaman: ${err.response?.data?.message || err.message}`
      );
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <Navbar />
      <section className="bg-white dark:bg-gray-900 min-h-screen p-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
          Daftar Permintaan Peminjaman
        </h1>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 bg-white dark:bg-gray-800 shadow-md rounded">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-2">Nama User</th>
                <th className="px-4 py-2">Nama Alat</th>
                <th className="px-4 py-2">Tanggal Pinjam</th>
                <th className="px-4 py-2">Tanggal Kembali</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {pinjaman
                .filter((item) => item.status === "pending")
                .map((item) => (
                  <tr key={item.id} className="border-b dark:border-gray-700">
                    <td className="px-4 py-2">
                      {item.nama_user || item.user_id}
                    </td>
                    <td className="px-4 py-2">
                      {item.nama_alat || item.alat_id}
                    </td>
                    <td className="px-4 py-2">
                      {new Date(item.tanggal_pinjam).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2">
                      {item.tanggal_kembali
                        ? new Date(item.tanggal_kembali).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="px-4 py-2 font-semibold">{item.status}</td>
                    <td className="px-4 py-2 space-x-2">
                      <button
                        onClick={() => handleAksi(item.id, "setujui")}
                        className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded"
                      >
                        Setujui
                      </button>
                      <button
                        onClick={() => handleAksi(item.id, "tolak")}
                        className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded"
                      >
                        Tolak
                      </button>
                    </td>
                  </tr>
                ))}
              {pinjaman.filter((item) => item.status === "menunggu").length ===
                0 && (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
                    Tidak ada permintaan yang menunggu
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
