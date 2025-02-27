import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { FirebaseContext } from './store/Context';
import { firebaseApp, auth, db, storage } from './firebase/config';
import Context from './store/Context';

const firebaseServices = {
  firebaseApp, 
  auth,
  db,
  storage,
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FirebaseContext.Provider value={firebaseServices}>
      <Context>
      <App />
      </Context>
    </FirebaseContext.Provider>
  </React.StrictMode>
);
