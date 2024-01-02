const axios = require('axios');
const cheerio = require('cheerio');

async function fetchAnimeAnnouncements() {
  try {
    const response = await axios.get('https://www.crunchyroll.com/videos/new');
    const $ = cheerio.load(response.data);

    const announcements = [];
    $('.portrait-element').each((index, element) => {
      const title = $(element).find('.series-title').text().trim();
      const episode = $(element).find('.series-data').text().trim();
      const thumbnail = $(element).find('.portrait-element').attr('src');
      const link = 'https://www.crunchyroll.com' + $(element).find('a').attr('href');

      announcements.push({
        title,
        episode,
        thumbnail,
        link
      });
    });

    return announcements;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

async function displayAnimeAnnouncements() {
  try {
    const animeData = await fetchAnimeAnnouncements();

    animeData.forEach(anime => {
      console.log('Title:', anime.title);
      console.log('Episode:', anime.episode);
      console.log('Thumbnail:', anime.thumbnail);
      console.log('Link:', anime.link);
      console.log('-----------------------');
    });

    console.log('Total Announcements:', animeData.length);
  } catch (error) {
    console.error('Error displaying data:', error);
  }
}

displayAnimeAnnouncements();

async function updateReadmeWithAnimeData() {
  try {
    const animeData = await fetchAnimeAnnouncements();
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
      readmeContent += `<img src="${anime.thumbnail}" height="256">\n`;
      readmeContent += `</p>\n`;
      readmeContent += `</td>\n`;
      readmeContent += `</tr>\n`;
      readmeContent += `<tr>\n`;
      readmeContent += `<td>\n`;
      readmeContent += `<table align="center">\n`;
      readmeContent += `<tr>\n`;
      readmeContent += `<td>Episode :</td>\n`;
      readmeContent += `<td align="center">${anime.episode}</td>\n`;
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
