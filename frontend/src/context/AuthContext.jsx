import { createContext, useState } from "react"

const AuthContext = createContext(null)

const AuthProvider = ({children}) => {

    const [token, setToken] = useState(
        localStorage.getItem("token")
    )
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user"))
    )

    const login = (token, user) => {
        localStorage.setItem("token", token)
        localStorage.setItem("user", JSON.stringify(user))

        setToken(token)
        setUser(user)
    }

    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")

        setToken(null)
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{user, token, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
} 


export { AuthContext, AuthProvider }
 
