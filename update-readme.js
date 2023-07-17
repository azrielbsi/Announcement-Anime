
const fetch = require('node-fetch');
const fs = require('fs');

// Fungsi untuk mengambil berita dari API
async function fetchNews() {
  const apiKey = 'GbEGbwK7'; // Ganti dengan kunci API yang valid
  const apiUrl = 'https://api.betabotz.org/api/news/cnn?apikey='; // Ganti dengan URL API yang sesuai

  try {
    const response = await fetch(apiUrl, {
      headers: {
        'Authorization': `Bearer ${apiKey}`
      }
    });
    
    if (response.ok) {
      const newsData = await response.json();
      return newsData;
    } else {
      throw new Error('Gagal mengambil berita dari API.');
    }
  } catch (error) {
    console.error(error);
  }
}

// Fungsi untuk menulis hasil ke file README.md
function writeResultToReadme(news) {
  const readmeContent = `# Berita Terbaru\n\n${news}\n`;
  const readmeContent += `<table align="center">`;
  const readmeContent += `<tr>`;
  const readmeContent += `<th><h3 align="center">${anime.berita}</h3></th>`;
  const readmeContent += `</tr>`;
  const readmeContent += `<tr>`;
  const readmeContent += `<td>`;
  const readmeContent += `<p align="center">`;
  const readmeContent += `<img src="${anime.berita_thumb}", height="256">`;
  const readmeContent += `</p>`;
  const readmeContent += `</td>`;
  const readmeContent += `</tr>`;
  const readmeContent += `<tr>`;
  const readmeContent += `<td>Link :</td>`;
  const readmeContent += `<td align="center"><a href="${anime.berita_url}">Anime Information</a></td>`;
  const readmeContent += `</tr>`;
  const readmeContent += `</table>`;
  const readmeContent += `</td>`;
  const readmeContent += `</tr>`;
  const readmeContent += `</table>`;
  
  fs.writeFile('README.md', readmeContent, (error) => {
    if (error) {
      console.error(error);
    } else {
      console.log('Hasil berhasil ditulis ke file README.md.');
    }
  });
}

// Panggil fungsi fetchNews dan tulis hasilnya ke README.md
fetchNews()
  .then((news) => {
    writeResultToReadme(news);
  });
