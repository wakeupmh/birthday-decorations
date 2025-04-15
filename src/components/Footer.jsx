import * as React from 'react';
import { Flex, Text, Separator, Box } from '@radix-ui/themes';

export default function Footer() {
  return (
    <Box as="footer" py="4" mt="6" style={{ borderTop: '1px solid #eee', background: '#fff' }}>
      <Flex direction="column" align="center" gap="2">
        <Separator size="4" />
        <Text size="2">© {new Date().getFullYear()} Leonels Decorações. Todos os direitos reservados.</Text>
        <Text size="2">Contato: contato@Leonelsdecoracoes.com.br</Text>
        <Flex gap="4" mt="1">
          <a href="#">Instagram</a>
          <a href="#">WhatsApp</a>
          <a href="#">Facebook</a>
        </Flex>
      </Flex>
    </Box>
  );
}
