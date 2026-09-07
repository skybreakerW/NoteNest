import express from "express";
import { Note } from "./models/note.model.js"
import cors from "cors" 
import { authRouter } from "./routes/auth.route.js"
import { authMiddleware } from "./middlewares/auth.middleware.js";

const app = express()

app.use(express.json())
app.use(cors())

app.use("/api/auth", authRouter)


app.get("/api/protected", authMiddleware, (req,res)=>{
    res.status(200).json({
        message: "Authenticated!",
        userId: req.user._id,
    })
})


app.get("/api/health", (req,res) => {
    res.status(200).json({
        status: "ok",
        message: "Server is running", })
})

app.post("/create", async (req,res) => {
    const { title, description } = req.body

    await Note.create({
        title,
        description
    })
    res.status(201).json({
        message: "Note created successfully"
    })
})

app.get("/notes", async (req, res) => {

    const notes = await Note.find()
    res.status(200).json({
        message: "Notes fetched successfully",
        notes,
    })
})

app.delete("/notes/:id", async(req, res) => {

    const id = req.params.id
    await Note.findOneAndDelete({
        _id: id,
    })

    res.status(200).json({
        message: "Note deleted successfully."
    })
})

app.use((err, req, res, next) => {
    console.log("Error: ", err)

    res.status(500).json({
        message: "Something went wrong on the server."
    })
})



export { app }