import express from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import todosRoute from './routes/todos.js';
import cors from "cors";

const app = express();

dotenv.config();
app.use(cors());

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log('Mongo ON');
    } catch (error) {
        throw (error);
    }
};

mongoose.connection.on('disconnected', () => {
    console.log("mongoDb disconnected!");
});

mongoose.connection.on('connected', () => {
    console.log("mongoDb connected!");
});

// middlewares
app.use(express.json());
app.use('/api/todos', todosRoute);

app.listen(8080, () => {
    console.log('Server ON');
    connect();
});