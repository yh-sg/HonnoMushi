import React from "react";
import { Switch, Route, RouteProps, Redirect } from "react-router-dom";

import HomePage from "./components/HomePage/HomePage";
import Collection from "./components/Collection/Collection";
import Books from "./containers/Books/Books";
import LoginForm from "./containers/LoginForm/LoginForm";
import RegisterForm from "./containers/RegisterForm/RegisterForm";
import Book from "./containers/Book/Book";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import AllBooks from "./containers/Books/AllBooks";
import About from "./components/About/About";
import { AuthResult } from "./store/Auth/AuthType";
import CreateBook from "./containers/CreateBook/CreateBook";
import EditBook from "./containers/EditBook/EditBook";

const user: AuthResult = JSON.parse(localStorage.getItem("user") || "{}");

export const ROUTES: RouteProps[] = [
	{ path: "/", component: HomePage, exact: true },
	{ path: "/about", component: About },
	{ path: "/collection", component: Collection },
	{ path: "/books/:alphabet", component: Books, exact: true },
	{ path: "/book/:id", component: Book, exact: true },
	{ path: "/books", component: AllBooks, exact: true },
	{ path: "/create", component: CreateBook },
	{ path: "/edit/:id", component: EditBook },
	{
		path: "/login",
		component: () =>
			Object.keys(user).length === 0 ? <LoginForm /> : <Redirect to='/' />,
	},
	{
		path: "/register",
		component: () =>
			Object.keys(user).length === 0 ? <RegisterForm /> : <Redirect to='/' />,
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
