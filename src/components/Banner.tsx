import * as React from 'react';
import { Card, Flex, Heading, Text, Button } from '@radix-ui/themes';

export default function Banner() {
  return (
    <Card size="4" style={{ background: 'linear-gradient(90deg, #fbeee6 60%, #fff 100%)', minHeight: 220, margin: '32px 0', boxShadow: '0 4px 24px #0001', borderRadius: 24, padding: '32px 16px', maxWidth: 900, width: '100%', marginLeft: 'auto', marginRight: 'auto' }}>
      <Flex direction="column" align="center" justify="center" gap="4">
        <Heading size="7" align="center" style={{ marginBottom: 8 }}>
          Monte sua Festa dos Sonhos!
        </Heading>
        <Text size="4" align="center" style={{ marginBottom: 18 }}>
          Escolha, combine e personalize os itens de decoração para criar um cenário único e inesquecível.
        </Text>
        <Button size="3" color="iris" style={{ minWidth: 180 }}>Comece agora</Button>
      </Flex>
    </Card>
  );
}
