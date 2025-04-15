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
  gap: 12,
  justifyContent: 'center',
  margin: '24px 0',
};

const triggerBase = {
  padding: '12px 28px',
  borderRadius: 12,
  border: '1.5px solid #e0e0e0',
  background: '#fff',
  color: '#222',
  fontWeight: 600,
  fontSize: 17,
  cursor: 'pointer',
  transition: 'all 0.18s',
};

const triggerSelected = {
  background: '#635bff',
  color: '#fff',
  border: '1.5px solid #635bff',
  boxShadow: '0 2px 8px #635bff22',
};

export default function Categories({ value, onValueChange }) {
  return (
    <Tabs value={value} onValueChange={onValueChange}>
      <TabsList style={tabListStyle}>
        {categories.map((cat) => (
          <TabsTrigger
            key={cat.value}
            value={cat.value}
            style={value === cat.value
              ? { ...triggerBase, ...triggerSelected }
              : triggerBase}
          >
            {cat.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
