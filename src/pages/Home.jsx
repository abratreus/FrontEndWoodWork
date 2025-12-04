import React from 'react';
import { Container, Row, Col, Button, Card, CardHeader, CardFooter } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { NotebookPen } from 'lucide-react'
import './Conta.css'

const [searchTerm, setSearchTerm] = useState('');
const [selectedCategory, setSelectedCategory] = useState('');
const [products, setProducts] = useState([]);
const [categories, setCategories] = useState([]);
const {showAlert} = useAlert;
useEffect(() => {
  const fetchData = async () => {
    try {
      const [productsResponse, categoriesResponse] = await Promise.all([
        api.get('/api/produtos'),
        api.get('/api/categorias')
      ]);
      setProducts(productsResponse.data.filter(product => product.ativo === 1)); 
      setCategories(categoriesResponse.data);
    } catch (err) {
      showAlert('Erro ao carregar produtos. Tente novamente mais tarde.');
      console.showAlert('Error fetching data:', err);
    }
  };
 
  fetchData();
}, []);


const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero bg-light imagem-home pt-5 mt-4 p-5 d-flex align-items-center">
        <Container>
          <Row >
            <Col>
              <h1 className="display-4 fw-bold text-primary ">Bem-vindo à WoodWork</h1>
              <p className="lead fs-1 my-5 ">
                Descubra móveis e peças de madeira artesanais de alta qualidade.
                Transformamos madeira em arte para o seu lar.
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button as={Link} className='py-3 px-5 align-bottom mt-5' to="/catalogo" variant="primary" size="lg">
                Explorar Catálogo
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="services py-5">
        <Container  className='align-itens-center justify-content-center'>
          <h2 className="text-center mb-4">Faça seu Orçamento</h2>
          <Row >
          <Col></Col>
            <Col xs={6} className="mb-4 ">
              <Card className="h-100 shadow  p-5">
                <Card.Body className="text-center">
                  <Card.Title>Design Personalizado</Card.Title>
                  <Card.Text>
                    Criamos peças únicas de acordo com suas necessidades e estilo.
                  </Card.Text>
                  <NotebookPen size={150} className=''/>
                  <Card.Text className='mt-3'>
                    <Button size='lg'>Solicite Seu Orçamento</Button>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col></Col>
          </Row>
        </Container>
      </section> 
      
    </div>
  );
};

export default Home;
