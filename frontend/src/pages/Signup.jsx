import api from "../api/api.jsx"
import { useNavigate, Link } from "react-router-dom"
import { useState } from "react"

const Signup = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setIsLoading(true);

    try {
        await api.post("/auth/signup", {
            name,
            email,
            password,
        });

        navigate("/login");

    } catch (error) {
        setError(
            error.response?.data?.message || "Signup failed."
        );
    } finally {
        setIsLoading(false);
    }
};


  return (
     <div className="min-h-screen text-xl flex flex-col justify-center items-center gap-12">
            <h1 className="text-[#8881DD] font-extrabold tracking-wider text-4xl">Sign Up</h1>

            <form onSubmit={handleSubmit} className="flex flex-col justify-center gap-12">
                <div>
                    <label htmlFor="name" className="px-4 font-semibold">Name</label>

                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="bg-slate-400 px-4 py-2 rounded-md outline-none"
                    />
                </div>

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
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        minLength={8}
                        required
                        className="bg-slate-400 px-4 py-2 rounded-md outline-none"
                    />
                </div>

                {error && <p className="text-center">{error}</p>}

                <button type="submit" disabled={isLoading} className="bg-[#8881DD] px-4 py-3 rounded-md text-white font-bold text-2xl border w-full">
                    {isLoading ? "Creating account..." : "Sign Up"}
                </button>
            </form>
            <p>
                Already have an account?{" "}
                <Link to="/login" className="text-[#8881DD] font-bold">
                    Log In
                </Link>
            </p>
        </div>
  )
}

export default Signup