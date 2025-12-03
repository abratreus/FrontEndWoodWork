import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import api from '../services/api';
import ProductCard from '../components/ProductCard';
import { useAlert } from '../context/AlertContext'

function Catalog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const {showAlert} = useAlert;

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  // Fetch products and categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsResponse, categoriesResponse] = await Promise.all([
          api.get('/api/produtos'),
          api.get('/api/categorias')
        ]);
        setProducts(productsResponse.data.filter(product => product.ativo === 1)); // Only active products
        setCategories(categoriesResponse.data);
      } catch (err) {
        setAlert('Erro ao carregar produtos. Tente novamente mais tarde.');
        console.showAlert('Error fetching data:', err);
      }
    };

    fetchData();
  }, []);

  // Filter products based on search term and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.descricao_detalhada.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || product.categoria_id === parseInt(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  return (
    <Container className="my-5 mt-5 pt-5">
      <Row className="mb-4 mt-5 pt-5">
        <Col xs={12}>
          <h1 className="text-4xl font-bold mb-2 text-center text-gray-800">Bem-vindo ao Catálogo</h1>
          <p className="text-lg text-center text-gray-600 mb-4">Explore nossos produtos de madeira artesanal.</p>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col md={4}>
          <Form.Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Todas as categorias</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.nome}</option>
            ))}
          </Form.Select>
        </Col>
        <Col md={6}>
          <Form.Control
            type="text"
            placeholder="Buscar produtos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
        <Col md={2}>
          <Button variant="secondary" onClick={() => { setSearchTerm(''); setSelectedCategory(''); }} className="w-100">Limpar</Button>
        </Col>
      </Row>
      <Row>
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <Col key={product.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                <ProductCard produto={product} />
              </Col>
            ))
          ) : (
            <Col xs={12}>
              <Alert variant="info" className="text-center">
                Nenhum produto encontrado com os filtros aplicados.
              </Alert>
            </Col>
          )}
        </Row>
    </Container>
  );
};

export default Catalog;
