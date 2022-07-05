import mongoose from 'mongoose';

const {Schema, model} = mongoose;

export const bookSchema = new Schema({
    title: String, 
    description: String,
    authors: String,
    favorite: String,
    fileCover: String,
    fileName: String
});

export const bookModel = model('Book', bookSchema);