import { useState, useEffect, useContext } from 'react'
import Addbtn from '../components/Addbtn.jsx';
import Navi from "../components/Navi.jsx"
import { SquareX, SquarePen, SaveOff, SaveCheck, LogOut } from 'lucide-react';
import api from '../api/api.jsx';
import { AuthContext } from '../context/AuthContext.jsx';
import logo from "../assets/logo.png"

const Notes = () => {
    const [notes, setNotes] = useState([])
    const [editingNote, setEditingNote] = useState(null)
    const [updateError, setUpdateError] = useState("")
    const { logout } = useContext(AuthContext)


    useEffect(() => {
        api.get("/notes")
        .then((res) => {
            setNotes(res.data.notes)
        })
        .catch((err) => {
            console.error("Failed to fetch notes: ",err)
        })
    },[])


    const deleteNote = async(id) => {
        try {
            await api.delete(`/notes/${id}`)
            setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id)
    );
        } catch (error) {
            setUpdateError(
              error.response?.data?.message || "Failed to delete note." 
            )
        }
    }

    const updateNote = async() => {
        try {
            setUpdateError("")

            const res = await api.patch(
                `/notes/${editingNote._id}`,
                {
                    title: editingNote.title,
                    description: editingNote.description
                }
            )

            setNotes((prevNotes) =>
                prevNotes.map((note) =>
                    note._id === editingNote._id
                        ? res.data.note
                        : note
                )
            )

            setEditingNote(null)

        } catch (error) {
            setUpdateError(
              error.response?.data?.message || "Failed to update note."  
            )
        }
    }

    const handleLogout = () => {
        logout()
    }

  return ( 
    <>
  <div className='bg-[#FAF9F6] min-h-dvh'>

        <div className='flex items-center justify-between'>
            <h3 className='text-[#6B7080] text-xl font-medium px-8 pt-10 font-poppins'>Collections</h3> 
            <button type="button" aria-label="Log out" onClick={handleLogout} className='px-8 pt-10'><LogOut size={20} strokeWidth={1.5} /></button>
        </div>

            <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 pb-32'>
                
                 {notes.length > 0 ? ( notes.map((note) => ( 
                    <div key={note._id} className='h-auto w-full bg-[#FFFFFF] text-[#2D3142] rounded-2xl p-4 relative' > 

                        {editingNote?._id !== note._id && (
                        <button 
                            className='absolute right-5 cursor-pointer'
                            onClick={() => deleteNote(note._id)} >  
                            <SquareX size={20} color="#6B7080" strokeWidth={2} />
                        </button>
                        )}

                        {editingNote?._id !== note._id && (
                        <button 
                            className='absolute bottom-2 right-5 cursor-pointer'
                            onClick={() => setEditingNote(note)} > 
                            <SquarePen size={20} color="#8881DD" strokeWidth={1.5} /> 
                        </button>
                        )}

                        {editingNote?._id === note._id ? ( 
                        <div className="flex flex-col gap-4 pr-6"> 

                            <input className='text-4xl text-[#2D3142] font-black font-caveat tracking-wider rounded-xl outline-none'
                                type="text"
                                maxLength={100} 
                                value={editingNote.title} 
                                onChange={(e) => { setUpdateError("")
                                    setEditingNote(
                                { ...editingNote, 
                                title: e.target.value 
                                }) 
                                }
                                } />

                            <textarea className='text-md p-2 text-[#6B7080] font-poppins tracking-wide min-h-40 resize-none leading-8 rounded-xl outline-none'
                                value={editingNote.description} 
                                onChange={(e) => { setUpdateError("")
                                    setEditingNote(
                                { ...editingNote,
                                 description: e.target.value
                                }) 
                                }
                                } />

                                {updateError && (
                                    <p className="text-red-300 text-sm font-medium">
                                        {updateError}
                                    </p>
                                )}
                            
                            <div className="flex gap-3">

                                <button
                                    type='button'
                                    className="bg-[#8881DD] hover:bg-[#6C63D9] px-4 py-2 rounded-lg text-xl font-extrabold font-caveat cursor-pointer flex items-center gap-1" 
                                    onClick={updateNote} >
                                    <SaveCheck size={16} color="white" strokeWidth={2.5} />
                                    <p>Save</p>
                                </button> 
                                
                                <button
                                    type='button'
                                    className="bg-[#6B7080] hover:bg-[#2D3142] px-4 py-2 rounded-lg text-xl font-extrabold font-caveat cursor-pointer flex items-center gap-1" 
                                    onClick={() => { setUpdateError("") 
                                    setEditingNote(null)}} > 
                                    <SaveOff size={16} color="white" strokeWidth={2.5} />
                                    <p>Cancel</p>
                                </button> 

                            </div> 

                        </div> 
                        ) : ( 
                    <> 
                        <h1 className='text-4xl p-1 ml-2 font-black tracking-wider font-caveat'> {note.title} </h1> 
                        <h3 className='text-md p-1 ml-2 font-medium tracking-wide leading-7 font-poppins'> {note.description} </h3> 
                    </> 
                    )} 
                    </div>
                  )) ) : ( <div className='flex flex-col items-center justify-start gap-12 pt-12'>
                    <img src={logo} alt="logo" className="h-40 w-60 object-contain" />
                  <h1 className="font-caveat font-bold text-6xl text-[#2D3142]"> NoteNest</h1>
                  <p className="font-poppins text-[#6B7080] text-[14px] leading-5 w-60">"Small steps in writing today, make big dreams come true tomorrow."</p> 

                  <div className="flex items-center justify-center gap-2"> 
                        <div className="h-0.5 w-10 bg-[#6C63D9]" />
                            <span>💜</span>
                        <div className="h-0.5 w-10 bg-[#6C63D9]" />
                    </div>

                    <div className='flex flex-col items-center p-2'>
                        <h3 className="font-caveat font-bold text-2xl text-[#2D3142] p-2">No notes yet</h3>
                        <p className="font-poppins text-[#6B7080] text-[14px] leading-5 w-50 text-center">Tap the + button to add <span>your first note.</span></p>
                    </div>

                  </div>
                )} 
                    
                </section>
                <Addbtn/>
                <Navi/>
    </div> 
    
    </>
   ) }

export default Notes