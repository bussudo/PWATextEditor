import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log("putDb");
  let database = await openDB("jate", 1);
  let transaction = database.transaction("jate", "readwrite");
  let store = transaction.objectStore("jate");
  const request = store.put({
    id: 1,
    value: content,
  });
  let result = await request;
  console.log("this is data saved", result.value);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  let database = await openDB("jate", 1);
  let transaction = database.transaction("jate", "readonly");
  let store = transaction.objectStore("jate");
  let request = store.get(1);
  let result = await request;
  // console.log(result.value);
  return result?.value;
};

initdb();
