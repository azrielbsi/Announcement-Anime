const fs = require('fs');

const data = fs.readFileSync('data.json');
const animeData = JSON.parse(data);

let readmeContent = `<h1 align="center">Daftar Anime Terbaru</h1>\n\n`;

animeData.result.forEach((anime) => {
  readmeContent += `<table align="center">`;
  readmeContent += `<tr>`;
  readmeContent += `<th><h3 align="center">${anime.judul}</h3></th>`;
  readmeContent += `</tr>`;
  readmeContent += `<tr>`;
  readmeContent += `<td>`;
  readmeContent += `<p align="center">`;
  readmeContent += `<img src="${anime.thumbnail}", height="256">`;
  readmeContent += `</p>`;
  readmeContent += `</td>`;
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
