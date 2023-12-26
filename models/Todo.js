import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    done: {
        type: Boolean,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: () => {
            return this.createdAt.toLocaleDateString();
        }
    }
});

export default mongoose.model("Todo", TodoSchema);