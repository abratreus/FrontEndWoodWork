import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Users, Package, MailCheck, ShoppingCart } from 'lucide-react';

const AdminHome = () => {
  return (
    <Container className=" position-absolute top-50 start-50 translate-middle">
      <h1 className="mb-4 text-center ">Painel Administrativo</h1>
      <Row className="justify-content-center pt-3">
        <Col md={6} lg={6} className="mb-3">
          <Card className="text-center h-100 shadow-sm">
            <Card.Body >
              <Package size={100} className="text-primary mb-3" />
              <Card.Title>Produtos</Card.Title>
              <Card.Text>Cadastre, edite ou remova produtos do catálogo.</Card.Text>
              <Link to="/admin/produtos">
                <Button variant="primary">Gerenciar Produtos</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={6} className="mb-3">
          <Card className="text-center h-100 shadow-sm">
            <Card.Body>
              <Users size={100} className="text-success mb-3" />
              <Card.Title>Usuários</Card.Title>
              <Card.Text>Visualize e gerencie os usuários cadastrados.</Card.Text>
              <Link to="/admin/usuarios">
                <Button variant="success">Gerenciar Usuários</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
                <Col md={6} lg={6} className="mb-3 ">
          <Card className="text-center h-100 shadow-sm">
            <Card.Body>
              <MailCheck size={100} className="text-warning mb-3" />
              <Card.Title>Orçamentos</Card.Title>
              <Card.Text>Visualize e gerencie os Orçamentos solicitados pelos Usuarios.</Card.Text>
              <Link to="/admin/produtos">
                <Button variant="btn btn-warning">Gerenciar Orçamentos</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={6}  className="mb-3">
          <Card className="text-center h-100 shadow-sm">
            <Card.Body>
              <ShoppingCart size={100} className="text-info mb-3" />
              <Card.Title>Pedidos</Card.Title>
              <Card.Text>Visualize e gerencie os Pedidos feitos pelos Usuarios.</Card.Text>
              <Link to="/admin/usuarios">
                <Button variant="btn btn-info">Gerenciar Pedidos</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminHome;