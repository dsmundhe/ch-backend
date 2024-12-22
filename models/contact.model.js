import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: [5, "Username must be of min length 5"]
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true,
        minlength: [13, "Email must be of at least length 13"]
    },
    message: {
        type: String,
        trim: true,
        required: true,
        minlength: [4, "Minimum length should be of 4long"]
    },
});

const contactModel = mongoose.model("contact", contactSchema);
export default contactModel;
