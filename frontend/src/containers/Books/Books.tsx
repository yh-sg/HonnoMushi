import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getBooksByLetter } from "../../store/Books/BooksActions";
import { BooksState } from "../../store/Books/BooksReducer";
import { RootState } from "../../store/rootReducer";

const Books: React.FC = () => {
	const { letter } = useParams() as {
		letter: string;
	};

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getBooksByLetter(letter));
	}, []);

	const allBookState = useSelector((state: RootState) => state.allBooks);
	// const booksState = useSelector<BooksState, BooksState["books"]>(
	// 	(state) => state.books
	// );

	console.log("allBookState -->", allBookState);
	// console.log("booksState -->", booksState);

	return (
		<>
			<h3>Books 📕📗 starting with '{letter}'</h3>

			{/* {booksState && booksState.} */}
		</>
	);
};

export default Books;

// authors: "Becky Albertalli";
// book_id: "c1706048";
// description: "Leah Burkeâ€”girl-band drummer, master of deadpan, and Simon Spierâ€™s best friend from the award-winning Simon vs. the Homo Sapiens Agendaâ€”takes center stage in this novel of first love and senior-year angst.When it comes to drumming, Leah Burke is usually on beatâ€”but real life isnâ€™t always so rhythmic. An anomaly in her friend group, sheâ€™s the only child of a young, single mom, and her life is decidedly less privileged. She loves to draw but is too self-conscious to show it. And even though her mom knows sheâ€™s bisexual, she hasnâ€™t mustered the courage to tell her friendsâ€”not even her openly gay BFF, Simon.So Leah really doesnâ€™t know what to do when her rock-solid friend group starts to fracture in unexpected ways. With prom and college on the horizon, tensions are running high. Itâ€™s hard for Leah to strike the right note while the people she loves are fightingâ€”especially when she realizes she might love one of them more than she ever intended.";
// edition: "";
// format: "Hardcover";
// genres: "Young Adult|Contemporary|Lgbt|Romance|Fiction|Audiobook|Glbt|Queer|Realistic Fiction|Young Adult|Young Adult Contemporary|Young Adult|Teen";
// image_url: "https://images.gr-assets.com/books/1510886704l/31180248.jpg";
// pages: 343;
// rating: 4.01;
// rating_count: 30692;
// review_count: 6365;
// title: "Leah on the Offbeat";
// _id: "6095f2e31eb6a85a10c5a922";
