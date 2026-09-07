import { useNavigate } from 'react-router-dom'
import Navi from '../components/Navi'
import { SquarePen, BookOpen } from 'lucide-react';

const Land = () => {

  const navigate = useNavigate()

  const create = () => {
    navigate("/create")
  }

  const read = () => {
    navigate("/notes")
  }

  return (
    <>
    <Navi/>
      <section className='min-h-screen bg-[#22242a] flex flex-col items-center justify-center gap-8'>

        <h1 className='text-center text-white font-bold text-4xl'>Welcome!</h1>
        <div className='text-white p-4 flex flex-row justify-around items-center w-full'>

          <button className='bg-slate-600 px-4 py-2 rounded-xl tracking-wider font-bold text-lg flex flex-row items-center gap-2' onClick={create}>
            <SquarePen size={25} color="#ffffff" strokeWidth={1.5} />Create Note
          </button>

          <button className='bg-slate-600 px-4 py-2 rounded-xl tracking-wider font-bold text-lg flex flex-row items-center gap-2' onClick={read}>
            <BookOpen size={25} color="#ffffff" strokeWidth={1.5} />Read Notes
          </button>

        </div>

      </section>
      
    </>
  )
}

export default Land