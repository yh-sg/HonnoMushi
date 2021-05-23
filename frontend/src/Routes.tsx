import React from 'react'
import {Switch,Route,Redirect,RouteProps} from "react-router-dom";

import HomePage from "./components/HomePage/HomePage";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import Books from "./containers/Books/Books";

export const ROUTES: RouteProps[] = [
    {path: '/', component: HomePage, exact: true},
    {path: '/about', component: About},
    {path: '/contact', component: Contact},
    {path: '/books/:letter', component: Books, exact: true},
]

export const Routes: React.FC = () => {
    return (
        <>
            <Switch>
                {ROUTES.map((route,i)=>(
                    <Route {...route} key={i}/>
                ))}
                <Route path="*" render={()=><div>Page Not Found</div>}/>
                <Redirect to="/"/>
            </Switch>
        </>
    )
}