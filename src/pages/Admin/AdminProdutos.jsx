import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Container, Alert } from 'react-bootstrap';
import api from '../../services/api';
import { Trash2, Edit, Plus } from 'lucide-react';

const AdminProdutos = () => {
  // Estados
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [error, setError] = useState('');

  // Modal States
  const [showModal, setShowModal] = useState(false);
  const [modalView, setModalView] = useState('produto');

  // Produto state
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    nome: '',
    descricao_detalhada: '',
    preco_atual: '',
    categoria_id: '',
    data_criacao: '',
    qtd_estoque: '',
    ativo: 1,
    destaque: 0
  });

  // Categoria state
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryFormData, setCategoryFormData] = useState({
    nome: '',
    descricao: ''
  });

  // 1. Carregar Produtos (READ)
  const fetchProdutos = async () => {
    try {
      const [prodResponse, catResponse] = await Promise.all([
        api.get('/api/produtos'),
        api.get('/api/categorias')
      ]);
      setProdutos(prodResponse.data);
      setCategorias(catResponse.data);
    } catch (err) {
      setError('Erro ao carregar dados.');
    }
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  const getCategoriaNome = (categoriaId) => {
    const categoria = categorias.find(cat => cat.id === categoriaId);
    return categoria ? categoria.nome : 'N/A';
  }

  // 2. Abrir Modal (Para Criar ou Editar)
  const handleOpenProductModal = (produto = null) => {
    setModalView('produto');
    setEditingProduct(produto);

    if (produto) {
      setFormData({
        nome: produto.nome,
        descricao_detalhada: produto.descricao_detalhada,
        preco_atual: produto.preco_atual,
        categoria_id: produto.categoria_id,
        data_criacao: produto.data_criacao,
        destaque: Number(produto.destaque),
        ativo: Number(produto.ativo),
        qtd_estoque: Number(produto.qtd_estoque)
      });
    } else {
      setFormData({
        nome: '',
        descricao_detalhada: '',
        preco_atual: '',
        categoria_id: '',
        data_criacao: '',
        destaque: 0,
        ativo: 1,
        qtd_estoque: 0
      });
    }
    setShowModal(true);
  };

  const handleOpenCategoryModal = () => {
    setModalView('categorias');
    setShowModal(true);
  };

  const handleOpenCategoryForm = (categoria = null) => {
    setModalView('categoria');
    setEditingCategory(categoria);

    if (categoria) {
      setCategoryFormData({
        nome: categoria.nome,
        descricao: categoria.descricao
      });
    } else {
      setCategoryFormData({
        nome: '',
        descricao: ''
      });
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalView('produto');
    setEditingCategory(null);
    setCategoryFormData({
      nome: '',
      descricao: ''
    });
  }


  // 3. Salvar (CREATE ou UPDATE) 
  const prodHandleSave = async () => {
    try {
      const payload = {
        ...formData,
        ativo: formData.ativo ? 1 : 0,
        destaque: formData.destaque ? 1 : 0
      };
      if (editingProduct) {
        // UPDATE (PUT)
        await api.put(`/api/produtos/${editingProduct.id}`, formData);
        alert('Produto atualizado!');
      } else {
        // CREATE (POST)
        await api.post('/api/produtos', formData);
        alert('Produto criado!');
      }
      setShowModal(false);
      fetchProdutos(); // Recarrega a lista
    } catch (err) {
      console.error(err);
      alert('Erro ao salvar produto.');
    }
  };

  const catHandleSave = async () => {
    if (!categoryFormData.nome) {
      alert('O nome da categoria é obrigatório.');
      return;
    }
    try {
      if (editingCategory) {
        // UPDATE (PUT)
        await api.put(`/api/categorias/${editingCategory.id}`, categoryFormData);
        alert('Categoria atualizada!');
      } else {
        // CREATE (POST)
        await api.post('/api/categorias', categoryFormData);
        alert('Categoria criada!');
      }
      const catResponse = await api.get('/api/categorias');
      setCategorias(catResponse.data);

      setCategoryFormData({ nome: '', descricao: '' });
      setEditingCategory(null);
      setModalView('categorias');

    } catch (err) {
      console.error(err);
      alert('Erro ao salvar categoria.');
    }
  };
  // 4. Deletar (DELETE - Hard Delete)
  const prodHandleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este produto permanentemente?')) {
      try {
        await api.delete(`/api/produtos/${id}`);
        fetchProdutos();
      } catch (err) {
        alert('Erro ao excluir produto.');
      }
    }
  };

  const catHandleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta categoria permanentemente?')) {
      try {
        await api.delete(`/api/categorias/${id}`);
        const catResponse = await api.get('/api/categorias');
        setCategorias(catResponse.data);
      } catch (err) {
        alert('Erro ao excluir categoria.');
      }
    }
  };

  // 5. Inativar (PATCH - Soft Delete) - Opcional, conforme sua rota
  const handleInactivate = async (id) => {
    try {
      await api.patch(`/api/produtos/${id}/inativar`);
      fetchProdutos();
      alert('Produto inativado.');
    } catch (err) {
      alert('Erro ao inativar.');
    }
  }
  const handleActivate = async (id) => {
    try {
      await api.put(`/api/produtos/${id}`, { ativo: 1 });
      fetchProdutos();
      alert('Produto ativado.');
    } catch (err) {
      alert('Erro ao inativar.');
    }
  }

  return (
    <Container className="mt-5 pt-5">
      <h2 className="mb-4 pt-5">Gerenciar Produtos</h2>
      {error && <Alert variant="danger">{error}</Alert>}

      <Button variant="success" className="mb-3" onClick={() => handleOpenProductModal()}>
        <Plus size={18} /> Novo Produto
      </Button>
      <Button variant="info" className="mb-3 ms-2" onClick={() => handleOpenCategoryModal()}>
        Gerenciar Categorias
      </Button>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Categoria</th>
            <th>Preço</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((prod) => (
            <tr key={prod.id} style={{ opacity: prod.ativo === 0 ? 0.60 : 1 }}>
              <td>{prod.id}</td>
              <td>{prod.nome} {prod.ativo === 0 && '(Inativo)'}</td>
              <td>{getCategoriaNome(prod.categoria_id)}</td>
              <td>R$ {Number(prod.preco_atual).toFixed(2)}</td>
              <td>
                <Form.Check className="mb-3"
                  type="switch"
                  id="ativo-switch"
                  checked={prod.ativo === 1}
                />
              </td>
              <td className='me-1'>
                <Button variant="warning" size="sm" className="me-2" onClick={() => handleOpenProductModal(prod)}>
                  <Edit size={16} />
                </Button>
                <Button variant="danger" size="sm" className="me-2" onClick={() => prodHandleDelete(prod.id)}>
                  <Trash2 size={16} />
                </Button>
                <Button variant="secondary" size="sm" className="me-2" onClick={() => prod.ativo === 1 ? handleInactivate(prod.id) : handleActivate(prod.id)}>{prod.ativo === 1 ? 'Inativar' : 'Ativar?'}</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal de Formulário */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalView === 'produto' ? (editingProduct ? 'Editar Produto' : 'Novo Produto') : modalView === 'categorias' ? 'Gerenciar Categorias' : (editingCategory ? 'Editar Categoria' : 'Nova Categoria')}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalView === 'produto' ? (
            <Form>
              {/* Nome */}
              <Form.Group className="mb-3">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                />
              </Form.Group>
              {/* descricao_detalhada */}
              <Form.Group className="mb-3">
                <Form.Label>Descrição</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={formData.descricao_detalhada}
                  onChange={(e) => setFormData({ ...formData, descricao_detalhada: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                {/* Preço */}
                <Form.Label>Preço (R$)</Form.Label>
                <Form.Control
                  type="number"
                  value={formData.preco_atual}
                  onChange={(e) => setFormData({ ...formData, preco_atual: e.target.value })}
                />
              </Form.Group>
              {/* Categoria */}
              <Form.Group className="mb-3">
                <Form.Label>Categoria</Form.Label>
                <Form.Select
                  value={formData.categoria_id}
                  onChange={(e) => setFormData({ ...formData, categoria_id: e.target.value })}
                >
                  <option value="">Selecione uma categoria</option>
                  {categorias.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.nome}</option>
                  ))}
                </Form.Select>
                <Button variant="primary mt-3" onClick={() => handleOpenCategoryModal()}>Gerenciar Categoria</Button>
              </Form.Group>
              {/* Checklists */}
              <div className="d-flex gap-4">
                Produto Status:
                {/* Ativo */}
                <Form.Check className="mb-3"
                  type="switch"
                  id="ativo-switch"
                  label="Ativo"
                  checked={formData.ativo === 1}
                  onChange={(e) => setFormData({ ...formData, ativo: e.target.checked ? 1 : 0 })}
                />
                {/* Destaque */}
                <Form.Check className="mb-3"
                  type="switch"
                  id="destaque-switch"
                  label="Em Destaque"
                  checked={formData.destaque === 1}
                  onChange={(e) => setFormData({ ...formData, destaque: e.target.checked ? 1 : 0 })}
                />
              </div>
              {/* Estoque */}
              <Form.Group className="mb-3">
                <Form.Label>Estoque</Form.Label>
                <Form.Control
                  type="number"
                  value={formData.qtd_estoque}
                  onChange={(e) => setFormData({ ...formData, qtd_estoque: e.target.value })}

                />
              </Form.Group>
              {/* Data de Criação */}
              <Form.Group className="mb-3">
                <Form.Label>Data de Criação</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.data_criacao}
                  onChange={(e) => setFormData({ ...formData, data_criacao: e.target.value })}
                />
              </Form.Group>
            </Form>
          ) : modalView === 'categorias' ? (
            <>
              <Button variant="success" className="mb-3" onClick={() => handleOpenCategoryForm()}>
                <Plus size={18} /> Nova Categoria
              </Button>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Descrição</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {categorias.map((cat) => (
                    <tr key={cat.id}>
                      <td>{cat.id}</td>
                      <td>{cat.nome}</td>
                      <td>{cat.descricao}</td>
                      <td>
                        <Button variant="warning" size="sm" className="me-2" onClick={() => handleOpenCategoryForm(cat)}>
                          <Edit size={16} />
                        </Button>
                        <Button variant="danger" size="sm" onClick={() => catHandleDelete(cat.id)}>
                          <Trash2 size={16} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          ) : (
            <Form>
              {/* Nome da Categoria */}
              <Form.Group className="mb-3">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  value={categoryFormData.nome}
                  onChange={(e) => setCategoryFormData({ ...categoryFormData, nome: e.target.value })}
                />
              </Form.Group>
              {/* Descrição da Categoria */}
              <Form.Group className="mb-3">
                <Form.Label>Descrição</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={categoryFormData.descricao}
                  onChange={(e) => setCategoryFormData({ ...categoryFormData, descricao: e.target.value })}
                />
              </Form.Group>
              <Button variant="secondary" onClick={() => setModalView('categorias')}>Voltar</Button>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
          <Button variant="primary" onClick={modalView === 'produto' ? prodHandleSave : catHandleSave}>Salvar</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminProdutos;