const fs = require('fs');

const data = fs.readFileSync('data.json');
const animeData = JSON.parse(data);

let readmeContent = `<h1 align="center">Daftar Anime Terbaru</h1>\n\n`;

animeData.result.forEach((anime) => {
  readmeContent += `<h2 align="center">${anime.title}\n</h2>`;
  readmeContent += `<img align="center" src="${anime.thumb}">\n\n`;
  readmeContent += `<h3 align="center">Episode :</h3> ${anime.eps}\n`;
  readmeContent += `<h3 align="center">Hari :</h3> ${anime.day}\n`;
  readmeContent += `<h3 align="center">Tanggal :</h3> ${anime.date}\n`;
  readmeContent += `[Link](${anime.link})\n\n`;
});

fs.writeFileSync('README.md', readmeContent);
