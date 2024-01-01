const fs = require('fs');

const data = fs.readFileSync('data.json', 'utf8'); // Tambahkan 'utf8' untuk membaca file sebagai string
const animeData = JSON.parse(data);

let readmeContent = `<h1 align="center">Daftar Anime Terbaru</h1>\n\n`; // Tambahkan baris kosong setelah judul

// Fungsi untuk menulis hasil ke file README.md
animeData.result.forEach((anime) => {
  readmeContent += `<table align="center">\n`;
  readmeContent += `<tr>\n`;
  readmeContent += `<th><h3 align="center">${anime.title}</h3></th>\n`;
  readmeContent += `</tr>\n`;
  readmeContent += `<tr>\n`;
  readmeContent += `<td>\n`;
  readmeContent += `<p align="center">\n`;
  readmeContent += `<img src="${anime.thumb}" height="256">\n`; // Hapus tanda koma yang tidak perlu
  readmeContent += `</p>\n`;
  readmeContent += `</td>\n`;
  readmeContent += `</tr>\n`;
  readmeContent += `<tr>\n`;
  readmeContent += `<td>\n`;
  readmeContent += `<table align="center">\n`;
  readmeContent += `<tr>\n`;
  readmeContent += `<td>Episode :</td>\n`;
  readmeContent += `<td align="center">${anime.eps}</td>\n`;
  readmeContent += `</tr>\n`;
  readmeContent += `<tr>\n`;
  readmeContent += `<td>Tanggal :</td>\n`;
  readmeContent += `<td align="center">${anime.date}</td>\n`;
  readmeContent += `</tr>\n`;
  readmeContent += `<tr>\n`;
  readmeContent += `<td>Hari :</td>\n`;
  readmeContent += `<td align="center">${anime.day}</td>\n`;
  readmeContent += `</tr>\n`;
  readmeContent += `<tr>\n`;
  readmeContent += `<td>Link :</td>\n`;
  readmeContent += `<td align="center"><a href="${anime.link}">Anime Information</a></td>\n`;
  readmeContent += `</tr>\n`;
  readmeContent += `</table>\n`;
  readmeContent += `</td>\n`;
  readmeContent += `</tr>\n`;
  readmeContent += `</table>\n\n`; // Tambahkan baris kosong setelah setiap entri anime
});

fs.writeFileSync('README.md', readmeContent);
