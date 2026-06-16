import mongoose from "mongoose"

const Schema = mongoose.Schema;
const bookSchema = new Schema({
    name: { type: String, required: true },
    author :{ type: String, required: true },
    title : { type: String, required: true },
    published_date : { type: Date, required: true },
    price : { type: Number, required: true },
    status : { type: String, default: "available", enum: ["available", "unavailable"] },
});

const bookModel = mongoose.model("Book", bookSchema); 

export default bookModel;