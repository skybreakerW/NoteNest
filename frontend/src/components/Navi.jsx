import { useNavigate } from 'react-router-dom';
import { House, NotebookPen, NotepadText } from 'lucide-react';

const Navi = () => {

    const navigate = useNavigate()

  return (
    <section className='bg-[#FAF9F6] w-full h-[7vh] fixed bottom-0 flex justify-around items-center inset-shadow-sm'>

        <div className='text-[#6C63D9] flex flex-col items-center'>
            <button aria-label="Home" onClick={() => navigate("/")}><House color="#6C63D9" /></button>
            <p className='text-xs p-1 font-medium'>Home</p>
        </div>

        <div className='text-[#6C63D9] flex flex-col items-center'>
            <button aria-label="Notes" onClick={() => navigate("/notes")}><NotepadText color="#6C63D9" /></button>
            <p className='text-xs p-1 font-medium'>Notes</p>
        </div> 

        <div className='text-[#6C63D9] flex flex-col items-center'>
            <button aria-label="Write"  onClick={() => navigate("/create")}><NotebookPen color="#6C63D9" /></button>
            <p className='text-xs p-1 font-medium'>Write</p>
        </div> 
    

    </section>
  )
}

export default Navi