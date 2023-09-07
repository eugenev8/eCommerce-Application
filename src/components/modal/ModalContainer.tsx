import { ReactNode } from 'react';
import Modal from 'react-modal';
import FlexContainer from '../containers/FlexContainer';

import './Modal.scss';

interface ModalContainerProps {
  isOpen: boolean;
  onRequestClose: () => void;
  children: ReactNode;
}

function ModalContainer({ isOpen, onRequestClose, children }: ModalContainerProps) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      appElement={document.getElementById('root') || undefined}
      closeTimeoutMS={200}
    >
      <FlexContainer style={{ flexDirection: 'column', gap: '20px' }}>{children}</FlexContainer>
    </Modal>
  );
}

export default ModalContainer;
