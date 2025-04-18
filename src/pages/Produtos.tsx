import React from 'react';
import Categories from '../components/Categories';
import ProductList from '../components/ProductList';
import { Container } from '@radix-ui/themes';

export default function Produtos() {
  const [category, setCategory] = React.useState('all');
  // Lógica de adicionar ao carrinho pode ser implementada aqui, se desejar
  function handleAddToCart(product) {
    // Exemplo: alert(`Adicionado: ${product.name}`);
  }

  return (
    <Container size="3" py="4">
      <Categories value={category} onValueChange={setCategory} />
      <ProductList onAdd={handleAddToCart} category={category} />
    </Container>
  );
}
