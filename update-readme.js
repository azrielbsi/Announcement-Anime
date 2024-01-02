const fs = require('fs');
const Parser = require('rss-parser');

const parser = new Parser();

// Fungsi untuk membagi deskripsi setiap 10 kata
function splitDescription(description) {
  const words = description.split(' ');
  const chunkSize = 10;
  const chunks = [];

  for (let i = 0; i < words.length; i += chunkSize) {
    chunks.push(words.slice(i, i + chunkSize).join(' '));
  }

  return chunks.join('<br>');
}

const { Translate } = require('@google-cloud/translate').v2;

const translate = new Translate();

async function translateToIndonesian(text) {
  try {
    const [translation] = await translate.translate(text, 'id');
    return translation;
  } catch (error) {
    console.error('Error translating text:', error);
    return text; 
  }
}

async function getLatestAnimeData() {
  try {
    const feed = await parser.parseURL('https://feeds.feedburner.com/crunchyroll/rss/anime');
    const descriptionIndonesian = await translateToIndonesian(item.contentSnippet);
    return feed.items.map(item => ({
      title: item.title,
      thumb: item.enclosure.url,
      date: new Date(item.isoDate).toLocaleDateString(),
      time: new Date(item.isoDate).toLocaleTimeString('en-US', { timeZone: 'UTC', timeStyle: 'medium' }),
      link: item.link,
      description: splitDescription(descriptionIndonesian),
      category: item.category || 'Unknown',
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
    const currentTime = new Date().toLocaleTimeString('en-US', {
      timeZone: 'UTC',
      timeStyle: 'medium'
    });
    const currentDateTime = new Date().toLocaleString('en-US', {
      timeZone: 'UTC',
      dateStyle: 'medium',
      timeStyle: 'medium'
    });

    let readmeContent = `<h1 align="center">Daftar Anime Terbaru</h1>\n\n`;
    readmeContent += `<p align="center"><em>Updated on: ${currentDate} at ${currentDateTime}</em></p>\n\n`;

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
      readmeContent += `<tr>\n`;
      readmeContent += `<td>Category :</td>\n`;
      readmeContent += `<td align="center">${anime.category}</td>\n`;
      readmeContent += `</tr>\n`;
      readmeContent += `<tr>\n`;
      readmeContent += `<td>Tanggal :</td>\n`;
      readmeContent += `<td align="center">${anime.date}</td>\n`;
      readmeContent += `</tr>\n`;
      readmeContent += `<tr>\n`;
      readmeContent += `<td>Duration :</td>\n`;
      readmeContent += `<td align="center">${anime.duration}</td>\n`;
      readmeContent += `</tr>\n`;
      readmeContent += `<tr>\n`;
      readmeContent += `<td>Link :</td>\n`;
      readmeContent += `<td align="center"><a href="${anime.link}">Anime Information</a></td>\n`;
      readmeContent += `</tr>\n`;
      readmeContent += `<tr>\n`;
      readmeContent += `<td colspan="2">\n`;
      readmeContent += `<p>${anime.description}</p>\n`; // Menambahkan deskripsi anime di bagian bawah tabel
      readmeContent += `</td>\n`;
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
