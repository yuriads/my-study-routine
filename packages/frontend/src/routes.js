import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

import Logon from './pages/Logon';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NewSubject from './pages/NewSubject';
import UpdateSubject from './pages/UpdateSubject';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Logon} />
                <Route path="/register" component={Register} />
                
                <Route path="/profile" component={Profile} />
                <Route path="/subjects/new" component={NewSubject} />
                <Route path="/subjects/update/:id" component={UpdateSubject} />
            </Switch>
        </BrowserRouter>
    );
}