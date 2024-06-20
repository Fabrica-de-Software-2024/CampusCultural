import { createContext, useState } from "react";


export const BackendContext = createContext(null);

export const BackendProvider = ({ children }) => {
    const [back_url, setBack_url] = useState();
    return (
        <BackendContext.Provider value={{ back_url, setBack_url }}>
            {children}
        </BackendContext.Provider>
    )
}