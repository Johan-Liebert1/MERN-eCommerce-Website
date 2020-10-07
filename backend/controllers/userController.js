import asyncHandler from 'express-async-handler' // custom error handler
import User from '../models/userModel.js'


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
            token : null
        })
    }

    else {
        res.status(410)
        throw new Error("Invalid Email or Password")
    }
})

export { authUser }