import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100,
    },

    description: {
        type: String,
        trim: true,
        maxlength: 5000
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
},
{timestamps:true})

export const Note = mongoose.model("Note", noteSchema)