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