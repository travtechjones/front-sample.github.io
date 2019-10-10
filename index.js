// Listen for the `conversation` event from Front and print its contents, then load the contact to the plugin.
Front.on('conversation', function (data) {
  console.log('Event data', data);

  // Load the Contact information based off of the event data.
  loadContact(data.contact);
});

// Listen for the `no_conversation` event.  This can happen when opened to Inbox Zero.
Front.on('no_conversation', function () {
  console.log('No conversation');

  // Display `No Contact` data and clear the notes.
  displayContactInfo ("No Contact", "-");
  displayCRMInfo("-", "-", "-");
  clearNotes();
});

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

    let noteTitle = document.createElement("p");
    let noteTitleText = document.createTextNode(`${note.date} - ${note.author}`);
    noteTitle.classList.add("row", "bold", "font");
    noteTitle.appendChild(noteTitleText);

    let noteBlurb = document.createElement("p");
    let noteBlurbText = document.createTextNode(note.blurb);
    noteBlurb.classList.add("row", "font");
    noteBlurb.appendChild(noteBlurbText);
    noteBlurb.classList.add("noteBlock");


    noteBlock.appendChild(noteTitle);
    noteBlock.appendChild(noteBlurb);
    noteColumns.appendChild(noteBlock);
  });
}

// Removes the currently displayed Notes.
function clearNotes() {
  const noteColumns = document.getElementById("notes");
  noteColumns.innerHTML = "";
}
