// Importing openDB function from the 'idb' library
import { openDB } from 'idb';

// Initializing the database
const initdb = async () => {
  // Opening the 'jate' database with version 2
  openDB('jate', 2, {
    upgrade(db) {
      // Checking if the 'jate' object store already exists
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }

      // Creating the 'jate' object store with auto-incrementing keys
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });
};

// Function to add content to the database
export const putDb = async (content) => {
  try {
    // Opening the 'jate' database with version 2
    const db = await openDB('jate', 2);
    // Starting a read-write transaction
    const tx = db.transaction('jate', 'readwrite');
    // Accessing the 'jate' object store
    const store = tx.objectStore('jate');
    // Adding content to the object store and obtaining the ID
    const id = await store.put({ content: content });
    console.log(`Added content with ID: ${id}`);
    // Completing the transaction
    await tx.done;
  } catch (err) {
    console.error('putDb not implemented');
  }
};

// Function to retrieve all content from the database
export const getDb = async () => {
  try {
    // Opening the 'jate' database with version 2
    const db = await openDB('jate', 2);
    // Starting a read-only transaction
    const tx = db.transaction('jate', 'readonly');
    // Accessing the 'jate' object store
    const store = tx.objectStore('jate');
    // Getting all content from the object store
    const allContent = await store.getAll();
    console.log('All Content:', allContent);
  } catch (err) {
    console.error('getDb not implemented');
  }
};

// Initializing the database when the module is imported
initdb();
