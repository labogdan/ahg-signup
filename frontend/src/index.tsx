import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import { withAuthenticationRequired } from "@auth0/auth0-react";

import UserForm from "./UserForm";
import DisplayUsers from "./DisplayUsers";
import Confirmation from "./Confirmation";



// @ts-ignore
/*export const ProtectedRoute = ({ component }) => {
    const Component = withAuthenticationRequired(component, {
    });
    return <Component />;
};*/

const domain = process.env.REACT_APP_AUTH0_DOMAIN || ''
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID || ''

ReactDOM.render(
    <Auth0Provider
        domain={domain}
        clientId={clientId}
        redirectUri={process.env.REACT_APP_AUTH0_REDIRECT_URI}
    >
    <Router>
        <Routes>
            <Route path="/" element={<UserForm />} />
            <Route path="confirmation" element={<Confirmation />} />
            <Route path="admin" element={<DisplayUsers />} />
        </Routes>
    </Router>
    </Auth0Provider>,
    document.getElementById("root")
)
