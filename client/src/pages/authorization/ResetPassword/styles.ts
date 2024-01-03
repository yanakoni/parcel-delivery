import { CSSProperties } from 'react';

export const styles: { [key: string]: CSSProperties } = {
  modalBox: {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: '30px',
    width: '500px',
    background: '#FFF',
    borderRadius: '15px',
    outline: 'none',
    textAlign: 'center',
  },
};
