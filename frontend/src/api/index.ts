import axios from 'axios'
import { Book } from '../store/Book/BookType';
import { Books } from '../store/Books/BooksTypes';

const API = axios.create({baseURL: 'http://localhost:3010'})

export const fetchBooks = (letter:string) => API.get<Books>(`/books/${letter}`),
    fetchBook = (id:string) => API.get<Book>(`/book/${id}`);
