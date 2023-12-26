import './index.css';

// const darkMode = {
//   isDarkMode: false,

//   async toggle() {
//     this.isDarkMode = !this.isDarkMode;
//     document.body.classList.toggle('dark-mode', this.isDarkMode);
//     return this.isDarkMode;
//   },

//   async system() {
//     this.isDarkMode = false;
//     document.body.classList.remove('dark-mode');
//   },
// };

// document
//   .getElementById('toggle-dark-mode')
//   .addEventListener('click', async () => {
//     const isDarkMode = await darkMode.toggle();
//     document.getElementById('theme-source').innerHTML = isDarkMode
//       ? 'Dark'
//       : 'Light';
//   });

const notesInput = document.getElementById('note') as HTMLInputElement;

document.addEventListener('DOMContentLoaded', function (): void {
  showNotes();
});

const saveNote = document.getElementById('save-note');
let isUpdateAble = false;

saveNote.addEventListener('click', createNote);

function createNote() {
  const notes = window.localStorage.getItem('notes');
  let notesText;

  let text = '';

  if (notesInput.value === '') {
    createNotification('Not Allowed', 'Some text are required to save note!!!');
  } else {
    text = notesInput.value;

    if (notes === null) {
      notesText = [];
    } else {
      notesText = JSON.parse(notes);
    }

    notesText.push(text);
    window.localStorage.setItem('notes', JSON.stringify(notesText));

    showNotes();

    notesInput.value = '';

    createNotification('Success', 'Note Added Successfully.');
  }
}

function showNotes(): void {
  const notes = localStorage.getItem('notes');
  let notesText;
  if (notes == null) {
    notesText = [];
  } else {
    notesText = JSON.parse(notes);
  }

  let html = '';
  notesText.forEach(function (element: string, id: number): void {
    html += `
    <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">Note ${id + 1}</h5>
        <p class="card-text"> ${element}</p>
        <button data-id="${id}" class="btn btn-primary delete-note">Delete Note</button>
      </div>
    </div>`;
  });

  const notesElem = document.getElementById('notes');

  if (notesText.length != 0) {
    notesElem.innerHTML = html;

    document.querySelectorAll('.delete-note').forEach((button) => {
      button.addEventListener('click', function (event) {
        const id = parseInt(
          (event.currentTarget as HTMLButtonElement).getAttribute('data-id')
        );
        deleteNote(id);
      });
    });

    document.querySelectorAll('.edit-note').forEach((button) => {
      button.addEventListener('click', function (event) {
        const id = parseInt(
          (event.currentTarget as HTMLButtonElement).getAttribute('data-id')
        );

        editNote(id);
      });
    });

    document.querySelectorAll('.edit-note').forEach((button) => {
      button.addEventListener('click', function (event) {
        const id = parseInt(
          (event.currentTarget as HTMLButtonElement).getAttribute('data-id')
        );

        updateNote(id);
      });
    });
  } else {
    notesElem.innerHTML = `Nothing to show use Add Notes to add Notes`;
    notesElem.style.fontSize = '25px';
    notesElem.style.marginTop = '10px';
  }
}

function deleteNote(id: number): void {
  const notes = localStorage.getItem('notes');
  let notesText;
  if (notes == null) {
    notesText = [];
  } else {
    notesText = JSON.parse(notes);
  }

  notesText.splice(id, 1);
  createNotification('Successful', 'Note Deleted Successfully');
  localStorage.setItem('notes', JSON.stringify(notesText));
  showNotes();
}

function editNote(id: number) {
  const notes = localStorage.getItem('notes');
  let notesText;
  isUpdateAble = true;

  if (notes === null) {
    notesText = [];
  } else {
    notesText = JSON.parse(notes);
  }

  notesInput.value = notesText[id];
}

function updateNote(id: number) {
  const notes = localStorage.getItem('notes');
  let notesObj;

  if (notes === null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let text = '';

  text = notesInput.value;

  console.log('Text', text);

  notesObj.splice(id, 1, text);

  localStorage.setItem('notes', JSON.stringify(notesObj));

  showNotes();
}

function createNotification(title: string, body: string): void {
  new window.Notification(title, {
    body: body,
  });
}
