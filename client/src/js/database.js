import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 2, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });


export const putDb = async (content) => {
  try{
  const db = await openDB('jate', 2)
  const tx = db.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const id = await store.put({ content: content});
  console.log(`Added content with ID: ${id}`);
  await tx.done;
  } catch (err) {
    console.error('putDb not implemented');
  };
};

export const getDb = async () => {
  try{
  const db = await openDB('jate', 2)
  const tx = db.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const allContent = await store.getAll();
  console.log('All Content:', allContent)
  } catch(err) {
    console.error('getDb not implemented');
  };
};

initdb();
