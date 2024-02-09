import React, { createContext, useContext, useState } from 'react';

const ItemIdContext = createContext();

export const ItemIdProvider = ({ children }) => {
  const [itemId, setItemId] = useState(null);

  return (
    <ItemIdContext.Provider value={{ itemId, setItemId }}>
      {children}
    </ItemIdContext.Provider>
  );
};

export const useItemId = () => useContext(ItemIdContext);
