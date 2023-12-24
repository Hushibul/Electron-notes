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

document.getElementById('save-note').addEventListener('click', createNote);

// document.getElementById('save-note').addEventListener('click', (): void => {
//   const note = document.getElementById('note') as HTMLInputElement;
//   const storedValue = localStorage.getItem('notes');

//   let notes = [];
//   if (storedValue === null) {
//     notes = [];
//   } else {
//     notes = JSON.parse(storedValue);
//   }

//   notes.push(note.value);
//   localStorage.setItem('notes', JSON.stringify(notes));
//   showNotes();

//   createNotification('New Note Added', 'Note Added Successfully');

// const notes = window.localStorage.getItem("notes");
// let notesObj;

//   const obj = { title: "", notes: "" };

//   if (notesInput.value === "") {

//   } else {
//     obj.notes = notesInput.value;

//     if (notes === null) {
//       notesObj = [];
//     } else {
//       notesObj = JSON.parse(notes);
//     }

//     notesObj.push(obj);
//     window.localStorage.setItem("notes", JSON.stringify(notesObj));
//     // window.localStorage.setItem("notes", JSON.stringify(notes));

//     showNotes();

//     notesInput.value = "";
// })

function createNote() {
  const notes = window.localStorage.getItem('notes');
  let notesObj;

  let obj = '';

  if (notesInput.value === '') {
    createNotification('Not Allowed', 'Some text are required to save note!!!');
  } else {
    obj = notesInput.value;

    if (notes === null) {
      notesObj = [];
    } else {
      notesObj = JSON.parse(notes);
    }

    notesObj.push(obj);
    window.localStorage.setItem('notes', JSON.stringify(notesObj));

    showNotes();

    notesInput.value = '';

    createNotification('Success', 'Note Added Successfully.');
  }
}

function showNotes(): void {
  const notes = localStorage.getItem('notes');
  let notesObj;
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
    console.log(notesObj);
  }

  let html = '';
  notesObj.forEach(function (element: string, id: number): void {
    html += `
              <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                      <div class="card-body">
                          <h5 class="card-title">Note ${id + 1}</h5>
                          <p class="card-text"> ${element}</p>
                          <button id="${id}" onclick="deleteNote(${id})" class="btn btn-primary">Delete Note</button>
                      </div>
                  </div>`;
  });

  const notesElem = document.getElementById('notes');

  if (notesObj.length != 0) {
    notesElem.innerHTML = html;
  } else {
    notesElem.innerHTML = `Nothing to show use Add Notes to add Notes`;
  }
}

function deleteNote(id: number): void {
  console.log('I am deleting', id);

  const notes = localStorage.getItem('notes');
  let notesObj;
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  notesObj.splice(id, 1);
  localStorage.setItem('notes', JSON.stringify(notesObj));
  showNotes();
}

function createNotification(title: string, body: string): void {
  new window.Notification(title, {
    body: body,
  });
}
