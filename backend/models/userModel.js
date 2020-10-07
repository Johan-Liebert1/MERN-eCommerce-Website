import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema({
    name : {
        type: String,
        required: true
    },

    email : {
        type: String,
        required: true,
        unique: true
    },

    password : {
        type: String,
        required: true
    },

    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }
}, {
    timestamps: true
}
)

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}


// do something before we save
userSchema.pre('save', async function (next) {
    /* if the password has not been modified then just move forward,
    if we don't, then, if only the name has been modified, a new salt
    for the password will be created and a new hashed password will be set, 
    which is not wanted */

    if (!this.isModified("password")) {
        next()
    }

    const salt = await bcrypt.genSalt(10)

    this.password = await bcrypt.hash(this.password, salt)

})

const User = mongoose.model('User', userSchema)

export default User