// Loads the contact once the body of the plugin is loaded.
// This will call our CRM service for mocked data and then add the contact info and notes to the page.
function loadContact(contact) {
  if (!contact)
    return;

  const crmData = mockQueryCRM(contact.handle);
  displayContact(contact, crmData);
}

// Ingests our crmData and adds the data to our plugin.
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

  // Find our Note columns object.
  const noteColumns = document.getElementById("notes");

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

Front.on('conversation', function (data) {
  console.log('Conversation', data.conversation);
  console.log('Contact', data.contact);
  console.log('Message', data.message);
  console.log('OtherMessages', data.otherMessages);
  loadContact(data.contact)
});


//Code below this comment is just mocked data and can be used as a black box, or altered to be used as a sandbox.

// This function returns mock CRM data and is being used as an analog for your functionality being added to the plugin.  
// This simply picks random data and organizes it.
function mockQueryCRM(email) {
  const info = {
    id: Math.floor(Math.random() * 1000),
    location: 'Fake Company HQ',
    status: statuses[Math.floor(Math.random() * 4)]
  }

  const note1Index = Math.floor(Math.random() * 8);
  const note2Index = Math.floor(Math.random() * 8);
  let notes = [];
  notes.push(notesSamples[note1Index]);
  notes.push(notesSamples[note2Index === note1Index ? note1Index + 1 : note2Index]);
  return {notes, info};
}

// Here's some fake CRM data to display in the plugin.
const statuses = ['Open', 'Closed', 'Won', 'Blocked'];
const notesSamples = [
  {
    date: "10/10/19",
    author: "Phillip Fry",
    blurb: "Great talk. I think we're ready to make a sale."
  },
  {
    date: "10/10/19",
    author: "Professor Fansworth",
    blurb: "Lead confused about the offering."
  },
  {
    date: "10/12/19",
    author: "Leela",
    blurb: "Missed their call.  Intending to call back"
  },
  {
    date: "10/01/19",
    author: "Bender",
    blurb: "Congrats on the sale!"
  },
  {
    date: "07/10/19",
    author: "Doctor Zoidberg",
    blurb: "Good luck next time."
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
  },
  {
    date: "04/15/19",
    author: "Kif Kroker",
    blurb:  "Running late, be there in 5."
  },
  {
    date: "01/01/19",
    author: "Richard Nixon",
    blurb: "Haroo!"
  }
];

// // Our mock contact object.
// const contact = {
//   id: "crd_55c8c149",
//   handle: "john.doe@frontapp.com",
//   initials: "J",
//   display_name: "John Doe",
//   description: "Unknown.jpeg",
//   avatar: null,
//   color: "hsl(47,60%,70%)",
//   source: "email",
//   role: "reply-to",
//   num_notes: 0
// }
