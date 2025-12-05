import {FC, createContext, useContext, ReactNode, useState} from "react"

interface UserData {
    username: string,
    avatar: string | null,
    access_token: string,
    refresh_token: string
}

const userContext:UserData = createContext(null)

export const userContextProvider:FC<{children: ReactNode}> = ({children}) => {
    const [data, setData] = useState(userContext)
    return (
       
    )
}