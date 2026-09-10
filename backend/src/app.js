import express from "express";
import cors from "cors" 
import { authRouter } from "./routes/auth.route.js"
import { noteRouter } from "./routes/note.route.js";
import { authMiddleware } from "./middlewares/auth.middleware.js";


const app = express()


app.use(express.json())
app.use(cors({
    origin: process.env.FRONTEND_URL
}))

app.use("/api/auth", authRouter)
app.use("/api/notes", noteRouter)


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


app.use((err, req, res, next) => {
    console.log("Error: ", err)

    res.status(500).json({
        message: "Something went wrong on the server."
    })
})



export { app }