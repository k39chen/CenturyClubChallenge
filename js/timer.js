function Timer(game) {
  this._game = game;
  this._interval = null;
  this._elapsedMilliseconds = 0;
  this._pollRate = 1000;
  this._isPaused = false;
  this._el = document.getElementById('timer');
  this._progressEl = document.getElementById('progress');
  this._audioBeepEl = document.getElementById('audioBeep');

  this.start = () => {
    this._elapsedMilliseconds = 0;
    this._isPaused = false;
    this.updateLabel();
    this.updateProgressBar();

    this._interval = setInterval(() => {
      if (!this._isPaused) {
        this._elapsedMilliseconds += this._pollRate;
        this.updateLabel();
        this.updateProgressBar();

        if (this.getMinutes() !== 0 && this.getSeconds() === 0) {

          if (this._audioBeepEl) {
            this._audioBeepEl.play();
          }

          for (let i = 0; i < this._game._participants.length; i++) {
            let participant = this._game._participants[i];
            
            if (!participant.hasSurrendered()) {
              participant.increment();
            }
          }
        }
        if (this.getMinutes() >= 100) {
          this._game.theEnd();
        }
      }
    }, this._pollRate);
  };

  this.stop = () => {
    clearInterval(this._interval);
    this._elapsedMilliseconds = 0;
    this._isPaused = false;
    this._interval = null;
    this.updateLabel();
    this.updateProgressBar();
  };

  this.restart = () => {
    this.stop();
    this.start();
  };

  this.pause = () => {
    this._isPaused = true;
  };

  this.resume = () => {
    this._isPaused = false;
  };

  this.isPaused = () => {
    return this._isPaused;
  };

  this.getLabel = () => {
    let seconds = this._elapsedMilliseconds / 1000;
    const minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);
    if (seconds < 10) seconds = '0' + seconds;
    return `${minutes}:${seconds}`;
  };

  this.getMinutes = () => {
    let seconds = this._elapsedMilliseconds / 1000;
    const minutes = Math.floor(seconds / 60);
    return minutes;
  };

  this.getSeconds = () => {
    let seconds = this._elapsedMilliseconds / 1000;
    seconds = Math.floor(seconds % 60);
    return seconds;
  };

  this.updateLabel = () => {
    this._el.innerText = this.getLabel();
  }

  this.updateProgressBar = () => {
    const curSeconds = this.getSeconds();
    const pct = Math.ceil(curSeconds / 60 * 100);
    this._progressEl.style.width = `${pct}%`;
  };
}
