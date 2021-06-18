import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from 'react-router-dom';
import { getAllBooks } from '../../store/Books/BooksActions';
import { RootState } from '../../store/rootReducer';
import { Spinner } from "react-bootstrap";
import { ContainerStyle } from "../../components/HomePage/HomePage.style";
import Pagination from '../../components/Pagination/Pagination'
import BookContent from './BookContent';

const useQuery = ():URLSearchParams => {
	return new URLSearchParams(useLocation().search);
}

const AllBooks:React.FC = ():React.ReactElement => {
    const dispatch = useDispatch(),
        query = useQuery(),
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
                            There { `are ${count} books`} 📕📗
                        </h3>
                    )}
                </ContainerStyle>
    
                {!loading && books && (
                        <BookContent booksLetter={booksLetter} count={count}/>
                )}
                <Pagination page={page}/>
            </>
        );
    };

export default AllBooks
