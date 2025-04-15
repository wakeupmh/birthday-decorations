import './App.css'
import * as React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Theme, Container } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import Categories from './components/Categories';
import ProductList from './components/ProductList';
import Builder from './components/Builder';
import Footer from './components/Footer';
import ToasterProvider, { ToasterContext } from './components/Toaster';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import PegueMonte from './pages/PegueMonte';
import Produtos from './pages/Produtos';
import Contato from './pages/Contato';
import Login from './pages/Login';
import Cadastrar from './pages/Cadastrar';

function HomeContent({ onAdd, category, setCategory, builderOrder, onRemove, onReorder }) {
  return (
    <>
      <Banner />
      <Categories value={category} onValueChange={setCategory} />
      <ProductList onAdd={onAdd} category={category} />
      <Builder builderItems={builderOrder} onRemove={onRemove} onReorder={onReorder} />
    </>
  );
}

function AppContent() {
  const [cartItems, setCartItems] = React.useState([]);
  const [category, setCategory] = React.useState('all');
  const [builderOrder, setBuilderOrder] = React.useState([]);
  const toaster = React.useContext(ToasterContext);
  const navigate = useNavigate();

  React.useEffect(() => {
    setBuilderOrder(cartItems);
  }, [cartItems]);

  function handleAddToCart(product) {
    setCartItems((prev) => [...prev, product]);
    toaster?.showToast({ title: 'Adicionado ao carrinho', description: product.name });
  }
  function handleRemoveFromCart(product) {
    setCartItems((prev) => prev.filter((item) => item !== product));
    toaster?.showToast({ title: 'Removido do carrinho', description: product.name });
  }
  function handleCheckout() {
    toaster?.showToast({ title: 'Pedido realizado!', description: 'Seu pedido foi enviado com sucesso.' });
    setCartItems([]);
  }
  function handleBuilderReorder(newOrder) {
    setBuilderOrder(newOrder);
    setCartItems(newOrder);
  }

  return (
    <Theme appearance="light" accentColor="iris" grayColor="sand" radius="large">
      <Container size="4" py="4" style={{ maxWidth: 1200, minWidth: 360, width: '100%', margin: '0 auto' }}>
        <Navbar onCartClick={() => navigate('/carrinho')} />
        <Routes>
          <Route path="/" element={<HomeContent onAdd={handleAddToCart} category={category} setCategory={setCategory} builderOrder={builderOrder} onRemove={handleRemoveFromCart} onReorder={handleBuilderReorder} />} />
          <Route path="/pegue-e-monte" element={<PegueMonte />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastrar" element={<Cadastrar />} />
          <Route path="/produto/:productId" element={<ProductDetail />} />
          <Route path="/carrinho" element={<Cart items={cartItems} onRemove={handleRemoveFromCart} onCheckout={handleCheckout} />} />
        </Routes>
      </Container>
      <Footer />
    </Theme>
  );
}

export default function App() {
  return (
    <ToasterProvider>
      <Router>
        <AppContent />
      </Router>
    </ToasterProvider>
  );
}
