"use client"

import {
    createContext,
    useContext,
    useState,
    FC,
    ReactNode,
    useReducer,
    useEffect
} from "react";
import axios from "axios"

interface UserData {
    id: string;
    username: string;
    avatar: string | null;
}

// Create the context
const UserContext = createContext<{
    state: AuthState;
    dispatch: React.Dispatch<AuthAction>;
} | null>(null);

// Auth state and action types
type AuthState = {
    user: UserData | null;
    isLoading: boolean;
    error: string;
};

type AuthAction =
    | { type: "LOGIN_REQUEST" }
    | { type: "LOGIN_SUCCESS"; payload: UserData }
    | { type: "LOGIN_FAILURE"; payload: string }
    | { type: "LOGOUT" };

// Initial state
const initialState: AuthState = {
    user: null,
    isLoading: false,
    error: "",
};

// Reducer function
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case "LOGIN_REQUEST":
            return {
                ...state,
                isLoading: true,
                error: "",
            };
        case "LOGIN_SUCCESS":
            return {
                ...state,
                isLoading: false,
                user: action.payload,
                error: "",
            };
        case "LOGIN_FAILURE":
            return {
                ...state,
                isLoading: false,
                user: null,
                error: action.payload,
            };
        case "LOGOUT":
            return {
                ...state,
                user: null
            };
        default:
            return state;
    }
};

// Context provider component
export const UserAuthContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    // Hydrate user from localStorage on client side
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            dispatch({ type: "LOGIN_SUCCESS", payload: JSON.parse(storedUser) });
        }
    }, []);

    // Save user to localStorage whenever it changes
    useEffect(() => {
        if (state.user) {
            localStorage.setItem("user", JSON.stringify(state.user));
        } else {
            localStorage.removeItem("user");
        }
    }, [state.user]);


    return (
        <UserContext.Provider value={{ state, dispatch }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook to use the context
export const useUserAuth = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUserAuth must be used within a UserAuthContextProvider');
    }
    return context;
};
