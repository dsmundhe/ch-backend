import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
    username: String,
    email: String,
    uploads: [
        {
            url: String,
        },
    ],
});

const userModel = mongoose.model('file', fileSchema);

export default userModel;
