const db = require('../config/database');

const Laporan = {
    async getLastMonthLoans() {
        const rows = await db.query(`
          SELECT 
            p.*, 
            u.nama AS nama, 
            a.nama AS nama_alat 
          FROM pinjaman p
          JOIN users u ON p.user_id = u.id
          JOIN alat a ON p.alat_id = a.id
          WHERE p.tanggal_pinjam >= DATE_SUB(CURDATE(), INTERVAL 1 MONTH)
          ORDER BY p.tanggal_pinjam DESC
        `);
        return rows;
      }
}

module.exports = Laporan;