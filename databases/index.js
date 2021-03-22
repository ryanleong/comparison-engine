import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

/**
 * Open connection to database
 */
const openDb = () => {
  try {
    sqlite3.verbose();

    return open({
      filename: 'databases/strollers.db',
      driver: sqlite3.Database,
    });
  } catch (err) {
    console.error(err);
  }
};

/**
 * Close connection to database
 */
const closeDb = async (db) => {
  try {
    await db.close();
  } catch (err) {
    console.error(err);
  }
};

/**
 * Get list of items for listing
 */
const getItems = async () => {
  try {
    const db = await openDb();
    const items = await db.all('SELECT id, model FROM item');
    closeDb(db);
    return items;
  } catch (err) {
    console.error(err);
    return;
  }
};

/**
 * Get item data
 * @param {Number} id
 */
const getItem = async (id) => {
  try {
    const db = await openDb();
    const [item, specifications] = await Promise.all([
      db.get('SELECT * FROM item WHERE id = ?', id),
      db.all('SELECT * FROM specification WHERE item_id = ?', id),
    ]);

    const others = [];
    const specs = specifications.reduce((acc, spec) => {
      const { key, value } = spec;

      if (key !== 'others') {
        return { ...acc, [key]: value };
      }

      others.push(value);
      return acc;
    }, {});

    closeDb(db);
    return { ...item, specs: { ...specs, others } };
  } catch (err) {
    console.error(err);
    return;
  }
};

export { getItems, getItem };
