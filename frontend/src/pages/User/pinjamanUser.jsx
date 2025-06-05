import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/LandingPages/navbar";

export default function PinjamanUser() {
  const [jenisAlat, setJenisAlat] = useState([]);
  const [namaAlat, setNamaAlat] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    jenis: "",
    nama_alat: "",
    jumlah: "",
  });

  // Fetch jenis alat when component mounts
  useEffect(() => {
    const fetchJenisAlat = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/api/alat", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Convert single object to array if needed
        const alatData = Array.isArray(response.data.data)
          ? response.data.data
          : [response.data.data];

        // Get unique jenis from alat data
        const uniqueJenis = [...new Set(alatData.map((alat) => alat.jenis))];
        const jenisOptions = uniqueJenis.map((jenis) => ({
          id: jenis,
          nama: jenis,
        }));

        setJenisAlat(jenisOptions);
        // Store the full alat data for filtering later
        setNamaAlat(alatData);
      } catch (err) {
        console.error("Error detail:", err.response?.data || err);
      }
    };

    fetchJenisAlat();
  }, []);

  // Fetch nama alat when jenis changes
  const handleJenisChange = (e) => {
    const selectedJenis = e.target.value;
    setFormData({ ...formData, jenis: selectedJenis, nama_alat: "" });

    if (selectedJenis) {
      // Filter from existing namaAlat state instead of making new API call
      const filteredAlat = namaAlat.filter(
        (alat) => alat.jenis === selectedJenis
      );
      setNamaAlat(filteredAlat);
    } else {
      setNamaAlat([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:3000/api/pinjam", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Peminjaman berhasil diajukan!");
      setFormData({ jenis: "", nama_alat: "", jumlah: "" });
    } catch (err) {
      alert(err.response?.data?.message || "Gagal mengajukan peminjaman");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <section className="bg-white dark:bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-6">
            <h2 className="text-2xl font-bold mb-6">Form Peminjaman Alat</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Jenis Alat
                </label>
                <select
                  value={formData.jenis}
                  onChange={handleJenisChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                >
                  <option value="">Pilih Jenis Alat</option>
                  {jenisAlat.map((jenis) => (
                    <option key={jenis.id} value={jenis.nama}>
                      {jenis.nama}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nama Alat
                </label>
                <select
                  value={formData.nama_alat}
                  onChange={(e) =>
                    setFormData({ ...formData, nama_alat: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                  disabled={!formData.jenis}
                >
                  <option value="">Pilih Nama Alat</option>
                  {namaAlat.map((alat) => (
                    <option key={alat.id} value={alat.id}>
                      {alat.nama}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Jumlah
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.jumlah}
                  onChange={(e) =>
                    setFormData({ ...formData, jumlah: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {loading ? "Memproses..." : "Ajukan Peminjaman"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
