const { Pool } = require('pg');

class PlaylistSongService {
  constructor() {
    this._pool = new Pool();
  }

  async getSongInPlaylists(playlistId) {
    const query = {
      text: `SELECT apimusicv2.id, apimusicv2.title, apimusicv2.performer
            FROM apimusicv2
            LEFT JOIN playlistsongs ON playlistsongs.song_id = apimusicv2.id
            WHERE playlistsongs.playlist_id = $1`,
      values: [playlistId],
    };

    const result = await this._pool.query(query);
    return result.rows;
  }
}

module.exports = PlaylistSongService;
