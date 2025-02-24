import React, { createContext, useState } from 'react';
import Product from '../models/product';


const initState:Product[] = [];

export const GlobalContext = createContext({});

const Store = ({children}) => {
    const [cart, setCart] = useState(initState);

    return (
        <GlobalContext.Provider value={[cart, setCart]}>
            {children}
        </GlobalContext.Provider>
    );
};

export default Store;
