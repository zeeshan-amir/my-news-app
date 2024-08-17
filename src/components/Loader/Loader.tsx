import React from 'react';
import { ThreeDots } from 'react-loader-spinner';

const LoaderSpinner: React.FC = () => {
  return (
    <>
      <div style={styles.overlay}></div>
      <div style={styles.loader}>
        <ThreeDots color="#0EC4CB" height={100} width={100} />
      </div>
    </>
  );
};

export default LoaderSpinner;

const styles: { [key: string]: React.CSSProperties } = {
  loader: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)', 
    zIndex: 999999,
  },
  overlay: {
    background: 'rgba(0, 0, 0, 0.6)',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 999999999,
    pointerEvents: 'auto',
  },
};
