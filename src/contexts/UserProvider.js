import React, { createContext } from "react";
import Cookies from 'js-cookie'
import api from '../services/api';
// import { useHistory } from 'react-router-dom';

export const UserContext = createContext({});

export function UserProvider({children}){
    // const history = useHistory();
    
    async function signIn(token){
        try{

            // if(!token){
            //     history.push('/');
            // }

            // Cookies.set('token', token, { expires: 10 })

            // api.defaults.headers['Authorization'] = `Bearer ${token}`;
            
            // history.push('dashboard');
        } catch (error) {
            // console.log(error);
        }
    }

    return(
        <UserContext.Provider value={{signIn}}>
            {children}
        </UserContext.Provider>
    )
}