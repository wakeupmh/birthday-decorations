import * as React from 'react';
import { ToastProvider, ToastViewport, Toast, ToastTitle, ToastDescription } from '@radix-ui/react-toast';

export const ToasterContext = React.createContext(null);

export default function ToasterProvider({ children }) {
  const [toast, setToast] = React.useState(null);

  function showToast({ title, description, duration = 3500 }) {
    setToast({ title, description });
    setTimeout(() => setToast(null), duration);
  }

  return (
    <ToasterContext.Provider value={{ showToast }}>
      <ToastProvider label="Notificações" swipeDirection="right">
        {children}
        <ToastViewport style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 999 }} />
        {toast && (
          <Toast open>
            <ToastTitle>{toast.title}</ToastTitle>
            {toast.description && <ToastDescription>{toast.description}</ToastDescription>}
          </Toast>
        )}
      </ToastProvider>
    </ToasterContext.Provider>
  );
}
