import * as React from 'react';
import { Box, Heading, Button, CheckboxCards, Text, Separator } from '@radix-ui/themes';
import { products as availableProducts } from '../components/ProductList';
import { ToasterContext } from '../components/Toaster';

export default function NewKit() {
  const [kitName, setKitName] = React.useState('');
  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);
  const toaster = React.useContext(ToasterContext);

  function handleSave() {
    if (!kitName.trim()) {
      toaster?.showToast({ title: 'Nome requerido', description: 'Digite um nome para o novo kit.', color: 'red' });
      return;
    }
    toaster?.showToast({ title: 'Kit criado', description: `Kit "${kitName}" com ${selectedIds.length} itens.` });
    // TODO: persist new kit
    setKitName('');
    setSelectedIds([]);
  }

  return (
    <Box p="4">
      <Heading size="6" mb="4">Criar Novo Kit</Heading>
      <input
        type="text"
        placeholder="Nome do kit"
        value={kitName}
        onChange={e => setKitName(e.target.value)}
        style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc', marginBottom: '16px' }}
      />
      <Heading size="5" mb="2">Selecione Itens</Heading>
      <Separator mb="3" />
      <Box style={{ maxHeight: '50vh', overflowY: 'auto' }} mb="4">
        <CheckboxCards.Root
          value={selectedIds}
          onValueChange={ids => setSelectedIds(ids)}
          size="3"
          variant="surface"
          color="iris"
          columns="repeat(auto-fit, minmax(200px, 1fr))"
          gap="4"
        >
          {availableProducts.map(product => (
            <CheckboxCards.Item
              key={product.id}
              value={product.id.toString()}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 16 }}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{ width: '80%', maxWidth: 100, objectFit: 'cover', borderRadius: 8, marginBottom: 8 }}
              />
              <Text weight="bold" align="center">{product.name}</Text>
              <Text color="iris" align="center">R$ {product.price.toFixed(2)}</Text>
            </CheckboxCards.Item>
          ))}
        </CheckboxCards.Root>
      </Box>
      <Button size="3" color="iris" onClick={handleSave}>
        Salvar Kit
      </Button>
    </Box>
  );
}
