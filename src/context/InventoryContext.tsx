import React, { createContext, useState, useContext } from 'react';

const InventoryContext = createContext(null);

export const InventoryProvider: React.FC = ({ children }) => {
  const [inventory, setInventory] = useState([]);

  return (
    <InventoryContext.Provider value={{ inventory, setInventory }}>
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = () => useContext(InventoryContext);