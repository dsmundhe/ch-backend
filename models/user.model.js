import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: [5, "Username must be of min length 5"]
    },
    mobile: {
        type: String,
        required: true,
        minlength: [10, "Username must be of min length 10"]
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true,
        minlength: [13, "Email must be of at least length 13"]
    },
    password: {
        type: String,
        trim: true,
        required: true,
        minlength: [5, "Minimum length should be of 5 long"]
    },
});

const userModel = mongoose.model("User", userSchema);
export default userModel;
