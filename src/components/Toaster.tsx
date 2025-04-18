import * as React from 'react';
import * as ToastPrimitive from '@radix-ui/react-toast';
import { Cross2Icon } from '@radix-ui/react-icons';

export const ToasterContext = React.createContext(null);

export default function ToasterProvider({ children }) {
  const [open, setOpen] = React.useState(false);
  const [toastInfo, setToastInfo] = React.useState({ title: '', description: '' });
  const timerRef = React.useRef(0);

  React.useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  function showToast({ title, description, duration = 3500 }) {
    setOpen(false); // Fecha qualquer toast anterior
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      setToastInfo({ title, description });
      setOpen(true);
    }, 100); // Pequeno delay para re-trigger de animação

    // Auto-fechar após duração
    window.setTimeout(() => {
      setOpen(false);
    }, duration + 100); // +100 para compensar o delay
  }

  return (
    <ToasterContext.Provider value={{ showToast }}>
      <ToastPrimitive.Provider swipeDirection="right">
        {children}
        <ToastPrimitive.Viewport className="ToastViewport" />
        <ToastPrimitive.Root
          className="ToastRoot"
          open={open}
          onOpenChange={setOpen}
          style={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            zIndex: 10000,
            backgroundColor: 'white',
            borderRadius: 6,
            boxShadow: 'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
            padding: 15,
            display: 'grid',
            gridTemplateAreas: '"title action" "description action"',
            gridTemplateColumns: 'auto max-content',
            columnGap: 15,
            alignItems: 'center',
          }}
        >
          <ToastPrimitive.Title className="ToastTitle" style={{ gridArea: 'title', marginBottom: 5, fontWeight: 500, color: '#111', fontSize: 15 }}>
            {toastInfo.title}
          </ToastPrimitive.Title>
          <ToastPrimitive.Description className="ToastDescription" style={{ gridArea: 'description', margin: 0, color: '#555', fontSize: 13, lineHeight: 1.3 }}>
            {toastInfo.description}
          </ToastPrimitive.Description>
          <ToastPrimitive.Close className="ToastAction" asChild aria-label="Fechar">
            <button style={{ gridArea: 'action', background: 'none', border: 'none', cursor: 'pointer' }}><Cross2Icon /></button>
          </ToastPrimitive.Close>
        </ToastPrimitive.Root>
      </ToastPrimitive.Provider>
    </ToasterContext.Provider>
  );
}
