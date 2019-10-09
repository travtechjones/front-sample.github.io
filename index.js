// Listen for the conversation event from Front and print its contents, then load the contact to the plugin.
Front.on('conversation', function (data) {
  console.log('Conversation', data.conversation);
  console.log('Contact', data.contact);
  console.log('Message', data.message);
  console.log('OtherMessages', data.otherMessages);
  loadContact(data.contact)
});

const noteColumns = document.getElementById("notes");

// Loads the contact once the body of the plugin is loaded.
// This will call our CRM service for mocked data and then add the contact info and notes to the page.
function loadContact(contact) {
  noteColumns.innerHTML = "";

  const crmData = mockQueryCRM(contact.handle);
  displayContact(contact, crmData);
}

// Ingests the contact and crmData and adds the data to our plugin visually.
function displayContact(contact, crmData) {
  const name = document.getElementById("name");
  const handle = document.getElementById("handle");

  // Use information from our Front `conversation` event to load contact information.
  name.innerHTML = contact.display_name;
  handle.innerHTML = contact.handle;

  const id = document.getElementById("id");
  const location = document.getElementById("location");
  const status = document.getElementById("status");

  id.innerHTML = crmData.info.id;
  location.innerHTML = crmData.info.location;
  status.innerHTML = crmData.info.status;

  // Then add each Note to the Note Columns object.
  crmData.notes.forEach(note => {
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

//Code below this comment is just mocked data and can be used as a black box, or altered to be used as a sandbox.

// This function returns mock CRM data and is being used as an analog for your functionality being added to the plugin.  
// This simply picks random data and organizes it.
function mockQueryCRM(email) {
  const infoIndex = Math.floor(Math.random() * 4);
  const info = {
    id: Math.floor(Math.random() * 1000),
    location: 'Fake Company HQ',
    status: statuses[infoIndex]
  }

  let notes = [];
  notes.push(notesSamples[infoIndex]);
  notes.push(notesSamples[infoIndex + 4]);
  return {notes, info};
}

// Here's some fake CRM data to display in the plugin.
const statuses = ['Open', 'Closed', 'Won', 'Blocked'];
const notesSamples = [
  {
    date: "10/10/19",
    author: "Phillip Fry",
    blurb: "I think we're ready to make a sale."
  },
  {
    date: "10/10/19",
    author: "Professor Fansworth",
    blurb: "Lead confused about the offering."
  },
  {
    date: "10/12/19",
    author: "Leela",
    blurb: "Missed their call."
  },
  {
    date: "10/01/19",
    author: "Bender",
    blurb: "Congrats on the sale!"
  },
  {
    date: "07/10/19",
    author: "Doctor Zoidberg",
    blurb: "Running late.  Be there in 5!"
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
