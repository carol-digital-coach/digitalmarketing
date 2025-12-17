<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> upstream/main
"use client"

import { FC, createContext, useContext, ReactNode, useReducer, Dispatch, useEffect, useRef } from "react"

export interface UserInfo {
    avatar: string;
    email: string;
    super_user: boolean;
    username: string;
}

export interface AuthResponse {
    access: string;
    cookie_expiration: {
        access_expire: string;
        refresh_expire: string;
    };
    message: string;
    refresh: string;
    user: UserInfo;
}


export type AuthUserState = {
    user: AuthResponse | null;
    isLoading: boolean;
    error: string | null;
}


type AuthAction = 
    | { type: "LOGIN_REQUEST" } 
    | { type: "LOGIN_SUCCESS", payload: AuthResponse }  
    | { type: "LOGIN_FAIL", payload: string }
    | { type: "LOGOUT" }

const InitialUserState: AuthUserState = {
    user: null,
    isLoading: false,
    error: null
}

const UserAuthReducer = (state: AuthUserState, action: AuthAction): AuthUserState => {
    switch(action.type){
        case "LOGIN_REQUEST":
            return {
                ...state,
                isLoading: true,
                error: null
            };

        case "LOGIN_SUCCESS":
            return {
                ...state,
                isLoading: false,
                user: action.payload, 
                error: null
            };

        case "LOGIN_FAIL":
            return {
                ...state,
                isLoading: false,
                user: null,
                error: action.payload
            };

        case "LOGOUT":
            return {
                user: null, 
                isLoading: false,
                error: null
            };

        default:
            return state;
    }
}

export const getUserInfo = (state: AuthUserState): UserInfo | null => {
    return state.user?.user || null;
}

export const getUsername = (state: AuthUserState): string => {
    return state.user?.user?.username || "Guest";
}

export const getUserAvatar = (state: AuthUserState): string => {
    return state.user?.user?.avatar || "/default-avatar.png";
}

export const getUserEmail = (state: AuthUserState): string => {
    return state.user?.user?.email || "";
}

export const isSuperUser = (state: AuthUserState): boolean => {
    return state.user?.user?.super_user || false;
}

export const getAccessToken = (state: AuthUserState): string | null => {
    return state.user?.access || null;
}

export const getRefreshToken = (state: AuthUserState): string | null => {
    return state.user?.refresh || null;
}

interface UserContextType {
    state: AuthUserState;
    dispatch: Dispatch<AuthAction>;
}

const userContext = createContext<UserContextType | null>(null);

export const AuthContextUserProvider: FC<{children: ReactNode}> = ({ children }) => {
    const [state, dispatch] = useReducer(UserAuthReducer, InitialUserState);
    const logOutTimer = useRef<NodeJS.Timeout | null>(null); 

    useEffect(() => {
        const storedUser = localStorage.getItem("userdata");

        if (storedUser) {
            try {
                const userObject: AuthResponse = JSON.parse(storedUser);
                
                if (userObject?.access && userObject?.user && userObject?.cookie_expiration) {
                    dispatch({ type: "LOGIN_SUCCESS", payload: userObject });
                } else {
                    console.error("Invalid user data structure in localStorage");
                    localStorage.removeItem("userdata");
                    dispatch({ type: "LOGOUT" });
                }

            } catch (error) {
                console.error("Failed to parse user data from localStorage", error);
                localStorage.removeItem("userdata");
                dispatch({ type: "LOGOUT" });
            }
        }
    }, []);

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

        if (state.user && state.user.cookie_expiration) {
            const accessDurationSeconds = parseInt(state.user.cookie_expiration.access_expire, 10);
            
            if (!isNaN(accessDurationSeconds) && accessDurationSeconds > 0) {
                const accessDurationMs = accessDurationSeconds * 1000;
                
                logOutTimer.current = setTimeout(() => {
                    dispatch({ type: "LOGOUT" });
                    console.log("User logged out automatically: Token expired.");
                }, accessDurationMs);
            }
        }

        return () => {
            if (logOutTimer.current) {
                clearTimeout(logOutTimer.current);
                logOutTimer.current = null;
            }
        };
    }, [state.user]);

    const contextValue: UserContextType = {
        state, 
        dispatch 
    };

    return (
        <userContext.Provider value={contextValue}>
            {children}
        </userContext.Provider>
    );
}

export const useUserAuth = () => {
    const context = useContext(userContext);
    
    if (!context) {
        throw new Error("useUserAuth must be used within an AuthContextUserProvider");
    }
    
    return context;
}

export const useCurrentUser = () => {
    const { state } = useUserAuth();
    
    return {
        user: getUserInfo(state),
        username: getUsername(state),
        avatar: getUserAvatar(state),
        email: getUserEmail(state),
        isSuperUser: isSuperUser(state),
        accessToken: getAccessToken(state),
        refreshToken: getRefreshToken(state),
        isLoading: state.isLoading,
        error: state.error,
        isAuthenticated: !!state.user
    };
<<<<<<< HEAD
}
>>>>>>> upstream/dev
=======
}
>>>>>>> upstream/main
