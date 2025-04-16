import * as React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@radix-ui/react-tabs';

const categories = [
  { label: 'Todos', value: 'all' },
  { label: 'Balões', value: 'baloes' },
  { label: 'Painéis', value: 'paineis' },
  { label: 'Mesas', value: 'mesas' },
  { label: 'Suportes', value: 'suportes' },
  { label: 'Flores', value: 'flores' },
];

const tabListStyle = {
  display: 'flex',
  gap: 8,
  justifyContent: 'center',
  margin: '16px 0',
  flexWrap: 'wrap',
  padding: '0 4px'
};

const triggerBase = {
  padding: '8px 16px',
  borderRadius: 12,
  border: '1.5px solid #e0e0e0',
  background: '#fff',
  color: '#222',
  fontWeight: 600,
  fontSize: 15,
  cursor: 'pointer',
  transition: 'all 0.18s',
  margin: '4px 2px'
};

// Ajuste para telas menores via media query
const mobileStyles = window.matchMedia('(max-width: 600px)').matches ? {
  fontSize: 13,
  padding: '6px 12px'
} : {};

const triggerSelected = {
  background: '#635bff',
  color: '#fff',
  border: '1.5px solid #635bff',
  boxShadow: '0 2px 8px #635bff22',
};

export default function Categories({ value, onValueChange }) {
  // Estado para controlar estilos responsivos
  const [isMobile, setIsMobile] = React.useState(window.matchMedia('(max-width: 600px)').matches);

  // Listener para mudanças no tamanho da tela
  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 600px)');
    const handler = (e) => setIsMobile(e.matches);
    
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Estilos combinados baseados no estado mobile
  const getTriggerStyle = (isSelected) => {
    const baseStyle = {
      ...triggerBase,
      ...(isMobile ? mobileStyles : {})
    };
    
    return isSelected ? { ...baseStyle, ...triggerSelected } : baseStyle;
  };

  return (
    <Tabs value={value} onValueChange={onValueChange}>
      <TabsList style={tabListStyle}>
        {categories.map((cat) => (
          <TabsTrigger
            key={cat.value}
            value={cat.value}
            style={getTriggerStyle(value === cat.value)}
          >
            {cat.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
