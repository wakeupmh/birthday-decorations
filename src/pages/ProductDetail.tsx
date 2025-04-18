import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Flex, Text, Button } from '@radix-ui/themes';

// Simulação dos produtos (ideal: importar de um contexto ou API)
const products = [
  { id: 1, name: 'Kit Balão Colorido', price: 49.9, image: 'https://via.placeholder.com/240x240?text=Balão', category: 'baloes', description: 'Kit com 50 balões coloridos para decoração de festas.' },
  { id: 2, name: 'Painel Festa', price: 89.9, image: 'https://via.placeholder.com/240x240?text=Painel', category: 'paineis', description: 'Painel decorativo para festas, fácil de montar.' },
  { id: 3, name: 'Mesa Provençal', price: 59.9, image: 'https://via.placeholder.com/240x240?text=Mesa', category: 'mesas', description: 'Mesa provençal branca para doces e lembrancinhas.' },
  { id: 4, name: 'Suporte de Doces', price: 19.9, image: 'https://via.placeholder.com/240x240?text=Suporte', category: 'suportes', description: 'Suporte elegante para doces e cupcakes.' },
];

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => String(p.id) === String(productId));

  if (!product) return <div style={{ padding: 32 }}><Text size="5">Produto não encontrado.</Text></div>;

  return (
    <Flex direction="column" align="center" justify="center" style={{ minHeight: '60vh', padding: 32 }}>
      <Card size="4" style={{ maxWidth: 400, width: '100%', padding: 32, boxShadow: '0 2px 16px #0001' }}>
        <Flex direction="column" align="center" gap="4">
          <img src={product.image} alt={product.name} style={{ width: 180, height: 180, objectFit: 'cover', borderRadius: 16, marginBottom: 16 }} />
          <Text size="6" weight="bold" align="center">{product.name}</Text>
          <Text size="4" color="iris" align="center" style={{ margin: '8px 0' }}>R$ {product.price.toFixed(2)}</Text>
          <Text size="3" color="gray" align="center" style={{ marginBottom: 16 }}>{product.description}</Text>
          <Button color="iris" size="4" style={{ width: '100%' }} onClick={() => alert('Adicionar ao carrinho (implementar logic)')}>Adicionar ao Carrinho</Button>
          <Button variant="soft" color="gray" size="3" style={{ width: '100%', marginTop: 8 }} onClick={() => navigate(-1)}>Voltar</Button>
        </Flex>
      </Card>
    </Flex>
  );
};

export default ProductDetail;
