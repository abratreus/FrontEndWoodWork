import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Badge } from 'react-bootstrap';
import api from '../../services/api';
import { Trash2 } from 'lucide-react';

const AdminUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);

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

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja remover este usuário?')) {
      try {
        await api.delete(`/api/usuarios/${id}`);
        fetchUsuarios();
      } catch (err) {
        alert('Erro ao deletar usuário.');
      }
    }
  };

  return (
    <Container className="mt-5 pt-5">
      <h2 className="mb-4 pt-5 ">Gerenciar Usuários</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Tipo</th>
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
                <Button variant="danger" size="sm" onClick={() => handleDelete(user.id)}>
                  <Trash2 size={16} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AdminUsuarios;