import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
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
    feedback: {
        type: String,
        trim: true,
        required: true,
        minlength: [4, "Minimum length should be of 4long"]
    },
});

const feedbackModel = mongoose.model("feedback", feedbackSchema);
export default feedbackModel;
