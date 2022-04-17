import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

export const putDb = async (id, value) => {
  console.log('PUT request to update the jateDB');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readwrite');
  const objStore = tx.objectStore('jate');
  const request = objStore.put({ id: id, value: value })
  const response = await request;
  console.log('data saved to the jateDB', response);
};

export const getDb = async () => {
  console.log('Getting data from the jateDB');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readonly');
  const objStore = tx.objectStore('jate');
  const request = objStore.getAll()
  const response = await request;
  console.log('data saved to the jateDB', response);
};

initdb();
