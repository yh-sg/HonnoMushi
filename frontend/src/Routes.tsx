import React from "react";
import { Switch, Route, RouteProps } from "react-router-dom";

import HomePage from "./components/HomePage/HomePage";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import Books from "./containers/Books/Books";
import PageNotFound from "./components/PageNotFound/PageNotFound";

export const ROUTES: RouteProps[] = [
	{ path: "/", component: HomePage, exact: true },
	{ path: "/about", component: About },
	{ path: "/contact", component: Contact },
	{ path: "/books/:letter", component: Books, exact: true },
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
