
import bookModel from "../../model/book.js";

export async function CreateBook(req, res) {
    const { name, author, title, published_date, status, price } = req.body;

    if (!name || !author || !title || !published_date || !status || !price) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const newBook = await bookModel.create({
            name,
            author,
            title,
            published_date,
            status,
            price
        });
        res.status(201).json({
            message: `${newBook.title} was created by ${newBook.author}`,
            book: newBook
        });
    } catch (error) {
        res.status(500).json({ message: "Error creating book", error: error.message });
    }
}

// get all books oohhh
export async function GetAllBooks(req, res) {
    try {
        const books = await bookModel.find({});
        res.status(200).json({
            message: "Books retrieved successfully",
            count: books.length,
            books
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching books", error: error.message });
    }
}

//  get book by id
export async function GetBookById(req, res) {
    try {
        const book = await bookModel.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json({ message: "Book retrieved successfully", book });
    } catch (error) {
        res.status(500).json({ message: "Error fetching book", error: error.message });
    }
}

// Update book
export async function UpdateBook(req, res) {
    try {
        const book = await bookModel.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        const updatedBook = await bookModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        res.status(200).json({
            message: "Book updated successfully",
            book: updatedBook
        });
    } catch (error) {
        res.status(500).json({ message: "Error updating book", error: error.message });
    }
}

// Delete book
export async function DeleteBook(req, res) {
    try {
        const book = await bookModel.findByIdAndDelete(req.params.id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json({ message: "Book deleted successfully", book });
    } catch (error) {
        res.status(500).json({ message: "Error deleting book", error: error.message });
    }
}