import React, { useState, useEffect, useMemo } from "react";
import jwt_decode from 'jwt-decode';
import { getCurUser } from "../components/api/ApiUser";
import { getCurCustomer } from "../components/api/ApiCustomers";

export const UserContext = React.createContext({roles: 'none'});

export function UserProvider({children}){
    const [user, setUser] = useState({roles: 'none'});

    const updateUser = (newUser) => {
        setUser(newUser);
    }

    useEffect(() => {
        if ( localStorage.getItem('token') ) {
            const username = jwt_decode(localStorage.getItem('token')).username;
            
            if (jwt_decode(localStorage.getItem('token')).roles.includes('ROLE_ADMIN')){
                getCurUser(updateUser, username);
            } else {
                getCurCustomer(updateUser, username);
            }
      
        }
    
      }, [])

    return (
        <UserContext.Provider value={ useMemo(() => ({user, updateUser}), [ user, updateUser]) }>
            { children }
        </UserContext.Provider>
    )
}