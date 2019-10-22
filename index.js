// Listen for the `conversation` event from Front and print its contents, then load the contact to the plugin.
Front.on('conversation', function (data) {
  console.log('Event data', data);
  showInfo();
  // Load the Contact information based off of the event data.
  loadContact(data.contact);
});

// Listen for the `no_conversation` event.  This can happen when opened to Inbox Zero.
Front.on('no_conversation', function () {
  console.log('No conversation');

  showInfo();
  // Display `No Contact` data and clear the notes.
  displayContactInfo ("No Contact", "-");
  displayCRMInfo("-", "-", "-");
  clearNotes();
});

// function onLoad() {
//   const contact = {
//     display_name: "ayy lmao",
//     handle: "8675309"
//   };

//   showInfo();
//   loadContact(contact);
// }

function showInfo() {
  const infoButton = document.getElementById("infoButton");
  const notesButton = document.getElementById("notesButton");
  infoButton.classList.add('selected');
  notesButton.classList.remove('selected');

  const infoSection = document.getElementById("infoSection");
  infoSection.classList.remove("displayNone");
  const notesSection = document.getElementById("notesSection");
  notesSection.classList.add("displayNone");
}

function showNotes() {
  const infoButton = document.getElementById("infoButton");
  const notesButton = document.getElementById("notesButton");
  infoButton.classList.remove('selected');
  notesButton.classList.add('selected');

  const infoSection = document.getElementById("infoSection");
  infoSection.classList.add("displayNone");
  const notesSection = document.getElementById("notesSection");
  notesSection.classList.remove("displayNone");
}

// Loads the contact once the body of the plugin is loaded.
// This will call our mocked CRM service for data and then add the contact information and notes to the page.
function loadContact(contact) {
  // Display Front contact info.
  displayContactInfo(contact.display_name, contact.handle);

  // Build and display our CRM data.
  const crmData = mockQueryCRM(contact.handle);
  displayCRMInfo(crmData.info.id, crmData.info.location, crmData.info.status);

  // Clear the notes to make space for the new notes from our mocked CRM data.
  clearNotes();
  displayNotes(crmData.notes);
}

// Displays Front contact information.
function displayContactInfo (display_name, handle) {
  const nameElement = document.getElementById("name");
  const handleElement = document.getElementById("handle");

  nameElement.innerHTML = display_name || handle;
  handleElement.innerHTML = handle;
}

// Displays mocked CRM Info.
function displayCRMInfo (id, location, status) {
  const idElement = document.getElementById("id");
  const locationElement = document.getElementById("location");
  const statusElement = document.getElementById("status");

  idElement.innerHTML = id;
  locationElement.innerHTML = location;
  statusElement.innerHTML = status;
}

// Displays the mocked CRM notes.
function displayNotes(notes) {
  // Find the Notes Column object.
  const noteColumns = document.getElementById("notes");

  // Add each Note to the Notes Column object.
  notes.forEach(note => {
    let noteBlock = document.createElement("div");
    noteBlock.classList.add("noteBlock");

    let noteHeader = document.createElement("p");
    noteHeader.classList.add("row");

    let noteHeaderAuthor = document.createElement("div");
    noteHeaderAuthor.innerHTML = note.author;
    noteHeaderAuthor.classList.add("font", "noteKey");

    let noteHeaderTime = document.createElement("div");
    noteHeaderTime.innerHTML = note.time;
    noteHeaderTime.classList.add("font", "noteValue");

    noteHeader.appendChild(noteHeaderAuthor);
    noteHeader.appendChild(noteHeaderTime);

    let noteBlurb = document.createElement("p");
    let noteBlurbText = document.createTextNode(note.blurb);
    noteBlurb.classList.add("row", "font");
    noteBlurb.appendChild(noteBlurbText);


    noteBlock.appendChild(noteHeader);
    noteBlock.appendChild(noteBlurb);
    noteColumns.appendChild(noteBlock);
  });
}

// Removes the currently displayed Notes.
function clearNotes() {
  const noteColumns = document.getElementById("notes");
  noteColumns.innerHTML = "";
}
