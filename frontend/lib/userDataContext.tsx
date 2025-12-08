"use client"

import { NodejsRequestData } from "next/dist/server/web/types"
import {FC, createContext, useContext, ReactNode, useState, useReducer, Dispatch, useEffect, useRef} from "react"


interface UserData {
    user: null,
    access_token: string | null,
    refresh_token: string | null
}

type AuthAction = 
    | {type: "LOGIN_REQUEST"} 
    | {type: "LOGIN_SUCCESS", payload: UserData}
    | {type: "LOGIN_FAIL", payload: string}
    | {type: "LOGOUT"}

export type AuthUserState  = {
    user: UserData | null,
    isLoading: boolean,
    error: string | null
}

const InitialUserState: AuthUserState = {
    user: null,
    isLoading: false,
    error: null
}


const UserAuthReducer = (state: AuthUserState, action: AuthAction): AuthUserState => {
    switch(action.type){
        case "LOGIN_REQUEST":
            return{
                ...state,
                isLoading: true,
                error: null
            };

        case "LOGIN_SUCCESS":
            return{
                ...state,
                isLoading: false,
                user: action.payload,
                error: null
            };

        case "LOGIN_FAIL":
            return{
                ...state,
                isLoading: false,
                user: null,
                error: action.payload
            };

        case "LOGOUT":
            return{
                user: null, 
                isLoading: false,
                error: null
            };

        default:
            return state
    }
}

const userContext = createContext<{
    state: AuthUserState, 
    dispatch: Dispatch<AuthAction>
} | null>(null)


export const AuthContextUserProvider:FC<{children : ReactNode}> = ({children}) => {
    const [state, dispatch] = useReducer(UserAuthReducer, InitialUserState);
    const logOutTimer = useRef<NodeJS.Timeout | null>(null); 

    useEffect(() => {
        const storedUser = localStorage.getItem("userdata");

        if (storedUser) {
            try {
                const userObject = JSON.parse(storedUser);
                const tokenExpiry = userObject.tokenExpiry; 
                
                if (tokenExpiry && Date.now() >= tokenExpiry) {
                    dispatch({ type: "LOGOUT" });
                    localStorage.removeItem("userdata");
                    console.log("User logged out automatically: Token expired on load.");
                } else {
                    dispatch({ type: "LOGIN_SUCCESS", payload: userObject });
                }

            } catch (error) {
                console.error("Failed to parse user data from localStorage", error);
                localStorage.removeItem("userdata");
            }
        }
    }, [])
    useEffect(() => {
        if (state.user) {   
            localStorage.setItem("userdata", JSON.stringify(state.user));
        } else {
            localStorage.removeItem("userdata");
        }
    }, [state.user]);


    useEffect(() => {
        if (logOutTimer.current) {
            clearTimeout(logOutTimer.current);
            logOutTimer.current = null;
        }

        const accessDurationSeconds = parseInt(state.user?.cookie_expiration?.access_expire, 10);
        
        if (state.user && accessDurationSeconds > 0) {
            
            const accessDurationMs = accessDurationSeconds * 1000;
            const absoluteExpiryTime = Date.now() + accessDurationMs;

            
            const timeUntilExpiry = absoluteExpiryTime - Date.now();

            
            if (timeUntilExpiry > 0) {
                logOutTimer.current = setTimeout(() => {
                    dispatch({ type: "LOGOUT" });
                    console.log("User logged out automatically.");
                }, timeUntilExpiry); 
            }
        }

        return () => {
            if (logOutTimer.current) {
                clearTimeout(logOutTimer.current);
            }
        };
    }, [state.user]); 



    const contextValue = {
        state, 
        dispatch 
    };

    return(
        <userContext.Provider value={contextValue}>
            {children}
        </userContext.Provider>
    )
}
export const useUserAuth = () => {
    const context = useContext(userContext);
    
    if (!context) {
        throw new Error("useUserAuth must be used within an AuthContextUserProvider");
    }
    
    return context;
}