const Laporan = require('../models/Laporan');
const PDFDocument = require('pdfkit-table');
const fs = require('fs');
const path = require('path');

const LaporanController = {
    async getMonthlyData(req, res) {
        try {
            if (req.user.role !== 'admin') {
                return res.status(403).json({
                    status: false,
                    message: 'Hanya admin yang bisa mengakses data laporan'
                });
            }
            const data = await Laporan.getLastMonthLoans();
            return res.status(200).json({
                status: true,
                message: 'Berhasil mendapatkan data laporan',
                data: data
            });
        } catch (error) {
            res.status(500).json({
                status: false,
                message: 'Gagal mendapatkan data laporan',
                error: error.message
            });
        }
    },
    async generateMonthlyPDF(req, res) {
        try {
            if (req.user.role !== 'admin') {
                return res.status(403).json({
                    status: false,
                    message: 'Hanya admin yang bisa mencetak data laporan'
                });
            }

            const data = await Laporan.getLastMonthLoans();

            console.log('Data laporan:', data)

            if (data.length === 0) {
                return res.status(404).json({
                    status: false,
                    message: 'Tidak ada data laporan untuk bulan ini'
                });
            }
            const filename = `laporan-bulanan-${Date.now()}.pdf`;
            const dirPath = path.join(__dirname, '..', 'public', 'laporan');
            const filePath = path.join(dirPath, filename);
            fs.mkdirSync(dirPath, { recursive: true });

            const doc = new PDFDocument({ margin: 30, size: 'A4' });
            const stream = fs.createWriteStream(filePath);
            doc.pipe(stream);

            const now = new Date();
            const bulanTahunCetak = now.toLocaleString('id-ID', {
                month: 'long',
                year: 'numeric'
            });

            doc.font('Helvetica-Bold').fontSize(16).text('Laporan Pinjaman Bulanan', { align: 'center' });
            doc.moveDown(0.5);
            doc.font('Helvetica').fontSize(14).text(`Periode: ${bulanTahunCetak}`, { align: 'center' });
            doc.moveDown(3);

            const rows = data.map((item, index) => [
                index + 1,
                item.nama,
                item.nama_alat,
                new Date(item.tanggal_pinjam).toLocaleDateString('id-ID'),
                item.tanggal_kembali
                    ? new Date(item.tanggal_kembali).toLocaleDateString('id-ID')
                    : '-',
                item.status
            ]);

            const columnSizes = [30, 100, 100, 80, 80, 70]; 
            const columnSpacing = 5;
            const totalTableWidth = columnSizes.reduce((a, b) => a + b, 0) + (columnSpacing * (columnSizes.length - 1));
            const pageWidth = doc.page.width;
            const x = (pageWidth - totalTableWidth) / 2;
            
            await doc.table(
                {
                    headers: ['No', 'Nama', 'Alat', 'Tgl Pinjam', 'Tgl Kembali', 'Status'],
                    rows: rows
                },
                {
                    prepareHeader: () => doc.font('Helvetica-Bold').fontSize(12),
                    prepareRow: () => doc.font('Helvetica').fontSize(10),
                    padding: 6,
                    columnSpacing: columnSpacing,
                    columnSize: columnSizes,
                    x: x,
                }
            );

            doc.end();

            stream.on('finish', () => {
                res.status(200).json({
                    status: true,
                    message: 'Berhasil mencetak laporan bulanan',
                    file: `/laporan/${filename}`
                });
            });
        } catch (error) {
            res.status(500).json({
                status: false,
                message: 'Gagal mencetak laporan bulanan',
                error: error.message
            });
        }
    }
}

module.exports = LaporanController;