const fs = require('fs');

const data = fs.readFileSync('data.json');
const animeData = JSON.parse(data);

let readmeContent = `<h1 align="center">Daftar Anime Terbaru</h1>`;

// Fungsi untuk menulis hasil ke file README.md
animeData.result.forEach((anime) => {
   readmeContent += `<table align="center">`;
   readmeContent += `<tr>`;
   readmeContent += `<th><h3 align="center">${anime.title}</h3></th>`;
   readmeContent += `</tr>`;
   readmeContent += `<tr>`;
   readmeContent += `<td>`;
   readmeContent += `<p align="center">`;
   readmeContent += `<img src="${anime.thumb}", height="256">`;
   readmeContent += `</p>`;
   readmeContent += `</td>`;
   readmeContent += `</tr>`;
   readmeContent += `<td>`;
   readmeContent += `<table align="center">`;
   readmeContent += `<tr>`;
   readmeContent += `<td>Episode :</td>`;
   readmeContent += `<td align="center">${anime.eps}</td>`;
   readmeContent += `</tr>`;
   readmeContent += `<tr>`;
   readmeContent += `<td>Tanggal :</td>`;
   readmeContent += `<td align="center">${anime.date}</td>`;
   readmeContent += `</tr>`;
   readmeContent += `<tr>`;
   readmeContent += `<td>Hari :</td>`;
   readmeContent += `<td align="center">${anime.day}</td>`;
   readmeContent += `</tr>`;
   readmeContent += `<tr>`;
   readmeContent += `<td>Link :</td>`;
   readmeContent += `<td align="center"><a href="${anime.link}">Anime Information</a></td>`;
   readmeContent += `</tr>`;
   readmeContent += `</table>`;
   readmeContent += `</td>`;
   readmeContent += `</tr>`;
   readmeContent += `</table>`;
  });

fs.writeFileSync('README.md', readmeContent);
