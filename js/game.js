function Game() {
  this._timer = new Timer(this);
  this._pauseButtonEl = document.getElementById('pauseButton');
  this._theEndEl = document.getElementById('theEnd');
  this._participants = [];

  this.start = () => {
    this._timer.restart();

    this._participants = [
      new Participant(this, 'Kevin'),
      new Participant(this, 'John'),
      new Participant(this, 'Hamza'),
      new Participant(this, 'Dharssan')
    ];
  };

  this.theEnd = () => {
    this._timer.pause();
    this._theEndEl.style.display = 'block';
    document.getElementById('timer').style.display = 'none';
    document.getElementById('progressBar').style.display = 'none';
    this._pauseButtonEl.style.display = 'none';
  };

  this.handleSurrender = () => {
    let numSurrendered = 0;
    for (let i = 0; i < this._participants.length; i++) {
      let participant = this._participants[i];
      
      if (participant.hasSurrendered()) {
        numSurrendered++;
      }
    }
    if (numSurrendered === this._participants.length) {
      this.theEnd();
    }
  };

  this._pauseButtonEl.addEventListener('click', () => {
    if (this._pauseButtonEl.getAttribute('data-is-paused') === 'true') {
      this._timer.resume();
      this._pauseButtonEl.setAttribute('data-is-paused', 'false');
      this._pauseButtonEl.innerText = 'Pause';
    } else {
      this._timer.pause();
      this._pauseButtonEl.setAttribute('data-is-paused', 'true');
      this._pauseButtonEl.innerText = 'Resume';
    }
  });

}
