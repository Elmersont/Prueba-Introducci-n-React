import React from 'react';
import { Form } from 'react-bootstrap';

const Buscador = ({ search, onSearchChange }) => {
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  return (
    <Form>
      <Form.Group className="mb-3" controlId="buscador">
        <Form.Label>Buscador</Form.Label>
        <Form.Control
          type="text"
          placeholder="Comuna"
          value={search}
          onChange={onSearchChange}
          onKeyPress={handleKeyPress}
        />
      </Form.Group>
    </Form>
  );
};

export default Buscador;

