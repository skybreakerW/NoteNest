import { createContext, useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../api/api.jsx"

const AuthContext = createContext(null)

const AuthProvider = ({children}) => {

    const navigate = useNavigate()

    const [token, setToken] = useState(
        localStorage.getItem("token")
    )

    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user")
        return storedUser ? JSON.parse(storedUser) : null
    })

    const login = useCallback((token, user) => {
        localStorage.setItem("token", token)
        localStorage.setItem("user", JSON.stringify(user))

        setToken(token)
        setUser(user)
    }, [])

    const logout = useCallback(() => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")

        setToken(null)
        setUser(null)
    }, [])

    useEffect(() => {

        const interceptorId = api.interceptors.response.use(
            (response) => response,

            (error) => {

                const isProtectedRequest =
                    Boolean(error.config?.headers?.Authorization)

                if (
                    error.response?.status === 401 &&
                    isProtectedRequest
                ) {
                    logout()
                    navigate("/", { replace: true })
                }

                return Promise.reject(error)
            }
        )

        return () => {
            api.interceptors.response.eject(interceptorId)
        }

    }, [logout, navigate])

    return (
        <AuthContext.Provider value={{user, token, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider }