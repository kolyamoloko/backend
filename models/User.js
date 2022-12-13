import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    clientId: String,
    userUrl: String,
},
{
    timestamps: true,
})

export default mongoose.model('User', UserSchema);