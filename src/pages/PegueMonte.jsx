import React from 'react';
import { Flex, Box, Text, Card, Heading, Separator, Button, Tabs, Badge } from '@radix-ui/themes';
import Categories from '../components/Categories';
import ProductList, { products as availableProducts } from '../components/ProductList';

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
            display: activeTab === 'catalog' ? 'block' : 'none'
          }}
          className="desktop-always-show"
        >
          <Categories value={category} onValueChange={setCategory} />
          <Separator my="4" />
          <Flex gap={{ initial: '2', sm: '4' }} wrap="wrap" py={{ initial: '2', sm: '4' }} justify="center" style={{ 
            maxWidth: '100%', 
            margin: '0 auto',
            overflow: 'hidden',
            width: '100%'
          }}>
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                size="2"
                className="product-card"
                style={{
                  cursor: 'pointer',
                }}
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
                    onClick={() => onAddItem(product)}
                  >Adicionar ao Kit</Button>
                </Flex>
              </Card>
            ))}
          </Flex>
        </Box>

        {/* Coluna Direita: Seu Kit */}
        <Box 
          style={{ 
            flex: 1, 
            minWidth: '280px',
            display: activeTab === 'kit' ? 'block' : 'none'
          }}
          className="desktop-always-show"
        >
          <Card size="2" style={{ height: '100%' }}>
            <Heading size="5" mb="4">Seu Kit Atual</Heading>
            
            {kitItems.length === 0 ? (
              <Text color="gray" align="center" style={{ marginTop: '24px', marginBottom: '24px' }}>
                Adicione itens do catálogo ao seu kit.
              </Text>
            ) : (
              <Box>
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
                      <Box style={{ flex: 1 }}>
                        <Text weight="bold">{item.name}</Text>
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
      <style jsx>{`
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
