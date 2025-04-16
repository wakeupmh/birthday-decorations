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
  const [pegueMonteKit, setPegueMonteKit] = React.useState([]); 
  const [category, setCategory] = React.useState('all');
  const [builderOrder, setBuilderOrder] = React.useState([]);
  const toaster = React.useContext(ToasterContext);
  const navigate = useNavigate();

  React.useEffect(() => {
    setBuilderOrder(cartItems);
  }, [cartItems]);

  function handleAddToCart(product) {
    const newItem = {
      ...product,
      id: `${product.id}-cart-${Date.now()}`,
      quantity: 1
    };
    setCartItems([...cartItems, newItem]);
    toaster?.showToast({ title: 'Item adicionado ao Carrinho', description: `${product.name} foi adicionado ao carrinho geral.` });
  }

  function handleRemoveFromCart(item) {
    setCartItems(cartItems.filter(i => i.id !== item.id));
  }
  
  function handleCheckout() {
    toaster?.showToast({ title: 'Pedido do Carrinho enviado!', description: `Seu pedido com ${cartItems.length} itens foi enviado com sucesso.` });
    setCartItems([]);
    navigate('/');
  }

  function handleAddToPegueMonteKit(product) {
    const existingItemIndex = pegueMonteKit.findIndex(item => item.id === product.id);

    if (existingItemIndex > -1) {
      const updatedKit = pegueMonteKit.map((item, index) => 
        index === existingItemIndex ? { ...item, quantity: (item.quantity || 1) + 1 } : item
      );
      setPegueMonteKit(updatedKit);
      toaster?.showToast({ title: 'Quantidade atualizada', description: `${product.name} quantidade aumentada no kit.` });
    } else {
      const newItem = {
        ...product,
        id: product.id, 
        quantity: 1
      };
      setPegueMonteKit([...pegueMonteKit, newItem]);
      toaster?.showToast({ title: 'Item adicionado ao Kit', description: `${product.name} foi adicionado ao seu kit Pegue e Monte.` });
    }
  }

  function handleRemoveFromPegueMonteKit(itemToRemove) {
    setPegueMonteKit(pegueMonteKit.filter(item => item.id !== itemToRemove.id));
    toaster?.showToast({ title: 'Item removido do Kit', description: `${itemToRemove.name} foi removido do seu kit.` });
  }
  
  function handleClearPegueMonteKit() {
    setPegueMonteKit([]);
    toaster?.showToast({ title: 'Kit Esvaziado', description: 'Todos os itens foram removidos do seu kit Pegue e Monte.' });
  }
  
  function handleFinalizePegueMonteKit() {
    if (pegueMonteKit.length === 0) {
       toaster?.showToast({ title: 'Kit Vazio', description: 'Adicione itens antes de finalizar.', color:'orange' });
       return;
    }
    toaster?.showToast({ title: 'Kit Enviado!', description: `Seu kit com ${pegueMonteKit.length} tipos de item está pronto!` });
    navigate('/'); 
  }

  function handleBuilderReorder(newOrder) {
    setCartItems(newOrder); 
  }

  return (
    <Theme appearance="light" accentColor="iris" radius="medium">
      <Container size="4" py="4" style={{ maxWidth: '100%', width: '100%', margin: '0 auto', padding: '0', overflow: 'hidden' }}>
        <Navbar cartCount={cartItems.length} onCartClick={() => navigate('/carrinho')} />
        <div className="app-container" style={{ maxWidth: '100%', overflow: 'hidden' }}>
          <Routes>
            <Route path="/" element={<HomeContent onAdd={handleAddToCart} category={category} setCategory={setCategory} builderOrder={builderOrder} onRemove={handleRemoveFromCart} onReorder={handleBuilderReorder} />} />
            
            <Route 
              path="/pegue-e-monte" 
              element={(
                <PegueMonte 
                  kitItems={pegueMonteKit} 
                  onAddItem={handleAddToPegueMonteKit} 
                  onRemoveItem={handleRemoveFromPegueMonteKit} 
                  onClearKit={handleClearPegueMonteKit} 
                  onFinalizeKit={handleFinalizePegueMonteKit} 
                  category={category} 
                  setCategory={setCategory} 
                />
              )} 
            />
            
            <Route path="/produtos" element={<Produtos />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastrar" element={<Cadastrar />} />
            <Route path="/produto/:productId" element={<ProductDetail />} />
            
            <Route path="/carrinho" element={<Cart items={cartItems} onRemove={handleRemoveFromCart} onCheckout={handleCheckout} />} />
          </Routes>
        </div>
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
