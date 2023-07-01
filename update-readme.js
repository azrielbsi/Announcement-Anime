const fs = require('fs');

const data = fs.readFileSync('data.json');
const animeData = JSON.parse(data);

let readmeContent = `<img align="center" src="./img/anime-update.jpeg">`;
let readmeContent = `<h3 align="center">Daftar Anime Terbaru</h3><br>`;

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
  readmeContent += `<tr>`;
  readmeContent += `<td>`;
  readmeContent += `<table>`;
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
  readmeContent += `<td align="center"><a href="${anime.link}">Waching the Anime</a></td>`;
  readmeContent += `</tr>`;
  readmeContent += `</table>`;
  readmeContent += `</td>`;
  readmeContent += `</tr>`;
  readmeContent += `</table>`;
});

fs.writeFileSync('README.md', readmeContent);
