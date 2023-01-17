import React, { useContext, createContext } from 'react';

//Context
export const AppContext = createContext(null);

//Provider
export const AppContextProvider = ({ children }) => {
  const [isAuth, setIsAuth] = React.useState(false);
  const [user, setUser] = React.useState(null);

  //ComponentDidMouunt
  React.useEffect(() => {

  }, []);

  //
  const values = React.useMemo(() => (
    { 
        isAuth, user,     // States que seran visibles en el contexto.
        setIsAuth, setUser  // Funciones que son exportadas para manejo externo.
    }), 
    [ 
        isAuth,
        user
    ]);   // States que serán visibles en el contexto.

  // Interface donde será expuesto como proveedor y envolverá la App.
  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
}

//
export function useAppContext() {
  
    const context = useContext(AppContext);

  if(!context){
    console.error('Error deploying App Context!!!');
  }

  return context;
}

export default useAppContext;