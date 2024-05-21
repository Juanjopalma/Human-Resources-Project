import React, {createContext, useEffect, useState} from 'react';
import {jwtDecode} from "jwt-decode";
import {getLocalStorage} from "../helpers/localStorageUtils/localStorageUtils.js";


export const RhContext = createContext();

export const RhProvider = ({children}) => {
    const [user, setUser] = useState("");
    const [token, setToken] = useState();
    const [isLogged, setIsLogged] = useState(false);

    const tokenLocalStorage = getLocalStorage("token");

    useEffect(() => {
        setToken(tokenLocalStorage);
        if (tokenLocalStorage) {
            try {
                const email = jwtDecode(tokenLocalStorage).sub;
                setUser(email);
            } catch (error) {
                console.error("Error al obtener el email", error)
            }
        }
    }, [isLogged, token])

    return (
        <RhContext.Provider value={{
            user,
            setUser,
            token,
            setToken
        }}>
            {children}
        </RhContext.Provider>
    );
};
