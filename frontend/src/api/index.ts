import axios, { AxiosResponse } from 'axios'
import { AuthDetails, AuthResult } from '../store/Auth/AuthType';
import { Book } from '../store/Book/BookType';
import { BookLetter, Books } from '../store/Books/BooksTypes';

const API = axios.create({baseURL: process.env.REACT_APP_URL})

export const fetchAllBooks = (page:string|number):Promise<AxiosResponse<Books>> => API.get<Books>(`/books?page=${page}`),
    fetchBooks = (letter:string,page:string|number):Promise<AxiosResponse<Books>> => API.get<Books>(`/books/${letter}?page=${page}`),
    fetchBook = (id:string):Promise<AxiosResponse<Book>> => API.get<Book>(`/book/${id}`),
    createBook = (newBook:BookLetter) => API.post<BookLetter>(`/createBook`,newBook),
    updateBook = (id:string, updatedBook:BookLetter) => API.patch<BookLetter>(`/updateBook/${id}`,updatedBook),
    deleteBook = (id:string) => API.delete<void>(`/${id}`),
    searchBooks = (searchTitle:string|null, searchGenres:string|null) => API.get(`/searchBook?searchTitle=${searchTitle||'none'}&searchGenres=${searchGenres||'none'}`),
    register = (form:AuthDetails):Promise<AxiosResponse<AuthResult>> => API.post<AuthResult>(`auth/register`, form),
    login = (form:AuthDetails):Promise<AxiosResponse<AuthResult>> => API.post<AuthResult>(`auth/login`, form);