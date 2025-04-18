import React from 'react';
import { Card, Flex, Text } from '@radix-ui/themes';

export default function Cadastrar() {
  return (
    <Flex direction="column" align="center" justify="center" style={{ minHeight: '60vh', padding: 32 }}>
      <Card size="4" style={{ maxWidth: 400, width: '100%', padding: 32, boxShadow: '0 2px 16px #0001' }}>
        <Text size="6" weight="bold" align="center" style={{ marginBottom: 16 }}>Cadastrar</Text>
        <Text size="4" align="center">Crie sua conta para aproveitar todos os benefícios!</Text>
      </Card>
    </Flex>
  );
}
