import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer py-5 mt-5 shadow-lg p-3 bg-white rounded">
      <Container fluid className="px-5">
        <Row>
          <Col md={4} className="mb-4">
            <h5>WoodWork</h5>
            <p>Seu Site de Simulação Orçamentos. Qualidade e estilo para seu lar.</p>
          </Col>
          <Col md={4} className="mb-4">
            <h5>Links Úteis</h5>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-dark">Home</Link></li>
              <li><Link to="/catalogo" className="text-dark">Catálogo</Link></li>
              <li><Link to="/sobre" className="text-dark">Sobre Nós</Link></li>
              <li><Link to="/contato" className="text-dark">Contato</Link></li>
              <li><Link to="/politica-privacidade" className="text-dark">Política de Privacidade</Link></li>
            </ul>
          </Col>
          <Col md={4} className="mb-4">
            <h5>Contato</h5>
            <p>Telefone: (12) 992269957</p>
            <p>Email: abratreus.lopes@gmail.com</p>
            <p>Endereço:</p>
            <div style={{ width: '100%', height: '250px', overflow: 'hidden', borderRadius: '8px' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d459.6832899566599!2d-45.18789779541721!3d-22.82223080874421!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1spt-BR!2sbr!4v1762811399926!5m2!1spt-BR!2sbr"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização WoodWork"
              ></iframe>
            </div>
          </Col>
        </Row>
        <hr className="my-4" />
        <Row>
          <Col className="text-center">
            <p className="mb-0">© {new Date().getFullYear()} WoodWork. Todos os direitos reservados.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

