import React from 'react';
import { Flex, Box, Text, Card, Heading, Separator, Button, Tabs, Badge, CheckboxCards } from '@radix-ui/themes';
import Categories from '../components/Categories';
import { products as availableProducts } from '../components/ProductList';

export default function PegueMonte({ kitItems = [], onAddItem, onRemoveItem, onFinalizeKit, onClearKit, category, setCategory }) {
  
  // Estado para controlar a aba ativa no mobile
  const [activeTab, setActiveTab] = React.useState('catalog');
  
  // Calcula o total do kit
  const totalKit = kitItems.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);
  
  // Filtra os produtos disponíveis baseado na categoria selecionada
  const filteredProducts = category === 'all' 
    ? availableProducts 
    : availableProducts.filter(p => p.category === category);

  return (
    <Box p="4">
      {/* Título principal */}
      <Heading size="6" mb="4" align="center">Monte seu Kit</Heading>
      
      {/* Tabs para navegação mobile */}
      <Box className="mobile-only" style={{ marginBottom: '16px' }}>
        <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
          <Tabs.List style={{ width: '100%' }}>
            <Tabs.Trigger value="catalog" style={{ flex: 1 }}>
              Catálogo
            </Tabs.Trigger>
            <Tabs.Trigger value="kit" style={{ flex: 1 }}>
              Seu Kit {kitItems.length > 0 && (
                <Badge color="iris" variant="solid" style={{ marginLeft: '8px' }}>
                  {kitItems.length}
                </Badge>
              )}
            </Tabs.Trigger>
          </Tabs.List>
        </Tabs.Root>
      </Box>

      {/* Layout responsivo: coluna única em mobile, duas colunas em desktop */}
      <Flex 
        direction={{ initial: 'column', md: 'row' }} 
        gap="5"
        style={{ minHeight: '70vh' }}
      >
        
        {/* Coluna Esquerda: Catálogo */}
        <Box 
          style={{ 
            flex: 2,
            display: activeTab === 'catalog' ? 'flex' : 'none',
            flexDirection: 'column',
            height: '100%',
          }}
          className="desktop-always-show"
        >
          <Categories value={category} onValueChange={setCategory} />
          <Separator my="4" />
          <Box
            py={{ initial: '2', sm: '4' }}
            style={{
              flex: 1,
              minHeight: 0,
              width: '100%',
            }}
          >
            <CheckboxCards.Root
              value={kitItems.map(item => item.id.toString())}
              onValueChange={(values) => {
                const newIds = values.map(v => parseInt(v, 10));
                // Items added
                newIds.filter(id => !kitItems.some(item => item.id === id))
                  .forEach(id => {
                    const product = availableProducts.find(p => p.id === id);
                    if (product) onAddItem(product);
                  });
                // Items removed
                kitItems.filter(item => !newIds.includes(item.id))
                  .forEach(item => onRemoveItem(item));
              }}
              size="3"
              variant="surface"
              color="iris"
              columns="repeat(3, 1fr)"
              gap="4"
            >
              {filteredProducts.map(product => (
                <CheckboxCards.Item
                  key={product.id}
                  value={product.id.toString()}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 16, paddingTop: 24, gap: 8 }}
                >
                  <img src={product.image} alt={product.name} style={{ width: '80%', maxWidth: 100, height: 'auto', aspectRatio: '1/1', objectFit: 'cover', borderRadius: 12, marginBottom: 8 }} />
                  <Text size={{ initial: '3', sm: '4' }} weight="bold" align="center">{product.name}</Text>
                  <Text size={{ initial: '2', sm: '3' }} color="iris" align="center">R$ {product.price.toFixed(2)}</Text>
                </CheckboxCards.Item>
              ))}
            </CheckboxCards.Root>
          </Box>
        </Box>

        {/* Coluna Direita: Seu Kit */}
        <Box 
          style={{ 
            flex: 1, 
            minWidth: '280px',
            minHeight: '240px',
            overflowY: 'auto',
            display: activeTab === 'kit' ? 'block' : 'none'
          }}
          className="desktop-always-show"
        >
          <Card size="2" style={{ height: '100%', minHeight: '240px', maxHeight: '70vh', display: 'flex', flexDirection: 'column' }}>
            <Heading size="5" mb="4">Seu Kit Atual</Heading>
            
            {kitItems.length === 0 ? (
              <Text color="gray" align="center" style={{ marginTop: '24px', marginBottom: '24px' }}>
                Adicione itens do catálogo ao seu kit.
              </Text>
            ) : (
              <Box style={{ flex: 1, overflowY: 'auto' }}>
                {kitItems.map((item) => (
                  <Card key={item.id} style={{ marginBottom: '12px' }}>
                    <Flex align="center" gap="3">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        style={{ 
                          width: '60px', 
                          height: '60px', 
                          borderRadius: '8px',
                          objectFit: 'cover'
                        }} 
                      />
                      <Box style={{ flex: 1, minWidth: 0 }}>
                        <Text weight="bold" style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>{item.name}</Text>
                        <Flex justify="between" align="center" style={{ marginTop: '4px' }}>
                          <Text size="2" color="iris">R$ {item.price.toFixed(2)}</Text>
                          <Button 
                            color="red" 
                            variant="soft" 
                            size="1"
                            onClick={() => onRemoveItem(item)}
                          >
                            Remover
                          </Button>
                        </Flex>
                      </Box>
                    </Flex>
                  </Card>
                ))}
              </Box>
            )}
            
            <Separator my="4" />
            
            <Flex justify="between" align="center" mb="4">
              <Heading size="4">Total do Kit:</Heading>
              <Heading size="5" color="iris">R$ {totalKit.toFixed(2)}</Heading>
            </Flex>
            
            <Button size="3" color="iris" style={{ width: '100%', marginTop: '16px' }} onClick={onFinalizeKit}>
              Finalizar Kit
            </Button>
            
            <Button size="2" variant='ghost' color='gray' style={{ width: '100%', marginTop: '8px' }} onClick={onClearKit}>
              Limpar Kit
            </Button>
          </Card>
        </Box>
      </Flex>
      
      {/* CSS para controlar a exibição em desktop vs mobile */}
      <style>{`
        @media (min-width: 768px) {
          .mobile-only {
            display: none;
          }
          .desktop-always-show {
            display: block !important;
          }
        }
      `}</style>
    </Box>
  );
}
