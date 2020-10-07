import asyncHandler from 'express-async-handler' // custom error handler
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'

// Authenticate the user and get token

const authUser = asyncHandler( async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })


    // matchPassword function is defined under the userSchema in ../models/userModel
    if (user && await (user.matchPassword(password)) ) {
        res.json({
            _id : user._id,
            name : user.name,
            email : user.email,
            isAdmin : user.isAdmin,
            token : generateToken(user._id)
        })
    }

    else {
        res.status(401)
        throw new Error("Invalid Email or Password")
    }
})


// create a new user

const registerUser = asyncHandler( async (req, res) => {
    const { name, email, password } = req.body

    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400) // bad request
        throw new Error(`User with emailId ${email} already exists`)
    }

    // the password is hashed preSave. Check userModel.js for more details
    const user = await User.create({ name, email, password })

    if (user) {
        res.status(201) // something was created

        res.json({
            _id : user._id,
            name : user.name,
            email : user.email,
            isAdmin : user.isAdmin,
            token : generateToken(user._id)
        })

    }

    else {
        res.status(400)

        throw new Error("Invalid User Data")
    }

})


const getUserProfile = asyncHandler( async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {

        res.json({
            _id : user._id,
            name : user.name,
            email : user.email,
            isAdmin : user.isAdmin,
        })
    }

    else {
        res.status(404)
        throw new Error("User not found")
    }
})



export { authUser, registerUser, getUserProfile }