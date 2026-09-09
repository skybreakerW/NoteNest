import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import api from "../api/api.jsx"

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const { login } = useContext(AuthContext)

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setIsLoading(true);

        try {
            const response = await api.post(
                "/auth/login",{
                    email,
                    password,
                }
            )

            const data = response.data

            login(data.token, data.user)

            navigate("/notes")

        } catch (error) {
            setError(
                error.response?.data?.message || "Login failed."
            )
        } finally{
            setIsLoading(false)
        }
    };

    return (
        <div className="min-h-screen text-xl flex flex-col justify-center items-center gap-12">
            <h1 className="text-[#8881DD] font-extrabold tracking-wider text-4xl">Log In</h1>

            <form onSubmit={handleSubmit} className="flex flex-col justify-center gap-12">
                <div>
                    <label htmlFor="email" className="px-4 font-semibold">Email</label>

                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="bg-slate-400 px-4 py-2 rounded-md outline-none"
                    />
                </div>

                <div>
                    <label htmlFor="password" className="px-4 font-semibold">Password</label>

                    <input
                        id="password"
                        type="text"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="bg-slate-400 px-4 py-2 rounded-md outline-none"
                    />
                </div>

                {error && <p>{error}</p>}

                <button type="submit" disabled={isLoading} className="bg-[#8881DD] px-4 py-3 rounded-md text-white font-bold text-2xl border w-full">
                    {isLoading ? "Logging in..." : "Log In"}
                </button>
            </form>
            <p>
                Don't have an account?{" "}
                <Link to="/signup" className="text-[#8881DD] font-bold">
                    Sign Up
                </Link>
            </p>
        </div>
    );
};

export default Login;