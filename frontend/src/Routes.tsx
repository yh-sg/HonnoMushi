import React from "react";
import { Switch, Route, RouteProps, Redirect } from "react-router-dom";

import HomePage from "./components/HomePage/HomePage";
import About from "./components/About/About";
import Collection from "./components/Collection/Collection";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import CreateBook from "./containers/CreateBook/CreateBook";
import EditBook from "./containers/EditBook/EditBook";
import Books from "./containers/Books/Books";
import LoginForm from "./containers/LoginForm/LoginForm";
import RegisterForm from "./containers/RegisterForm/RegisterForm";
import Book from "./containers/Book/Book";
import AllBooks from "./containers/Books/AllBooks";
import { AuthResult } from "./store/Auth/AuthType";

const user: AuthResult = JSON.parse(localStorage.getItem("user") || "{}");
const isNotLoggedIn = Object.keys(user).length === 0;

export const ROUTES: RouteProps[] = [
	{ path: "/", component: HomePage, exact: true },
	{ path: "/create", component: CreateBook },
	{ path: "/edit/:id", component: EditBook },
	{ path: "/collection", component: Collection },
	{ path: "/books/:alphabet", component: Books, exact: true },
	{ path: "/book/:id", component: Book, exact: true },
	{ path: "/books", component: AllBooks, exact: true },
	{ path: "/about", component: About },
	{
		path: "/login",
		component: () => (isNotLoggedIn ? <LoginForm /> : <Redirect to='/' />),
	},
	{
		path: "/register",
		component: () => (isNotLoggedIn ? <RegisterForm /> : <Redirect to='/' />),
	},
	{ path: "*", component: PageNotFound },
];

export const Routes: React.FC = () => {
	return (
		<>
			<Switch>
				{ROUTES.map((route, i) => (
					<Route {...route} key={i} />
				))}
			</Switch>
		</>
	);
};
