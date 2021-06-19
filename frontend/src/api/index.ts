import axios, { AxiosResponse } from 'axios'
import { AuthDetails, AuthResult } from '../store/Auth/AuthType';
import { Book } from '../store/Book/BookType';
import { Books } from '../store/Books/BooksTypes';

const API = axios.create({baseURL: 'http://localhost:3010'})

export const fetchAllBooks = (page:string|number):Promise<AxiosResponse<Books>> => API.get<Books>(`/books?page=${page}`),
    fetchBooks = (letter:string,page:string|number):Promise<AxiosResponse<Books>> => API.get<Books>(`/books/${letter}?page=${page}`),
    fetchBook = (id:string):Promise<AxiosResponse<Book>> => API.get<Book>(`/book/${id}`),
    signup = (form:AuthDetails):Promise<AxiosResponse<AuthResult>> => API.post<AuthResult>(`auth/signup`, form),
    login = (form:AuthDetails):Promise<AxiosResponse<AuthResult>> => API.post<AuthResult>(`auth/login`, form);