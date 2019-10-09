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

//Code below this comment is just mocked data and can be used as a black box, or altered to be used as a sandbox.

// This function returns mock CRM data and is being used as an analog for your functionality being added to the plugin.  
// This simply picks random data and organizes it.
function mockQueryCRM(email) {
  console.log(`Build mock CRM data for ${email}`);
  const infoIndex = Math.floor(Math.random() * 4);
  const info = {
    id: Math.floor(Math.random() * 1000),
    location: 'Fake Company HQ',
    status: mockStatuses[infoIndex]
  }

  let notes = [];
  notes.push(mockNotesSamples[infoIndex]);
  notes.push(mockNotesSamples[infoIndex + 4]);
  return {notes, info};
}

// Here's some fake CRM data to display in the plugin.
const mockStatuses = ['Open', 'Closed', 'Won', 'Blocked'];
const mockNotesSamples = [
  {
    date: "10/10/19",
    author: "Phillip Fry",
    blurb: "I think we're ready to make a sale."
  },
  {
    date: "10/10/19",
    author: "Professor Farnsworth",
    blurb: "Lead confused about the offering."
  },
  {
    date: "10/12/19",
    author: "Turanga Leela",
    blurb: "Missed their call."
  },
  {
    date: "10/01/19",
    author: "Bender Rodriguez",
    blurb: "Congrats on the sale!"
  },
  {
    date: "07/10/19",
    author: "Doctor Zoidberg",
    blurb: "Running late. Be there in 5!"
  },
  {
    date: "08/19/19",
    author: "Hermes Conrad",
    blurb: "I've moved the meeting."
  },
  {
    date: "9/23/19",
    author: "Amy Wong",
    blurb: "Does that all make sense?"
  },
  {
    date: "9/28/19",
    author: "Scruffy",
    blurb: "Yes! Looking forward to it."
  }
];
