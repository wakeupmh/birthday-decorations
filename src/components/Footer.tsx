import * as React from 'react';
import { Flex, Text, Separator, Box } from '@radix-ui/themes';

export default function Footer() {
  return (
    <Box as="footer" py={{ initial: '3', sm: '4' }} mt="6" style={{ borderTop: '1px solid #eee', background: '#fff' }}>
      <Flex direction="column" align="center" gap="2">
        <Separator size="4" />
        <Text size={{ initial: '1', sm: '2' }}>{new Date().getFullYear()} Leonels Decorações. Todos os direitos reservados.</Text>
        <Text size={{ initial: '1', sm: '2' }}>Contato: contato@leonelsdecoracoes.com.br</Text>
        <Flex gap="4" mt="1" justify="center" wrap="wrap">
          <a href="#">instagram</a>
          <a href="#">whatsapp</a>
          <a href="#">facebook</a>
        </Flex>
      </Flex>
    </Box>
  );
}
