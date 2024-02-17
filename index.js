const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();

app.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://programmerhumor.io/?bimber_random_post=true');
    const html = response.data;
    const $ = cheerio.load(html);

    const posts = [];
    $('.post').each((index, element) => {
      const title = $(element).find('.entry-title').text().trim();
      const imageUrl = $(element).find('img.attachment-bimber-grid-2of3').attr('data-src');
      posts.push({ title, imageUrl });
    });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
