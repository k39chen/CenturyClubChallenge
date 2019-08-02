function Participant(game, name) {
  this._game = game;
  this._name = name;
  this._containerEl = document.getElementById('participantsContainer');
  this._el = null;
  this._nameEl = null;
  this._counterEl = null;
  this._buttonEl = null;
  this._counter = 0;
  this._hasSurrendered = false;

  this.increment = () => {
    this._counter++;
    this._updateCounter();
  };

  this.decrement = () => {
    this._counter = Math.max(0, this._counter--);
    this._updateCounter();
  }

  this.surrender = () => {
    this._hasSurrendered = true;
    this._buttonEl.innerText = 'Failed!';
    this._buttonEl.disabled = true;

    this._game.handleSurrender();

    this.decrement();
  }

  this.hasSurrendered = () => {
    return this._hasSurrendered;
  };

  this._createElement = () => {
    const participantEl = document.createElement('div');
    participantEl.classList = 'participant';

    this._nameEl = document.createElement('span');
    this._nameEl.classList = 'participant-name';
    this._nameEl.innerText = this._name;

    this._counterEl = document.createElement('div');
    this._counterEl.classList = 'participant-counter';
    this._counterEl.innerText = '0';

    this._buttonEl = document.createElement('button');
    this._buttonEl.classList = 'participant-surrender-button primary';
    this._buttonEl.innerText = 'Surrender';

    this._buttonEl.addEventListener('click', () => {
      if (this._buttonEl.disabled === true) return;
      this.surrender();
    });

    participantEl.appendChild(this._nameEl);
    participantEl.appendChild(this._counterEl);
    participantEl.appendChild(this._buttonEl);

    this._containerEl.appendChild(participantEl);

    this._el = participantEl;
  };

  this._updateCounter = () => {
    this._counterEl.innerText = this._counter;
  };

  this._createElement();
}
