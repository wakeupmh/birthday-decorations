import React from 'react';
import { Card, Flex, Text } from '@radix-ui/themes';

export default function Contato() {
  return (
    <Flex direction="column" align="center" justify="center" style={{ minHeight: '60vh', padding: 32 }}>
      <Card size="4" style={{ maxWidth: 700, width: '100%', padding: 32, boxShadow: '0 2px 16px #0001' }}>
        <Text as="h1" size="5" weight="bold" style={{ marginBottom: 12 }}>
          Contato
        </Text>
        <Text as="p" size="3" style={{ marginBottom: 16 }}>
          Entre em contato conosco para dúvidas, orçamentos ou parcerias!
        </Text>
        <Text as="p" size="3" color="gray" style={{ lineHeight: 1.6 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </Text>
      </Card>
    </Flex>
  );
}
