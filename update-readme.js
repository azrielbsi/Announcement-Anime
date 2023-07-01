const fs = require('fs');

const data = fs.readFileSync('data.json');
const animeData = JSON.parse(data);

let readmeContent = `# Daftar Anime Terbaru\n\n`;
readmeContent += `| Judul | Gambar | Episode | Hari | Tanggal | Link |\n`;
readmeContent += `|-------|--------|---------|------|---------|------|\n`;

animeData.result.forEach((anime) => {
  readmeContent += `| ${anime.title} | ![${anime.title}](${anime.thumb}) | ${anime.eps} | ${anime.day} | ${anime.date} | [Link](${anime.link}) |\n`;
});

fs.writeFileSync('README.md', readmeContent);
