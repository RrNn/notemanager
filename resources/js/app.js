const Manager = (function NotesManager() {
  var notes = [];
  var data = {
    numberOfNotes: 0,
    summary: '',
    detail: '',
  };
  // get the inputs from the DOM
  var inputs = [...document.getElementsByClassName('input')];

  // add an input event listener to the DOM elements
  inputs.forEach(function(input, index) {
    input.addEventListener('input', function() {
      data[input.name] = input.value;
      console.log(data);
    });
  });

  // the Note object, ie, blueprint so to speak.
  function Note(id, summary, detail) {
    this.id = id;
    this.summary = summary;
    this.detail = detail;
  }

  // Create the events for adding and removing a note.
  const noteAdded = new CustomEvent('note-added');
  const noteRemoved = new CustomEvent('note-removed');

  function addNote() {
    let id = data.numberOfNotes + 1;
    for (let key in data) {
      if (data[key].length < 3) {
        dispatchEvent(new CustomEvent('input-error', { detail: key }));
        return;
      }
    }
    notes.push(new Note(id, data.summary, data.detail));
    data.numberOfNotes++;

    // clear the inputs and the data object summary and detail values.
    inputs.forEach(function(input, index) {
      input.value = '';
      data[input.name] = '';
    });

    console.log('NOTES:', notes, 'DATA:', data);

    dispatchEvent(noteAdded);
  }

  function removeNote(id) {
    console.log('TO_DELETE_ID = ' + id);
    let note = notes.find((note) => note.id === id);
    console.log('NOTE_TO_BE_DELETED ', note);
    note != undefined ? notes.splice(notes.indexOf(note), 1) : null;
    console.log('REMAINING_NOTES ', notes);
    dispatchEvent(noteRemoved);
  }

  const publicAPI = {
    addNote,
    removeNote,
    notes,
  };
  return publicAPI;
})();

window.Manager = Manager;
export default Manager;

