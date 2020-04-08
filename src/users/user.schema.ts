import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    userId: {type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    todo: Array,
});
