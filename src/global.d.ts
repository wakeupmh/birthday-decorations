// Ambient declarations for various assets and modules

declare module '*.css';
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

// Module augmentation to allow children on CheckboxCards.Root
import * as React from 'react';
import '@radix-ui/themes';
declare module '@radix-ui/themes' {
  interface CheckboxCardsRootProps {
    children?: React.ReactNode;
  }
}
