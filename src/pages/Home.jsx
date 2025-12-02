import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import contaImage from '../assets/conta_image.jpeg';
import logoText from '../assets/logo_text.png';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero bg-light py-5 pt-5 mt-5">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <h1 className="display-4 fw-bold text-primary">Bem-vindo à WoodWork</h1>
              <p className="lead">
                Descubra móveis e peças de madeira artesanais de alta qualidade.
                Transformamos madeira em arte para o seu lar.
              </p>
              <Button as={Link} to="/catalog" variant="primary" size="lg">
                Explorar Catálogo
              </Button>
            </Col>
            <Col md={6}>
              <img
                src={contaImage}
                alt="Móveis de Madeira"
                className="img-fluid rounded shadow"
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Featured Services Section */}
      <section className="services py-5">
        <Container>
          <h2 className="text-center mb-4">Nossos Serviços</h2>
          <Row>
            <Col md={4} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Body className="text-center">
                  <Card.Title>Design Personalizado</Card.Title>
                  <Card.Text>
                    Criamos peças únicas de acordo com suas necessidades e estilo.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Body className="text-center">
                  <Card.Title>Restauracao</Card.Title>
                  <Card.Text>
                    Restaure seus móveis antigos com técnicas tradicionais.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Body className="text-center">
                  <Card.Title>Consultoria</Card.Title>
                  <Card.Text>
                    Orientação especializada para projetos de marcenaria.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* About Section */}
      <section className="about bg-secondary text-white py-5">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <h2>Sobre Nós</h2>
              <p>
                Na WoodWork, somos apaixonados por madeira e artesanato.
                Com anos de experiência, oferecemos soluções de alta qualidade
                para móveis e decorações.
              </p>
              <Button as={Link} to="/sobre" variant="light">
                Saiba Mais
              </Button>
            </Col>
            <Col md={6}>
              <img
                src={logoText}
                alt="Logo WoodWork"
                className="img-fluid"
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Contact CTA */}
      <section className="contact-cta py-5">
        <Container className="text-center">
          <h2>Pronto para Começar?</h2>
          <p className="lead">Entre em contato conosco para discutir seu projeto.</p>
          <Button as={Link} to="/contato" variant="primary" size="lg">
            Fale Conosco
          </Button>
        </Container>
      </section>
    </div>
  );
};

export default Home;
