import React from 'react';
import { Card, Flex, Text, Button, Separator } from '@radix-ui/themes';

const Cart = ({ items = [], onRemove, onCheckout }) => {
  const total = items.reduce((sum, item) => sum + (item.price || 0), 0);

  return (
    <Flex direction="column" align="center" style={{ minHeight: '60vh', padding: 32 }}>
      <Card size="4" style={{ maxWidth: 500, width: '100%', padding: 32, boxShadow: '0 2px 16px #0001' }}>
        <Text as="h1" size="6" weight="bold" align="center" style={{ marginBottom: 16 }}>
          Seu Carrinho
        </Text>
        {items.length === 0 ? (
          <Text as="p" size="4" color="gray" align="center" style={{ marginBottom: 8 }}>
            Seu carrinho está vazio.
          </Text>
        ) : (
          <>
            <Flex direction="column" gap="3" style={{ marginBottom: 16 }}>
              {items.map((item, idx) => (
                <Flex key={idx} align="center" justify="between" style={{ borderBottom: '1px solid #eee', padding: '12px 0' }}>
                  <Flex align="center" gap="3">
                    <img src={item.image} alt={item.name} style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 8 }} />
                    <div>
                      <Text size="4" weight="bold">{item.name}</Text>
                      <Text size="3" color="gray">R$ {item.price.toFixed(2)}</Text>
                    </div>
                  </Flex>
                  <Button variant="soft" color="red" size="2" onClick={() => onRemove && onRemove(item)}>Remover</Button>
                </Flex>
              ))}
            </Flex>
            <Separator my="3" />
            <Flex align="center" justify="between" style={{ margin: '16px 0' }}>
              <Text size="4" weight="bold">Total:</Text>
              <Text size="5" color="iris" weight="bold">R$ {total.toFixed(2)}</Text>
            </Flex>
            <Button color="iris" size="4" style={{ width: '100%', marginTop: 16 }} onClick={onCheckout}>Finalizar Pedido</Button>
          </>
        )}
      </Card>
    </Flex>
  );
};

export default Cart;
