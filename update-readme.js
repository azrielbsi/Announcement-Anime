const fs = require('fs');

const data = fs.readFileSync('data.json');
const animeData = JSON.parse(data);

let readmeContent = `<h1>Daftar Anime Terbaru</h1>\n\n`;

animeData.result.forEach((anime) => {
  readmeContent += `<table align="center">`;
  readmeContent += `<tr>`;
  readmeContent += `<th><h3 align="center">${anime.title}</h3></th>`;
  readmeContent += `</tr>`;
  readmeContent += `<tr>`;
  readmeContent += `<td>`;
  readmeContent += `<p>`;
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
  readmeContent += `<td>Hari :</td>`;
  readmeContent += `<td align="center">${anime.day}</td>`;
  readmeContent += `</tr>`;
  readmeContent += `<tr>`;
  readmeContent += `<td>Tanggal :</td>`;
  readmeContent += `<td align="center">${anime.date}</td>`;
  readmeContent += `</tr>`;
  readmeContent += `<tr>`;
  readmeContent += `<td>Link :</td>`;
  readmeContent += `<td align="center">[Watching the Anime](${anime.link})</td>`;
  readmeContent += `</tr>`;
  readmeContent += `</table>`;
  readmeContent += `</td>`;
  readmeContent += `</tr>`;
  readmeContent += `</table>`;
  
  readmeContent += `## ${anime.title}\n`;
  readmeContent += `![${anime.title}](${anime.thumb})\n\n`;
  readmeContent += `**Episode**: ${anime.eps}\n\n`;
  readmeContent += `**Hari**: ${anime.day}\n\n`;
  readmeContent += `**Tanggal**: ${anime.date}\n\n`;
  readmeContent += `[Link](${anime.link})\n\n`;
});

fs.writeFileSync('README.md', readmeContent);
