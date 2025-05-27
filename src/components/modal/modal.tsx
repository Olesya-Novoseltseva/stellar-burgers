import { FC, memo, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { TModalProps } from './type';
import { ModalUI } from '@ui';

export const Modal: FC<TModalProps> = memo(({ title, onClose, children }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  const modalRoot = document.getElementById('modals');

  return modalRoot
    ? ReactDOM.createPortal(
        <ModalUI title={title} onClose={onClose}>
          {children}
        </ModalUI>,
        modalRoot
      )
    : null;
});
