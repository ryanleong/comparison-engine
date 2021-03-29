import firebase from 'firebase/app';
import 'firebase/database';
import LRU from 'lru-cache';

const options = {
  max: 500,
  maxAge: 1000 * 60 * 60,
};

const cache = new LRU(options);

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DB_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

/**
 * Initialize firebase
 * @param {Object} config Firebase config
 */
const initFirebase = (config) => {
  // Initialize Firebase
  try {
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }
  } catch (err) {
    console.error(`Failed to initialize firebase: ${err}`);
  }
};

/**
 * Get config
 * NOTE: Should only be called at build time
 */
const getConfig = async () => {
  const KEY = 'config';
  const cachedValue = cache.get(KEY);

  if (cachedValue) {
    return cachedValue;
  }

  try {
    initFirebase(firebaseConfig);
    const db = firebase.database();
    const snapshot = await db.ref().child(KEY).get();
    return snapshot.val();
  } catch (error) {
    console.error(error);
  }
};

/**
 * Get list of items for listing
 * NOTE: does not read from cache and should only be used at build time
 */
const getItems = async () => {
  try {
    initFirebase(firebaseConfig);
    const db = firebase.database();
    const snapshot = await db.ref().child('items').get();

    if (!snapshot.exists()) {
      return [];
    }

    const items = snapshot
      .val()
      .reduce((itemList, item) => {
        if (item) {
          return [...itemList, item];
        }
        return itemList;
      }, [])
      .sort((a, b) => (a.id > b.id ? 1 : -1));

    return items;
  } catch (error) {
    console.error(error);
  }
};

/**
 * Get item data
 * @param {Number} id
 */
const getItem = async (id) => {
  const KEY = `items/${id}`;
  const cachedValue = cache.get(KEY);

  if (cachedValue) {
    return cachedValue;
  }

  try {
    initFirebase(firebaseConfig);
    const db = firebase.database();
    const snapshot = await db.ref().child('items').child(id).get();
    const item = snapshot.val();

    cache.set(KEY, item);

    return item;
  } catch (error) {
    console.error(error);
  }
};

export { getConfig, getItems, getItem };
