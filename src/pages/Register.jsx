import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import './Conta.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import loginImage from '../assets/conta_image.jpeg';
import ReCAPTCHA from 'react-google-recaptcha';
import { useAlert } from '../context/AlertContext'

const Register = () => {
  const [credentials, setCredentials] = useState({ nome_completo: '', email: '', senha: '', ativo: ''  });
  const [captchaToken, setCaptchaToken] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleCaptchaChange = (token) => {
    setCaptchaToken(token);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    if (!captchaToken) {
      alert('Por favor, complete o reCAPTCHA.');
      return;
    }

    try {
      const formData = {
        nome_completo: credentials.nome_completo,
        email: credentials.email,
        senha: credentials.senha,
        tipo_perfil: 'cliente',
        ativo: credentials.ativo
      };

      const response = await api.post('/api/auth/register', formData);
      showAlert('Cadastro Realizado, Faça o Login')
      if (response.status === 201) {
        setSuccess(true);
        setTimeout(() => navigate('/'), 2000);
      }
    } catch (err) {
      console.error("Erro no cadastro:", err);
      setError(err.response?.data?.error || 'Erro ao conectar com o servidor.');
    }
  };

  return (
    <Container fluid className="login-container">
      <Row className="justify-content-center align-items-center min-vh-100 p-0 m-0">
        <Col md={6} className="d-none d-lg-block p-0">
          <div className="login-image">
            <img src={loginImage} alt="Cadastro" className="img-fluid w-100 h-100 object-fit-cover" />
            <div className="image-overlay">
              <h2>Bem-vindo à Woodwork</h2>
              <p>Crie sua conta e personalize seus móveis sob medida.</p>
            </div>
          </div>
        </Col>
        <Col className="d-flex flex-column align-items-center h-100">
          <form className="login-form shadow-lg bg-body-tertiary" onSubmit={handleSubmit}>
            {error && <div className="bg-red-100 text-red-700 p-3 rounded">{error}</div>}
            {success && <div className="bg-green-100 text-green-700 p-3 rounded">Cadastro realizado!</div>}
            <input
              type="text"
              name="nome_completo"
              placeholder="Nome Completo"
              value={credentials.nome_completo}
              onChange={handleChange}
              required
              className="form-control mb-3"
            />
            
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={credentials.email}
              onChange={handleChange}
              required
              className="form-control mb-3"
            />

            <input
              type="password"
              name="senha"
              placeholder="Senha"
              value={credentials.senha}
              onChange={handleChange}
              required
              className="form-control mb-3"
            />

            <ReCAPTCHA
              sitekey="6Le9FAEsAAAAAEXhZq-lMDgvu9y3Wm1laJbZgCYq" // Chave real do Google reCAPTCHA
              onChange={handleCaptchaChange}
              className="mb-3"
            />
            <button type="submit" className="btn btn-primary w-100">Cadastrar-se</button>
            <p className="mt-3 text-center text-sm text-gray-600">
              Já está cadastrado? <Link to="/" className="text-blue-600 hover:underline">Faça login</Link>
            </p>
          </form>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
