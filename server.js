const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000; // 你可以根据需要更改端口

app.use(express.static('public'));

app.get('/api/playlists', (req, res) => {
  const audioPath = path.join(__dirname, 'audio');
  const playlists = [];

  fs.readdirSync(audioPath).forEach(artist => {
    const artistPath = path.join(audioPath, artist);

    if (fs.statSync(artistPath).isDirectory()) {
      const songs = fs.readdirSync(artistPath).map(song => ({
        title: song.replace(/\.[^/.]+$/, ''),
        file: path.join(artist, song),
        howl: null
      }));

      playlists.push({
        name: artist,
        songs: songs
      });
    }
  });

  res.json(playlists);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
