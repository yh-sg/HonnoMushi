import React from "react";
import { Switch, Route, RouteProps } from "react-router-dom";

import HomePage from "./components/HomePage/HomePage";
import Create from "./components/Create/Create";
import Collection from "./components/Collection/Collection";
import Books from "./containers/Books/Books";
import LoginForm from "./components/LoginForm/LoginForm";
import RegisterForm from "./components/RegisterForm/RegisterForm";
import Book from "./containers/Book/Book";
import PageNotFound from "./components/PageNotFound/PageNotFound";

export const ROUTES: RouteProps[] = [
	{ path: "/", component: HomePage, exact: true },
	{ path: "/create", component: Create },
	{ path: "/collection", component: Collection },
	{ path: "/books/:alphabet", component: Books, exact: true },
	{ path: "/book/:id", component: Book, exact: true },
	{ path: "/login", component: LoginForm },
	{ path: "/register", component: RegisterForm },
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
