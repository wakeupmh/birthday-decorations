import * as React from 'react';
import { Box, Heading, Button, Separator, Tabs, Text, Card, Flex, Badge, DataList } from '@radix-ui/themes';
import { ToasterContext } from '../components/Toaster';
import { products as defaultProducts } from '../components/ProductList';

type Product = { id: string; name: string; price: number; image: string };

export default function Dashboard() {
  const toaster = React.useContext(ToasterContext);
  const [activeTab, setActiveTab] = React.useState<string>('products');
  const [products, setProducts] = React.useState<Product[]>(
    defaultProducts.map(p => ({ id: p.id.toString(), name: p.name, price: p.price, image: p.image }))
  );
  const [name, setName] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [imageUrl, setImageUrl] = React.useState('');

  // Mock sales data if none in localStorage
  const mockSales = [
    { id: 'demo1', date: '2025-04-01 12:00:00', totalItems: 3, totalValue: 120.50, items: [{ id: 'item1', name: 'Item 1', quantity: 2 }, { id: 'item2', name: 'Item 2' }] },
    { id: 'demo2', date: '2025-04-05 14:30:00', totalItems: 2, totalValue: 89.90, items: [{ id: 'item3', name: 'Item 3' }, { id: 'item4', name: 'Item 4' }] },
  ];
  const [sales] = React.useState<any[]>(() => {
    const stored = JSON.parse(localStorage.getItem('sales') || '[]');
    return stored.length > 0 ? stored : mockSales;
  });
  // Pagination for sales
  const [salesPage, setSalesPage] = React.useState(1);
  const salesPerPage = 3;
  const totalSalesPages = Math.ceil(sales.length / salesPerPage);
  const paginatedSales = sales.slice((salesPage - 1) * salesPerPage, salesPage * salesPerPage);

  // Pagination for existing items
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const paginatedProducts = products.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  function handleAddProduct() {
    if (!name.trim()) {
      toaster?.showToast({ title: 'Nome requerido', description: 'Digite um nome para o item.', color: 'red' });
      return;
    }
    const newProd: Product = {
      id: Date.now().toString(),
      name,
      price: parseFloat(price) || 0,
      image: imageUrl
    };
    setProducts(prev => [...prev, newProd]);
    toaster?.showToast({ title: 'Item adicionado', description: `${name} foi criado.` });
    setName('');
    setPrice('');
    setImageUrl('');
  }

  const [bannerText, setBannerText] = React.useState('');
  const [bannerImage, setBannerImage] = React.useState('');
  function handleSaveBanner() {
    toaster?.showToast({ title: 'Banner atualizado', description: 'Banner atualizado com sucesso.' });
  }

  const [contactInfo, setContactInfo] = React.useState('');
  function handleSaveContact() {
    toaster?.showToast({ title: 'Contato atualizado', description: 'Informações de contato atualizadas.' });
  }

  return (
    <Box p="4">
      <Heading size="5" mb="4">Painel de Controle</Heading>
      <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
        <Tabs.List style={{ marginBottom: 16 }}>
          <Tabs.Trigger value="products">Itens</Tabs.Trigger>
          <Tabs.Trigger value="banner">Banner</Tabs.Trigger>
          <Tabs.Trigger value="contact">Contato</Tabs.Trigger>
          <Tabs.Trigger value="sales">Vendas</Tabs.Trigger>
        </Tabs.List>

        {activeTab === 'products' && (
          <Box>
            <Heading size="4" mb="2">Novo Item</Heading>
            <Box mb="4">
              <input
                type="text"
                placeholder="Nome do item"
                value={name}
                onChange={e => setName(e.target.value)}
                style={{ width: '100%', marginBottom: 8, padding: 8, border: '1px solid #ccc', borderRadius: 4 }}
              />
              <input
                type="text"
                placeholder="Preço"
                value={price}
                onChange={e => setPrice(e.target.value)}
                style={{ width: '100%', marginBottom: 8, padding: 8, border: '1px solid #ccc', borderRadius: 4 }}
              />
              <input
                type="text"
                placeholder="URL da imagem"
                value={imageUrl}
                onChange={e => setImageUrl(e.target.value)}
                style={{ width: '100%', marginBottom: 8, padding: 8, border: '1px solid #ccc', borderRadius: 4 }}
              />
              <Button onClick={handleAddProduct}>Adicionar Item</Button>
            </Box>
            <Separator mb="4" />
            <Box>
              <Heading size="4" mb="2">Itens Existentes</Heading>
              <Box style={{ overflowX: 'auto', marginBottom: '16px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead style={{ background: '#f5f5f5' }}>
                    <tr>
                      <th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid #ddd' }}>Nome</th>
                      <th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid #ddd' }}>Preço</th>
                      <th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid #ddd' }}>Imagem</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedProducts.map(item => (
                      <tr key={item.id}>
                        <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}><Text>{item.name}</Text></td>
                        <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}><Text>R$ {item.price.toFixed(2)}</Text></td>
                        <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}><img src={item.image} alt={item.name} style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 4 }} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Box>
              {/* Pagination controls */}
              <Flex justify="between" align="center" style={{ marginTop: 8, marginBottom: 16 }}>
                <Button size="2" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Anterior</Button>
                <Text>Pagina {currentPage} de {totalPages}</Text>
                <Button size="2" disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Próximo</Button>
              </Flex>
            </Box>
          </Box>
        )}

        {activeTab === 'banner' && (
          <Box>
            <Heading size="4" mb="2">Editar Banner</Heading>
            <input
              type="text"
              placeholder="Texto do banner"
              value={bannerText}
              onChange={e => setBannerText(e.target.value)}
              style={{ width: '100%', marginBottom: 8, padding: 8, border: '1px solid #ccc', borderRadius: 4 }}
            />
            <input
              type="text"
              placeholder="URL da imagem do banner"
              value={bannerImage}
              onChange={e => setBannerImage(e.target.value)}
              style={{ width: '100%', marginBottom: 8, padding: 8, border: '1px solid #ccc', borderRadius: 4 }}
            />
            <Button onClick={handleSaveBanner}>Salvar Banner</Button>
          </Box>
        )}

        {activeTab === 'contact' && (
          <Box>
            <Heading size="4" mb="2">Editar Contato</Heading>
            <textarea
              placeholder="Informações de contato"
              value={contactInfo}
              onChange={e => setContactInfo(e.target.value)}
              style={{ width: '100%', marginBottom: 8, padding: 8, border: '1px solid #ccc', borderRadius: 4 }}
            />
            <Button onClick={handleSaveContact}>Salvar Contato</Button>
          </Box>
        )}

        {activeTab === 'sales' && (
          <Box>
            <Heading size="4" mb="2">Vendas Realizadas</Heading>
            {sales.length === 0 ? (
              <Text>Nenhuma venda registrada.</Text>
            ) : (
              <>
                <Box style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {paginatedSales.map((sale: any) => (
                    <Box key={sale.id} style={{ padding: 16, border: '1px solid #ddd', borderRadius: 8 }}>
                      <Heading size="5" mb="1">
                        {new Date(sale.date).toLocaleDateString('pt-BR')} {new Date(sale.date).toLocaleTimeString('pt-BR')}
                      </Heading>
                      <DataList.Root orientation="vertical" size="2">
                        <DataList.Item>
                          <DataList.Label>ID</DataList.Label>
                          <DataList.Value>{sale.id}</DataList.Value>
                        </DataList.Item>
                        <DataList.Item>
                          <DataList.Label>Total Itens</DataList.Label>
                          <DataList.Value>{sale.totalItems}</DataList.Value>
                        </DataList.Item>
                        <DataList.Item>
                          <DataList.Label>Valor Total</DataList.Label>
                          <DataList.Value>R$ {sale.totalValue.toFixed(2)}</DataList.Value>
                        </DataList.Item>
                        <DataList.Item>
                          <DataList.Label>Itens</DataList.Label>
                          <DataList.Value>
                            <ul style={{ margin: 0, paddingLeft: 16 }}>
                              {sale.items.map(item => (
                                <li key={item.id}>{item.name} x{item.quantity || 1}</li>
                              ))}
                            </ul>
                          </DataList.Value>
                        </DataList.Item>
                      </DataList.Root>
                    </Box>
                  ))}
                </Box>
                {/* Sales pagination controls */}
                <Flex justify="between" align="center" style={{ marginTop: 8, marginBottom: 16 }}>
                  <Button size="2" disabled={salesPage === 1} onClick={() => setSalesPage(salesPage - 1)}>Anterior</Button>
                  <Text>Pagina {salesPage} de {totalSalesPages}</Text>
                  <Button size="2" disabled={salesPage === totalSalesPages} onClick={() => setSalesPage(salesPage + 1)}>Próximo</Button>
                </Flex>
              </>
            )}
          </Box>
        )}
      </Tabs.Root>
    </Box>
  );
}
