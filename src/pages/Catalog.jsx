import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

function Catalog() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  return (
    <Container className="my-5 mt-5 pt-5">
      <Row className="mb-4 mt-5 pt-5">
        <h1 className="text-4xl font-bold mb-2 text-center text-gray-800">Bem-vindo ao Catálogo</h1>
        <p className="text-lg text-center text-gray-600 mb-8">Explore nossos produtos de madeira artesanal.</p>=
        <Col md={8}>
          <Form.Control
            type="text"
            placeholder="Buscar produtos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
        <Col md={4}>
          <Button variant="secondary" onClick={() => setSearchTerm('')} className="w-100">Limpar Busca</Button>
        </Col>
      </Row>
      <div className="room-section mb-5">
        <h3 className="room-title"></h3>
        <Row>
          <Col xs={12} sm={6} md={4} lg={3} className="mb-4">
            <div className="product-card p-3 border h-100">

              <h5 className="product-name"></h5>
              <p className="product-price"></p>
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default Catalog;
