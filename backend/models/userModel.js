const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator')


const schema = mongoose.Schema;

const userSchema = new schema({
    email:{
        type: String,
        unique: true,
        required: true
    },
    password:{
        type: String,
        required: true
    }
});

// static signup method
userSchema.statics.signup = async function(email, password){
    // signup validation
    if(!email || !password){
        throw Error('All fields must be filled')
    }
    if(!validator.isEmail(email)){
        throw Error('You must use an actual email')
    }
    if(!validator.isStrongPassword(password)){
        throw Error('Password is too weak')
    }

    // check for already existing user
    const exists = await this.findOne({ email })
    if(exists){
        throw Error('This email is already registered to an account')
    }
    

    // genarate salt for password and hash password
    const salt = await bcrypt.genSalt(15)
    const hash = await bcrypt.hash(password, salt)

    // create user with hashed password
    const user = await this.create({email, password: hash})

    return user
};

// statis login method
userSchema.statics.login = async function(email, password){
    // login validation
    if(!email || !password){
        throw Error('All fields must be filled')
    }

    // check for already existing user
    const user = await this.findOne({ email })
    if(!user){
        throw Error('Incorrect Email')
    }

    // check for correct password 
    const match = bcrypt.compare(password, user.password)
    if(!match){
        throw Error('Incorrect password')
    }

    return user
}



module.exports = mongoose.model('User', userSchema)