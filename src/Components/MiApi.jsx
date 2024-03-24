import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'react-bootstrap';
import { Spinner } from 'react-bootstrap';

const MiApi = ({ search }) => {
  const [result, setResult] = useState([]);
  const [filteredResult, setFilteredResult] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    consultarApi();
  }, []);

  useEffect(() => {
    handleSearch(search);
  }, [search]);

  const consultarApi = async () => {
    try {
      const url = `https://midas.minsal.cl/farmacia_v2/WS/getLocalesTurnos.php`;
      const response = await fetch(url);
      const data = await response.json();
      const ordenadoData = data.sort((a, b) => a.comuna_nombre.localeCompare(b.comuna_nombre));
      setResult(ordenadoData);
      setFilteredResult(ordenadoData);
      setLoading(false);
    } catch (error) {
      console.error('Error al consultar la API:', error);
    }
  };

  const handleSearch = (searchTerm) => {
    const filteredData = result.filter((item) => {
      return item.comuna_nombre.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setFilteredResult(filteredData);
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <h3>Cargando...</h3>
      </div>
    );
  }

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Comuna</th>
            <th>Local</th>
            <th>Día</th>
            <th>Horario</th>
            <th>Dirección</th>
            <th>Teléfono</th>
          </tr>
        </thead>
        <tbody>
          {filteredResult.map((data) => (
            <tr key={`${data.funcionamiento_dia} - ${data.local_id}`}>
              <td>{data.comuna_nombre}</td>
              <td>{data.local_nombre}</td>
              <td>{data.funcionamiento_dia}</td>
              <td>{`${data.funcionamiento_hora_apertura} - ${data.funcionamiento_hora_cierre}`}</td>
              <td>{data.local_direccion}</td>
              <td>{data.local_telefono}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default MiApi;