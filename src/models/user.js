import pkg from 'mongoose';
const { Schema, model } = pkg;
import bcrypt from "bcryptjs";

const userSchema = new Schema({

    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,

    }


});

userSchema.methods.encryptPassword = async (Password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(Password, salt);
};

userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

export default model('User', userSchema);