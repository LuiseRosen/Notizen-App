let notes = [];
let titles = [];

let deletedNotes = [];
let deletedTitles = [];

load();

function render() {
    let content = document.getElementById('content');
    content.innerHTML = '';

    content.innerHTML += notesTemplate();
    for (i = 0; i < notes.length; i++) {

        let notesContainer = document.getElementById('notesContainer');
        notesContainer.innerHTML += noteTemplate(i);
    }
}

function renderTrash() {
    let trashContent = document.getElementById('trashContent');

    trashContent.innerHTML = '';

    trashContent.innerHTML += trashTemplate();
    for (i = 0; i < deletedNotes.length; i++) {
        let deletedNotesContainer = document.getElementById('deletedNotesContainer');
        deletedNotesContainer.innerHTML += deletedNotesTemplate(i);
    }
}

function addNewNote() {
    let newTitle = document.getElementById('newTitle').value;
    let newNote = document.getElementById('newNote').value;

    if (newTitle === '' || newNote === '') {
        window.alert("Bitte fülle beide Eingabefelder aus");
    } else {
        notes.push(newNote);
        titles.push(newTitle);
        render();
        save();
    }
}

function deleteNote(i) {
    deletedNotes.push(notes[i]);
    deletedTitles.push(titles[i]);

    notes.splice(i, 1);
    titles.splice(i, 1);

    render();
    save();
}

function recoverNote(i) {
    notes.push(deletedNotes[i]);
    titles.push(deletedTitles[i]);

    deletedNotes.splice(i, 1);
    deletedTitles.splice(i, 1);

    renderTrash();
    save();
}

function deleteNoteForever(i) {
    deletedNotes.splice(i, 1);
    deletedTitles.splice(i, 1);
    renderTrash();
    save();
}

function save() {
    let titlesAsText = JSON.stringify(titles);// wandelt den Inhalt des Arrays 'titles' in String um und speichert ihn unter der Variablen 'titlesAsText'
    let notesAsText = JSON.stringify(notes);

    let deletedNotesAsText = JSON.stringify(deletedNotes);
    let deletedTitlesAsText = JSON.stringify(deletedTitles);

    localStorage.setItem('titles', titlesAsText);// im Local Storage wird unte dem Key 'titles' der Inhalt der Variablen titlesAsText abgespeichert
    localStorage.setItem('notes', notesAsText);

    localStorage.setItem('deletedNotes', deletedNotesAsText);
    localStorage.setItem('deletedTitles', deletedTitlesAsText);
}

function load() {
    let titlesAsText = localStorage.getItem('titles'); // holt aus dem Local Storage das Item unter dem Key 'titles' und weist es der Variablen 'titlesAsText' zu 
    let notesAsText = localStorage.getItem('notes');

    let deletedNotesAsText = localStorage.getItem('deletedNotes');
    let deletedTitlesAsText = localStorage.getItem('deletedTitles');

    if (notesAsText && titlesAsText) { // überprüft: hat 'notesAsText' UND 'titlesAsText' einen Wert?
        titles = JSON.parse(titlesAsText); // dem Array von ganz oben wird der Inhalt aus der Variablen 'titlesAsText' zugewiesen
        notes = JSON.parse(notesAsText);
    }

    if (deletedNotesAsText && deletedTitlesAsText) {
        deletedTitles = JSON.parse(deletedTitlesAsText);
        deletedNotes = JSON.parse(deletedNotesAsText);
    }
}



// Templates -------------------------------------------------------------------------------------------

function notesTemplate() {
    return `
    <h1>Notizen</h1>
    <div class="head">
            <div class="inputs">
            <input  id="newTitle" placeholder="Titel...">
            <textarea  id="newNote" placeholder="neue Notiz..."></textarea>
            </div>
            <button class="addNewNoteBtn" onclick="addNewNote()"><img class="plusIcon" src="./img/plus.svg"></button>
    </div>
    <div class="body">
        <div id="notesContainer" class="notesContainer"></div>
    </div>    
    `;
}

function noteTemplate(i) {
    let note = notes[i];
    let title = titles[i];
    return `
    <div class="note">
        <div id="noteText" class="noteText">
            <h4>${title}</h4>
            ${note} <br>
        </div>
        <div class="delete">
            <button class="notesBtn" onclick="deleteNote(${i})"><img class="notesIcon" src="./img/trash-can.svg"></button>
        </div>
    </div>`;
}

function trashTemplate() {
    return `
    <div class="head">
        <h1>Gelöschte Notizen</h1>
    </div>

    <div class="body">
        <div id="deletedNotesContainer" class="notesContainer"></div>
    </div>    
    `;
}

function deletedNotesTemplate(i) {
    let note = deletedNotes[i];
    let title = deletedTitles[i];
    return `
        <div class="note">
            <div id="deletedNoteText" class="deletedNoteText">
                <h4>${title}</h4>
                ${note} <br>
            </div>
            <div class="delete">
                <button class="notesBtn" onclick="recoverNote(${i})"><img class="notesIcon" src="./img/rotate_arrow.svg"></button>
                <button class="notesBtn" onclick="deleteNoteForever(${i})"><img class="notesIcon" src="./img/trash-can.svg"></button>
            </div>
        </div>`;
}

