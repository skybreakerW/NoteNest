import { useNavigate } from 'react-router-dom';
import { CirclePlus } from 'lucide-react';

const Addbtn = () => {

    const navigate = useNavigate()

    const handleClick = () => {
        navigate("/create")
    }

  return (
    <button type='button'
    onClick={handleClick}
    className='bg-slate-600 rounded-full fixed bottom-20 right-4'>
        <CirclePlus size={28} color="#ffffff" strokeWidth={0.5} />
    </button>
  )
}

export default Addbtn
