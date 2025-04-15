import * as React from 'react';
import { Card, Flex, Text, Button } from '@radix-ui/themes';
import { useNavigate } from 'react-router-dom';

const products = [
  { id: 1, name: 'Kit Balão Colorido', price: 49.9, image: 'https://via.placeholder.com/120x120?text=Balão', category: 'baloes', description: 'Kit com 50 balões coloridos para decoração de festas.' },
  { id: 2, name: 'Painel Festa', price: 89.9, image: 'https://via.placeholder.com/120x120?text=Painel', category: 'paineis', description: 'Painel decorativo para festas, fácil de montar.' },
  { id: 3, name: 'Mesa Provençal', price: 59.9, image: 'https://via.placeholder.com/120x120?text=Mesa', category: 'mesas', description: 'Mesa provençal branca para doces e lembrancinhas.' },
  { id: 4, name: 'Suporte de Doces', price: 19.9, image: 'https://via.placeholder.com/120x120?text=Suporte', category: 'suportes', description: 'Suporte elegante para doces e cupcakes.' },
];

export default function ProductList({ onAdd, category }) {
  const navigate = useNavigate();
  const filtered = category === 'all' ? products : products.filter(p => p.category === category);

  function handleCardClick(product) {
    navigate(`/produto/${product.id}`);
  }

  return (
    <>
      <Flex gap="4" wrap="wrap" py="4" justify="center" style={{ maxWidth: 1100, margin: '0 auto' }}>
        {filtered.map((product) => (
          <Card
            key={product.id}
            size="2"
            style={{
              width: 260,
              minWidth: 260,
              maxWidth: 260,
              cursor: 'pointer',
              margin: '12px 0',
              boxShadow: '0 2px 12px #0001'
            }}
            onClick={() => handleCardClick(product)}
          >
            <Flex direction="column" align="center" gap="2">
              <img src={product.image} alt={product.name} style={{ width: 120, height: 120, objectFit: 'cover', borderRadius: 12, marginBottom: 8 }} />
              <Text size="4" weight="bold" align="center">{product.name}</Text>
              <Text size="3" color="iris" align="center">R$ {product.price.toFixed(2)}</Text>
              <Button
                variant="solid"
                color="iris"
                radius="large"
                size="3"
                style={{ marginTop: 12 }}
                onClick={(e) => { e.stopPropagation(); onAdd(product); }}
              >Adicionar</Button>
            </Flex>
          </Card>
        ))}
      </Flex>
    </>
  );
}
