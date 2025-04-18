// @ts-check
/**
 * @typedef NavbarProps
 * @property {() => void} onCartClick - callback when cart icon clicked
 * @property {number=} cartCount - number of items in cart
 */
/**
 * @param {NavbarProps} props
 */
import * as React from 'react';
import { Flex, Box, Text, Button, Avatar, IconButton, Badge } from '@radix-ui/themes';
import { BackpackIcon } from '@radix-ui/react-icons';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import { useNavigate } from 'react-router-dom';

export default function Navbar({ onCartClick, cartCount = 0 }) {
  const navigate = useNavigate();
  return (
    <Box as="header" px="4" py="3" style={{ borderBottom: '1px solid #eee', background: '#fff', position: 'sticky', top: 0, zIndex: 10 }}>
      <Flex align="center" justify="between" gap={{ initial: '3', sm: '5' }} wrap={{ initial: 'wrap', sm: 'nowrap' }}>
        <Flex align="center" gap="3">
          <Avatar fallback="TD" size="3" radius="full" />
          <Text size={{ initial: '4', sm: '5' }} weight="bold" style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>Leonels Decorações</Text>
        </Flex>
        {/* Container interno para links e botões para permitir quebra de linha apenas neles */}
        <Flex align="center" gap={{ initial: '2', sm: '4' }} wrap={{ initial: 'wrap', sm: 'nowrap' }} justify={{ initial: 'center', sm: 'end' }} style={{ flexGrow: 1 }}>
          <Button variant="ghost" onClick={() => navigate('/')}>Início</Button>
          <Button variant="ghost" onClick={() => navigate('/produtos')}>Produtos</Button>
          <Button variant="ghost" onClick={() => navigate('/contato')}>Contato</Button>
          <Button variant="ghost" onClick={() => navigate('/new-kit')}>Novo Kit</Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="soft">Entrar</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => navigate('/login')}>Login</DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/cadastrar')}>Cadastrar</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Box style={{ position: 'relative' }}>
            <IconButton onClick={() => navigate('/carrinho')} variant="soft" radius="full" size="3" aria-label="Carrinho">
              <BackpackIcon />
              {cartCount > 0 && (
                <Badge color="red" style={{ position: 'absolute', top: -6, right: -6, fontSize: 12, minWidth: 18, height: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 10, padding: 0 }}>
                  {cartCount}
                </Badge>
              )}
            </IconButton>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}
