import React, { useEffect } from 'react'
import ReactPaginate from 'react-paginate'
import { useDispatch, useSelector } from 'react-redux';
import { getAllBooks, getBooksByLetter } from '../../store/Books/BooksActions';
import { RootState } from '../../store/rootReducer';
import {useHistory} from 'react-router-dom'
import './Pagination.css'

interface Props{
    page:string|number
    alphabet?:string
}

const Pagination:React.FC<Props> = ({page, alphabet}):React.ReactElement => {

    const dispatch = useDispatch(),
        history = useHistory(),
        {numberOfPages} = useSelector((state:RootState) => state.allBooks.books)

    useEffect(() => {
		if(alphabet!==undefined) dispatch(getBooksByLetter(alphabet, page));
        else dispatch(getAllBooks(page))
	}, [page]);

    const handlePageClick = (e:{selected:number}):void => {
        const pageQuery = e.selected + 1;
        if(alphabet!==undefined)
            history.push(`/books/${alphabet}?page=${pageQuery}`)
        else
            history.push(`/books?page=${pageQuery}`)
    }

    return (
        <>
            <ReactPaginate
                previousLabel={"Prev"}
                nextLabel={"Next"}
                pageCount={numberOfPages!}
                pageRangeDisplayed={5}
                marginPagesDisplayed={2}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                previousLinkClassName={"pagination_link"}
                nextLinkClassName={"pagination_link"}
                disabledClassName={"pagination_disabled"}
                activeClassName={"pagination_active"}
            />
        </>
    )
}

export default Pagination
