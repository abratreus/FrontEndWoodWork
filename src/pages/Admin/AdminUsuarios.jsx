import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Badge, Modal, Row, Col, Form } from 'react-bootstrap';
import api from '../../services/api';
import { Trash2, Edit, Save } from 'lucide-react';
import { useAlert } from '../../context/AlertContext';

const AdminUsuarios = () => {
  const { showAlert } = useAlert();
  const [usuarios, setUsuarios] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Forms states
  const [formData, setFormData] = useState({
    id: '',
    nome_completo: '',
    email: '',
    tipo_perfil: 'cliente',
    ativo: 1,
    data_cadastro: ''
  });

  // Carregar usuários
  const fetchUsuarios = async () => {
    try {
      const response = await api.get('/api/usuarios');
      setUsuarios(response.data);
    } catch (err) {
      console.error('Erro ao buscar usuários', err);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  // Salvar usuário
  const handleSaveUser = async () => {
    try {
      // Validar SQL NotNull
      if (!formData.nome_completo || !formData.email) {
        showAlert('Nome completo e email são obrigatórios.');
        return;
      }

      const userPayload = { ...formData };

      // PUT
      await api.put(`/api/usuarios/${formData.id}`, userPayload);
      showAlert('Usuário atualizado com sucesso.');

      setShowModal(false);
      fetchUsuarios();
    } catch (err) {
      showAlert('Erro ao salvar usuário.');
    }
  };

  // Deletar usuário
  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja remover este usuário?')) {
      try {
        await api.delete(`/api/usuarios/${id}`);
        fetchUsuarios();
      } catch (err) {
        showAlert('Erro ao deletar usuário.', 'danger');
      }
    }
  };

  // Abrir Modal
  const handleOpenModal = (user = null) => {

    if (user) {
      setFormData({
        id: user.id,
        nome_completo: user.nome_completo,
        email: user.email,
        tipo_perfil: user.tipo_perfil,
        ativo: user.ativo,
        data_cadastro: user.data_cadastro
      });
      setShowModal(true);
    }
  };
    return (
      <Container className="mt-5 pt-5">
        <div className="d-flex justify-content-between align-items-center mb-4 pt-5">
          <h2>Gerenciar Usuários</h2>
        </div>
        <Table striped bordered hover className='shadow-sm'>
          <thead className='table-dark'>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Tipo</th>
              <th>Ativo</th>
              <th>Data de Cadastro</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.nome_completo}</td>
                <td>{user.email}</td>
                <td>
                  <Badge bg={user.tipo_perfil === 'admin' ? 'danger' : 'primary'}>
                    {user.tipo_perfil}
                  </Badge>
                </td>
                <td>
                  <Form.Check className="mb-3"
                    type="switch"
                    checked={user.ativo === 1}
                    readOnly
                  />
                </td>
                <td>{new Date(user.data_cadastro).toLocaleString()}</td>
                <td >
                  <Button variant="warning" size="sm" className="me-2" onClick={() => handleOpenModal(user)}>
                    <Edit size={16} />
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(user.id)}>
                    <Trash2 size={16} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {/* Modal de Update */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Editar Usuário</Modal.Title>

          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Nome Completo</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.nome_completo}
                  onChange={(e) => setFormData({ ...formData, nome_completo: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Tipo de Perfil</Form.Label>
                <Form.Select
                  value={formData.tipo_perfil}
                  onChange={(e) => setFormData({ ...formData, tipo_perfil: e.target.value })}
                >
                  <option value="cliente">Cliente</option>
                  <option value="admin">Admin</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Check
                  type="switch"
                  checked={formData.ativo === 1}
                  onChange={(e) => setFormData({ ...formData, ativo: e.target.checked ? 1 : 0 })}
                >
                </Form.Check>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Data de Cadastro</Form.Label>
                <div>{new Date(formData.data_cadastro).toLocaleString()}</div>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={() => handleSaveUser() && setShowModal(false)}>
              <Save size={20} className='me-2' />
              Salvar
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    );
  };

  export default AdminUsuarios;