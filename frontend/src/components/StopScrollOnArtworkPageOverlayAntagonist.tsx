// types
import type { ReactElement } from 'react';

const StopScrollOnArtworkPageOverlayAntagonist = ({
  children,
}: {
  children: ReactElement;
}) => (
  <div
    style={{
      position: 'fixed',
      top: 0,
      width: '100%',
      height: '100%',
      overflow: 'auto',
      backgroundColor: 'rgba(23, 23, 23, 0.5)',
      color: '#fff',
    }}
  >
    {children}
  </div>
);

export default StopScrollOnArtworkPageOverlayAntagonist;
