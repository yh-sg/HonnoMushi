import axios from 'axios'
import { AuthDetails, AuthResult } from '../store/Auth/AuthType';
import { Book } from '../store/Book/BookType';
import { Books } from '../store/Books/BooksTypes';

const API = axios.create({baseURL: 'http://localhost:3010'})

export const fetchBooks = (letter:string,page:string|number) => API.get<Books>(`/books/${letter}?page=${page}`),
    fetchBook = (id:string) => API.get<Book>(`/book/${id}`),
    //need one more api for bookReview!
    signup = (form:AuthDetails) => API.post<AuthResult>(`auth/signup`, form),
    login = (form:AuthDetails) => API.post<AuthResult>(`auth/login`, form);