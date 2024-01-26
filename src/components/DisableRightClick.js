import React, { useEffect } from 'react';

const DisableRightClick = () => {
  const disableContextMenu = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    window.addEventListener('contextmenu', disableContextMenu);

    return () => {
      window.removeEventListener('contextmenu', disableContextMenu);
    };
  }, []);

  return;
};

export default DisableRightClick;