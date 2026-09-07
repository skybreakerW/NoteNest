import bcrypt from "bcrypt"
import { User } from "../models/user.model.js"


const signup = async(req, res) => {

    const {name, email, password} = req.body

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

export {signup}
