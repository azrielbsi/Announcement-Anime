const fs = require('fs');

const data = fs.readFileSync('data.json');
const animeData = JSON.parse(data);

let readmeContent = `# Daftar Anime Terbaru\n\n`;

animeData.result.forEach((anime) => {
  readmeContent += `## ${anime.title}\n`;
  readmeContent += `![${anime.title}](${anime.thumb})\n\n`;
  readmeContent += `**Episode**: ${anime.eps}\n\n`;
  readmeContent += `**Hari**: ${anime.day}\n`;
  readmeContent += `**Tanggal**: ${anime.date}\n`;
  readmeContent += `[Link](${anime.link})\n\n`;
});

fs.writeFileSync('README.md', readmeContent);
