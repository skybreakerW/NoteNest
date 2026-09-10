import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"


const signup = async(req, res) => {

    const {name, email, password} = req.body

    if(!name || !email || !password){
        return res.status(400).json({
            message: "All fields are required."
        })
    }

    if(name.length < 3){
        return res.status(400).json({
            message: "Name must be at least 3 characters."
        })
    }

    if(password.length < 8){
        return res.status(400).json({
            message: "Password must be at least 8 characters."
        })
    }

    const existingUser = await User.findOne({email})
    if(existingUser){
        return res.status(409).json({
            message: "User already exists."
        })
    }

    const hashPass = await bcrypt.hash(password, 10)

    const user = await User.create({
        name,
        email,
        password: hashPass,
    })

    res.status(201).json({
        message: "User created successfully.",
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
        }
    })

}

const login = async(req, res) => {
    const {email, password} = req.body

    const user = await User.findOne({email})
    if(!user){
        return res.status(401).json({
            message: "Invalid email or password.",
        });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if(!isPasswordCorrect){
        return res.status(401).json({
            message: "Invalid email or password."
        })
    }

    const token = jwt.sign({userId: user._id},process.env.JWT_SECRET,{expiresIn: "7d"})
    res.status(200).json({
        message: "Login successful.",
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email
        }
    })

}


export { signup, login }
