import { Note } from "../models/note.model.js"

const createNote = async(req, res) => {
    const {title, description} = req.body

    const note = await Note.create({
        title,
        description,
        user: req.user._id,
    })

    res.status(201).json({
        message: "Note created successfully.",
        note,
    })

}


const getNotes = async(req, res) => {
    const notes = await Note.find({
        user: req.user._id,
    })

    res.status(200).json({
        message: "Notes fetched successfully.",
        notes,
    })
}


const deleteNote = async(req, res) => {
    const { id } = req.params

    const note = await Note.findOneAndDelete({
        _id: id,
        user: req.user._id,
    })

    if(!note){
        return res.status(404).json({
            message: "Note not found.",
        })
    }

    res.status(200).json({
        message: "Note deleted successfully.",
    })
}

export { createNote, getNotes, deleteNote }