import express from "express"
import { authMiddleware } from "../middlewares/auth.middleware.js"
import { createNote, getNotes, deleteNote, updateNote } from "../controllers/note.controller.js"

const router = express.Router()

router.use(authMiddleware)

router.post("/", createNote)
router.get("/", getNotes)
router.delete("/:id", deleteNote)
router.patch("/:id", updateNote)

export { router as noteRouter }