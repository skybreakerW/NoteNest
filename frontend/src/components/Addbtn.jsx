import { useNavigate } from 'react-router-dom';
import { CirclePlus } from 'lucide-react';

const Addbtn = () => {

    const navigate = useNavigate()

    const handleClick = () => {
        navigate("/create")
    }

  return (

    <button 
    type='button'
    onClick={handleClick}
    className='bg-[#8881DD] rounded-full fixed bottom-20 right-6'>

      <CirclePlus size={46} color="#FAF9F6" strokeWidth={1.5} />

    </button>
  )
}

export default Addbtn
