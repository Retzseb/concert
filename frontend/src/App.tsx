import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div>
      <p>Belépés</p>
      <label>Felhasználónév: </label>
      <input type="user" />
      <label>Jelszó: </label>
      <input type="password" />
    </div>
  );
}

export default App;
