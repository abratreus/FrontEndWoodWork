import React, { createContext, useContext, useState } from 'react';

const AlertContext = createContext();

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, variant = 'success', duration = 3000) => {
    setAlert({ message, variant });
    if (duration > 0) {
      setTimeout(() => setAlert(null), duration);
    }
  };

  const hideAlert = () => setAlert(null);

  return (
    <AlertContext.Provider value={{ showAlert, hideAlert }}>
      {children}
      {alert && (
        <div
          style={{
            position: 'fixed',
            top: '80px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1050,
            width: '90%',
            maxWidth: '500px'
          }}
        >
          <div className={`alert alert-${alert.variant} alert-dismissible fade show`} role="alert">
            {alert.message}
            <button type="button" className="btn-close" onClick={hideAlert}></button>
          </div>
        </div>
      )}
    </AlertContext.Provider>
  );
};
