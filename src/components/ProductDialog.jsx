import * as React from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@radix-ui/react-dialog';
import { Button, Flex, Text, Separator, Box } from '@radix-ui/themes';

const galleryStyle = {
  display: 'flex',
  gap: 8,
  justifyContent: 'center',
  marginBottom: 12,
  flexWrap: 'wrap',
};

export default function ProductDialog({ product, open, onOpenChange, onAdd }) {
  if (!product) return null;
  // Exibe apenas a imagem principal do produto
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent maxWidth="420px">
        <DialogTitle>{product.name}</DialogTitle>
        <DialogDescription>{product.description || 'Descrição do produto.'}</DialogDescription>
        <Box style={galleryStyle} mt="2">
          <img src={product.image} alt={product.name} style={{ width: 120, height: 120, objectFit: 'cover', borderRadius: 8, border: '1px solid #eee' }} />
        </Box>
        <Flex direction="column" align="center" gap="2" py="2">
          <Text size="5" color="iris" weight="bold">R$ {product.price.toFixed(2)}</Text>
          <Text size="3" color="gray">Categoria: {product.category}</Text>
        </Flex>
        <Separator my="2" />
        <Text size="2" color="gray">
          Características: Produto de alta qualidade, fácil montagem, ideal para festas infantis e eventos.
        </Text>
        <Button mt="3" color="iris" onClick={() => onAdd(product)}>
          Adicionar ao Carrinho
        </Button>
      </DialogContent>
    </Dialog>
  );
}
