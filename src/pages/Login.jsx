import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Conta.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await login(email, password);
      navigate('/home');
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao tentar fazer login. Tente novamente.');
      console.error("Erro no Login:", err);
    }
  };

  return (
    <Container fluid className="login-container">
      <Row className="justify-content-center align-items-center min-vh-100 p-0 m-0">
        <Col md={6} className="d-none d-lg-block p-0">
          <div className="login-image">
            <div className="image-overlay">
              <h2>Bem-vindo de volta à Woodwork</h2>
            </div>
          </div>
        </Col>
        <Col className="d-flex flex-column align-items-center h-100">
          <form className="login-form shadow-lg bg-body-tertiary" onSubmit={handleSubmit}>
            <h2 className="text-center">Login</h2>
            <p>Faça login para acessar as funcionalidades do sistema.</p>
            <label htmlFor="Email" className="form-label ">Email</label>
            <input
              id="Email"
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-control mb-3"
            />

            <input
              type="password"
              name="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-control mb-3"
            />
            <div className="d-flex flex-row gap-2 w-100">
              <button type="submit" className="btn btn-primary flex-fill">Entrar</button>
              <button type="button" className="btn btn-outline-secondary flex-fill">
                <Link to="/register" className="text-decoration-none text-black">Cadastre-se</Link>
              </button>
            </div>
            <div className="d-flex flex-row gap-2 w-100 justify-content-between">
              <span className="text-secondary">Entrar como visitante</span>
              <span className="text-secondary">Esqueci minha senha</span>
            </div>
            {error && <div className="alert alert-danger me-3 d-flex align-items-center" role="alert"><i className="bi bi-exclamation-triangle me-2"></i>{error}</div>}
          </form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
