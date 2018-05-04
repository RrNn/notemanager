import Manager from './app.js';

export class AvailableNotes extends HTMLElement {
  constructor() {
    super();
    // First time, call the render method. The notes will be = []
    // but that fine, we call it still
    this.render(Manager.notes);

    // This method listens for the note-added and note-removed events
    // and re-renders the DOM [Notes only] correclty according to the notes array.
    this.handler = () => {
      console.log('A_DOM_EVENT_WAS_FIRED');
      const data = Manager.notes;
      this.render(data);
    };
    window.addEventListener('note-added', this.handler);
    window.addEventListener('note-removed', this.handler);
    window.addEventListener('input-error', (event) =>
      this.wrongInputAlerter(event)
    );
  }

  render(data) {
    var existingNoteDetails = document.getElementsByClassName('note-details');
    var existingNoteSummary = document.getElementsByClassName('note-summary');

    while (existingNoteDetails[0] || existingNoteSummary[0]) {
      existingNoteDetails[0].parentNode.removeChild(existingNoteDetails[0]);
      existingNoteSummary[0].parentNode.removeChild(existingNoteSummary[0]);
    }

    if (document.getElementsByClassName('note-wrapper').length < 1) {
      var noteWrapper = document.createElement('div');
      noteWrapper.className = 'note-wrapper';
    } else {
      noteWrapper = document.getElementsByClassName('note-wrapper')[0];
    }

    data.forEach((datum, index) => {
      let noteSummary = document.createElement('div');
      let noteDetails = document.createElement('div');
      noteDetails.className = 'note-details';
      noteSummary.className = 'note-summary';
      noteSummary.innerHTML = `<span>${
        datum.summary
      }</span> <button class="remove-note-btn" value=${
        datum.id
      } onclick="Manager.removeNote(${datum.id})">Remove note</button>`;
      noteDetails.innerText = datum.detail;
      noteWrapper.appendChild(noteSummary);
      noteWrapper.appendChild(noteDetails);
      this.appendChild(noteWrapper);
    });
  }

  wrongInputAlerter(e) {
    // remove the error div if its already there
    if (document.getElementsByClassName('input-error').length > 0) {
      document.getElementsByClassName('input-error')[0].remove();
    }

    const inputSection = document.getElementsByClassName('input-container');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'input-error';
    errorDiv.innerHTML = `<h2>The ${
      e.detail
    } cannot be less than 3 characters</h2>`;

    inputSection[0].appendChild(errorDiv);

    setTimeout(() => {
      errorDiv.remove();
    }, 5000);
  }
}

window.AvailableNotes = AvailableNotes;

customElements.define('available-notes', AvailableNotes);
