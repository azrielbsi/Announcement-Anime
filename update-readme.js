const fs = require('fs');
const Parser = require('rss-parser');

const parser = new Parser();

async function getLatestAnimeData() {
  try {
    const feed = await parser.parseURL('https://feeds.feedburner.com/crunchyroll/rss/anime');
    return feed.items.map(item => ({
      title: item.title,
      thumb: item.enclosure.url,
      eps: item['crunchyroll:episodeNumber'],
      date: new Date(item.isoDate).toLocaleDateString(),
      day: item['crunchyroll:dayOfWeek'],
      link: item.link,
      description: item.contentSnippet
    }));
  } catch (error) {
    console.error('Error fetching feed:', error);
    return [];
  }
}

async function updateReadmeWithAnimeData() {
  try {
    const animeData = await getLatestAnimeData();
    const currentDate = new Date().toLocaleDateString('en-US', {
      timeZone: 'UTC'
    });

    let readmeContent = `<h1 align="center">Daftar Anime Terbaru</h1>\n\n`;
    readmeContent += `<p align="center"><em>Updated on: ${currentDate}</em></p>\n\n`;

    animeData.forEach(anime => {
      readmeContent += `<table align="center">\n`;
      readmeContent += `<tr>\n`;
      readmeContent += `<th><h3 align="center">${anime.title}</h3></th>\n`;
      readmeContent += `</tr>\n`;
      readmeContent += `<tr>\n`;
      readmeContent += `<td>\n`;
      readmeContent += `<p align="center">\n`;
      readmeContent += `<img src="${anime.thumb}" height="256">\n`;
      readmeContent += `</p>\n`;
      readmeContent += `</td>\n`;
      readmeContent += `</tr>\n`;
      readmeContent += `<tr>\n`;
      readmeContent += `<td>\n`;
      readmeContent += `<table align="center">\n`;
      readmeContent += `</tr>\n`;
      readmeContent += `<tr>\n`;
      readmeContent += `<td colspan="2">\n`;
      readmeContent += `<p>${anime.description}</p>\n`;
      readmeContent += `</td>\n`;
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
      readmeContent += `</table>\n\n`;
    });

     fs.writeFileSync('README.md', readmeContent);
    console.log('README.md updated successfully with latest anime data and date!');
  } catch (error) {
    console.error('Error updating README.md:', error);
  }
}

updateReadmeWithAnimeData().catch(error => console.error('Error:', error));
