import * as React from 'react';
import { Card, Flex, Text, Button } from '@radix-ui/themes';
import { useNavigate } from 'react-router-dom';

export const products = [
  // Balões
  { id: 1, name: 'Kit Balão Colorido', price: 49.9, image: 'https://via.placeholder.com/120x120?text=Balão', category: 'baloes', description: 'Kit com 50 balões coloridos para decoração de festas.' },
  { id: 5, name: 'Balões Metalizados', price: 39.9, image: 'https://via.placeholder.com/120x120?text=Balão+M', category: 'baloes', description: 'Conjunto de balões metalizados em cores vibrantes.' },
  { id: 6, name: 'Balões Personalizados', price: 59.9, image: 'https://via.placeholder.com/120x120?text=Balão+P', category: 'baloes', description: 'Balões com estampas personalizadas para temas específicos.' },
  
  // Painéis
  { id: 2, name: 'Painel Festa', price: 89.9, image: 'https://via.placeholder.com/120x120?text=Painel', category: 'paineis', description: 'Painel decorativo para festas, fácil de montar.' },
  { id: 7, name: 'Painel 3D', price: 129.9, image: 'https://via.placeholder.com/120x120?text=Painel+3D', category: 'paineis', description: 'Painel tridimensional com efeitos especiais para festas temáticas.' },
  
  // Mesas
  { id: 3, name: 'Mesa Provençal', price: 59.9, image: 'https://via.placeholder.com/120x120?text=Mesa', category: 'mesas', description: 'Mesa provençal branca para doces e lembrancinhas.' },
  { id: 8, name: 'Mesa Rústica', price: 79.9, image: 'https://via.placeholder.com/120x120?text=Mesa+R', category: 'mesas', description: 'Mesa em estilo rústico para decoração de festas.' },
  { id: 9, name: 'Mesa Infantil', price: 49.9, image: 'https://via.placeholder.com/120x120?text=Mesa+I', category: 'mesas', description: 'Mesa colorida para festas infantis.' },
  
  // Suportes
  { id: 4, name: 'Suporte de Doces', price: 19.9, image: 'https://via.placeholder.com/120x120?text=Suporte', category: 'suportes', description: 'Suporte elegante para doces e cupcakes.' },
  { id: 10, name: 'Suporte para Bolo', price: 29.9, image: 'https://via.placeholder.com/120x120?text=Suporte+B', category: 'suportes', description: 'Suporte especial para bolos de múltiplas camadas.' },
  
  // Flores
  { id: 11, name: 'Arranjo Floral', price: 69.9, image: 'https://via.placeholder.com/120x120?text=Flores', category: 'flores', description: 'Arranjo de flores artificiais para decoração de mesas.' },
  { id: 12, name: 'Guirlanda Floral', price: 45.9, image: 'https://via.placeholder.com/120x120?text=Guirlanda', category: 'flores', description: 'Guirlanda decorativa com flores para entrada ou paredes.' },
  { id: 13, name: 'Centro de Mesa Floral', price: 35.9, image: 'https://via.placeholder.com/120x120?text=Centro', category: 'flores', description: 'Centro de mesa com flores artificiais para decoração.' },
];

export default function ProductList({ onAdd, category, products: customProducts }) {
  const navigate = useNavigate();
  // Se customProducts for fornecido, use-o; caso contrário, use a lista padrão
  const productsToUse = customProducts || products;
  const filtered = category === 'all' ? productsToUse : productsToUse.filter(p => p.category === category);

  function handleCardClick(product) {
    navigate(`/produto/${product.id}`);
  }

  return (
    <>
      <Flex gap={{ initial: '2', sm: '4' }} wrap="wrap" py={{ initial: '2', sm: '4' }} justify="center" style={{ 
        maxWidth: '100%', 
        margin: '0 auto',
        overflow: 'hidden',
        width: '100%'
      }}>
        {filtered.map((product) => (
          <Card
            key={product.id}
            size="2"
            className="product-card"
            style={{
              cursor: 'pointer',
            }}
            onClick={() => handleCardClick(product)}
          >
            <Flex direction="column" align="center" gap="2">
              <img src={product.image} alt={product.name} style={{ width: '80%', maxWidth: 100, height: 'auto', aspectRatio: '1/1', objectFit: 'cover', borderRadius: 12, marginBottom: 8 }} />
              <Text size={{ initial: '3', sm: '4' }} weight="bold" align="center">{product.name}</Text>
              <Text size={{ initial: '2', sm: '3' }} color="iris" align="center">R$ {product.price.toFixed(2)}</Text>
              <Button
                variant="solid"
                color="iris"
                radius="large"
                size={{ initial: '2', sm: '3' }}
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
