import './App.css';
import MiApi from './Components/MiApi';
import Buscador from './Components/Buscador';
import React, { useState } from 'react';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <h1>Farmacias de turno Chile</h1>
      <hr />
      <Buscador
        search={searchTerm}
        onSearchChange={handleSearchChange}
      />
      <hr />
      <MiApi search={searchTerm} />
    </>
  );
}

export default App;