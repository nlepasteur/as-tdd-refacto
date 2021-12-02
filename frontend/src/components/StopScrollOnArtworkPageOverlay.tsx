// types
import type { ReactElement } from 'react';
// libs
import { useLocation } from 'react-router-dom';

const StopScrollOnArtworkPageOverlay = ({
  children,
}: {
  children: ReactElement;
}) => {
  const { pathname } = useLocation();
  return (
    <div
      style={{
        position: 'fixed',
        height: '100vh',
        width: '100vw',
        overflow: /artwork/.test(pathname) ? 'hidden' : 'auto',
      }}
    >
      {children}
    </div>
  );
};

export default StopScrollOnArtworkPageOverlay;
