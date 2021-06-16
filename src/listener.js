class Listener {
  constructor(playlistSongService, mailSender) {
    this._playlistSongService = playlistSongService;
    this._mailSender = mailSender;

    this.listen = this.listen.bind(this);
  }

  async listen(message) {
    try {
      const { playlistId, targetEmail } = JSON.parse(message.content.toString());
      const songs = await this._playlistSongService.getSongInPlaylists(playlistId);
      const result = await this._mailSender.sendEmail(targetEmail, JSON.stringify(songs));

      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Listener;
