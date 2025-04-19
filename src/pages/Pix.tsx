import * as React from 'react';
import { Box, Heading, Text, Button } from '@radix-ui/themes';
import { useLocation } from 'react-router-dom';

export default function Pix() {
  // Get last sale from localStorage
  const sales = JSON.parse(localStorage.getItem('sales') || '[]');
  const sale = sales[sales.length - 1] || {};
  const amount = sale.totalValue?.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) || '0,00';
  const pixData = `Pagamento PIX de R$ ${amount}`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(pixData)}`;

  // WhatsApp proof link
  const whatsappNumber = '5512988696495';
  const waMessage = `Olá, envio comprovante do pedido ${sale.id} no valor R$ ${amount}`;
  const waLink = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(waMessage)}`;

  return (
    <Box p="4" style={{ textAlign: 'center' }}>
      <Heading size="4" mb="4">Pagamento PIX</Heading>
      <img src={qrUrl} alt="QR Code PIX" style={{ width: 250, height: 250, marginBottom: '1rem' }} /><br></br>
      <Text mb="2">Valor: R$ {amount}.</Text><br></br>
      <Text>Escaneie o QR Code para efetuar o pagamento via PIX.</Text>
      <Box mt="4">
        <Button asChild variant="soft" radius="full" size="3">
          <a href={waLink} target="_blank" rel="noopener noreferrer">Enviar comprovante via WhatsApp</a>
        </Button>
      </Box>
    </Box>
  );
}
