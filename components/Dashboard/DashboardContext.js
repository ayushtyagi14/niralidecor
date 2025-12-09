import { createContext, useState, useContext } from 'react';

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [activeComponent, setActiveComponent] = useState('Home');

  return (
    <DashboardContext.Provider value={{ activeComponent, setActiveComponent }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => useContext(DashboardContext);
