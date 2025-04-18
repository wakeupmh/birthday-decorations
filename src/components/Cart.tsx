import * as React from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from '@radix-ui/react-dialog';
import { Button, Flex, Text, Separator } from '@radix-ui/themes';

export default function Cart({ open, onOpenChange, items, onRemove, onCheckout }) {
  const total = items.reduce((sum, item) => sum + item.price, 0);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle>Carrinho</DialogTitle>
        <DialogDescription>Confira seus itens antes de finalizar o pedido.</DialogDescription>
        <Flex direction="column" gap="3" py="2">
          {items.length === 0 ? (
            <Text>Nenhum item no carrinho.</Text>
          ) : (
            items.map((item, idx) => (
              <Flex key={idx} align="center" justify="between" gap="2">
                <Text>{item.name}</Text>
                <Text color="iris">R$ {item.price.toFixed(2)}</Text>
                <Button variant="ghost" color="red" size="1" onClick={() => onRemove(item)}>
                  Remover
                </Button>
              </Flex>
            ))
          )}
        </Flex>
        <Separator my="2" />
        <Flex align="center" justify="between">
          <Text weight="bold">Total:</Text>
          <Text weight="bold" color="iris">R$ {total.toFixed(2)}</Text>
        </Flex>
        <Button mt="3" color="iris" onClick={onCheckout} disabled={items.length === 0}>
          Finalizar Pedido
        </Button>
      </DialogContent>
    </Dialog>
  );
}
