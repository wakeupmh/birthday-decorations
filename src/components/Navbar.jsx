import * as React from 'react';
import { Flex, Box, Text, Button, Avatar, IconButton, Badge } from '@radix-ui/themes';
import { BackpackIcon } from '@radix-ui/react-icons';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import { useNavigate } from 'react-router-dom';

export default function Navbar({ onCartClick }) {
  const navigate = useNavigate();
  return (
    <Box as="header" px="4" py="3" style={{ borderBottom: '1px solid #eee', background: '#fff', position: 'sticky', top: 0, zIndex: 10 }}>
      <Flex align="center" justify="between">
        <Flex align="center" gap="3">
          <Avatar fallback="TD" size="3" radius="full" />
          <Text size="5" weight="bold" style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>Leonels Decorações</Text>
        </Flex>
        <Flex align="center" gap="4">
          <Button variant="ghost" onClick={() => navigate('/')}>Início</Button>
          <Button variant="ghost" onClick={() => navigate('/pegue-e-monte')}>Pegue e Monte</Button>
          <Button variant="ghost" onClick={() => navigate('/produtos')}>Produtos</Button>
          <Button variant="ghost" onClick={() => navigate('/contato')}>Contato</Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="soft">Entrar</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => navigate('/login')}>Login</DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/cadastrar')}>Cadastrar</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <IconButton onClick={() => navigate('/carrinho')} variant="soft" radius="full" size="3" aria-label="Carrinho">
            <BackpackIcon />
            <Badge color="red" style={{ position: 'absolute', top: 4, right: 4, fontSize: 10 }}>2</Badge>
          </IconButton>
        </Flex>
      </Flex>
    </Box>
  );
}
