import React from 'react';
import { Card, Flex, Text, Button } from '@radix-ui/themes';

export default function PegueMonte() {
  return (
    <Flex direction="column" align="center" justify="center" style={{ minHeight: '70vh', padding: 32 }}>
      <Card size="5" style={{ maxWidth: 600, width: '100%', padding: 40, boxShadow: '0 4px 24px #0002', borderRadius: 20 }}>
        <Text size="7" weight="bold" align="center" style={{ marginBottom: 12, display: 'block' }}>
          Pegue e Monte
        </Text>
        <Text size="4" align="center" color="gray" style={{ marginBottom: 24, display: 'block' }}>
          Monte sua decoração do seu jeito! Escolha os itens, personalize e faça seu pedido.
        </Text>
        {/* Exemplo de botão de ação, pode ser removido se não quiser */}
        <Flex justify="center">
          <Button color="iris" size="4" style={{ minWidth: 200 }}>
            Começar a Montar
          </Button>
        </Flex>
      </Card>
    </Flex>
  );
}
