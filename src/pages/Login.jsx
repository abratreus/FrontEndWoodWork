import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Conta.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState(null);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleEsqueciASenha = async (e) =>{
    
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    console.log("Form submitted with email:", email, "senha:", senha);

    try {
      const originUrl = window.location.pathname;
      console.log("Calling login with:", email, senha, originUrl);
      const redirectUrl = await login(email, senha, originUrl);
      console.log("Login successful, redirectUrl:", redirectUrl);
      navigate(redirectUrl);
    } catch (err) {
      console.error("Erro no Login:", err);
      setError(err.response?.data?.message || 'Erro ao tentar fazer login. Tente novamente.');
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
              type="Password"
              name="senha"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
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
              <span ><Link to="/home" className="btn text-decoration-none text-secondary" > Entrar como visitante </Link></span>
              <span className="text-secondary btn text-decoration-none">Esqueci minha senha</span>
            </div>
            {error && <div className="alert alert-danger me-3 d-flex align-items-center" role="alert"><i className="bi bi-exclamation-triangle me-2"></i>{error}</div>}
          </form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
