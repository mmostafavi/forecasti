import React, {Component} from 'react';

import Layout from "./containers/Layout/Layout.js";
import Contacts from "./components/StaticPages/Contacts/Contacts"
import BehindScene from "./components/StaticPages/BehindScene/BehindScene"
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom"


class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={Layout}/>
                    <Route path="/contacts" component={Contacts}/>
                    <Route path="/behind-scene" component={BehindScene}/>
                    <Redirect to="/"/>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
