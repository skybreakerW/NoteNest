import { useNavigate } from 'react-router-dom';
import { House, NotebookPen, NotepadText, LogOut  } from 'lucide-react';
import { AuthContext } from "../context/AuthContext.jsx"
import { useContext } from 'react';

const Navi = () => {

    const navigate = useNavigate()
    const { logout } = useContext(AuthContext)

    const handleLogout = () => {
        logout()
        navigate("/login")
    }

  return (
    <section className='bg-[#22242a] w-full h-[7vh] fixed bottom-0 flex justify-around items-center'>

        <div className='text-white flex flex-col items-center'>
            <button onClick={() => navigate("/")}><House color="#ffffff" /></button>
            <p className='text-xs p-1 font-medium'>Home</p>
        </div>

        <div className='text-white flex flex-col items-center'>
            <button onClick={() => navigate("/create")}><NotebookPen color="#ffffff" /></button>
            <p className='text-xs p-1 font-medium'>Write</p>
        </div>

        <div className='text-white flex flex-col items-center'>
            <button onClick={() => navigate("/notes")}><NotepadText color="#ffffff" /></button>
            <p className='text-xs p-1 font-medium'>Notes</p>
        </div>  

        <div className='text-white flex flex-col items-center'>
            <button onClick={handleLogout}><LogOut /></button>
            <p className='text-xs p-1 font-medium'>Logout</p>
        </div>      

    </section>
  )
}

export default Navi