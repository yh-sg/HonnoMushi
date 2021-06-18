import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useHistory } from 'react-router-dom';
import { getAllBooks } from '../../store/Books/BooksActions';
import { RootState } from '../../store/rootReducer';
import { Spinner } from "react-bootstrap";
import { ContainerStyle } from "../../components/HomePage/HomePage.style";
import {
	BooksTableStyle,
	BooksTableHeaderStyle,
	BooksImageStyle,
	BooksTitleStyle,
} from "../Books/Books.style";
import Pagination from '../../components/Pagination/Pagination'

const useQuery = ():URLSearchParams => {
	return new URLSearchParams(useLocation().search);
}

const AllBooks:React.FC = ():React.ReactElement => {
    const dispatch = useDispatch(),
        query = useQuery(),
        history = useHistory(),
        page = query.get(`page`)||1;

    useEffect(() => {
        dispatch(getAllBooks(page))
    }, [])

    const {loading, books, error} = useSelector((state: RootState) => state.allBooks),
        {count, booksLetter, letter} = books;

        console.log(letter)

        return (
            <>
                <ContainerStyle
                    isBooksSearching={!!books}
                    count={count}
                    loading={loading}
                >
                    {error && <div>Insert React Error Boundary</div>}
                    {loading && <Spinner animation='border' variant='warning' />}
                    {!loading && books && (
                        <h3>
                            There {count === 1 ? "is 1 book" : `are ${count} books`} 📕📗
                        </h3>
                    )}
                </ContainerStyle>
    
                {!loading && books && (
                    <>
                        {count >= 1 && (
                            <BooksTableStyle count={count}>
                                <BooksTableHeaderStyle className='row'>
                                    <div className='col-2'>cover</div>
                                    <div className='col-6'>title</div>
                                    <div className='col-2'>rating</div>
                                    <div className='col-2'>format</div>
                                </BooksTableHeaderStyle>
                                <br />
                                {booksLetter.map((book, i) => {
                                    return (
                                        <div key={i}>
                                            <div className='row'>
                                                <div className='col-2'>
                                                    <BooksImageStyle
                                                        src={book.image_url}
                                                        alt={book.image_url ? book.title : "not available"}
                                                        onClick={() => history.push(`/book/${book.book_id}`)}
                                                    />
                                                </div>
                                                <BooksTitleStyle
                                                    className='col-6'
                                                    onClick={() => history.push(`/book/${book.book_id}`)}
                                                >
                                                    {book.title}
                                                </BooksTitleStyle>
                                                <div className='col-2'>{book.rating}</div>
                                                <div className='col-2'>{book.format}</div>
                                            </div>
                                            <br />
                                        </div>
                                    );
                                })}
                            </BooksTableStyle>
                        )}
                    </>
                )}
                <Pagination page={page}/>
            </>
        );
    };

export default AllBooks
