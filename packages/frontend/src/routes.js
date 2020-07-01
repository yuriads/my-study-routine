import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

import Logon from './pages/Logon';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NewSubject from './pages/NewSubject';
import UpdateSubject from './pages/UpdateSubject';
import Student from './pages/Student';
import NewStudent from './pages/NewStudent';
import UpdateStudent from './pages/UpdateStudent';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Logon} />
                <Route path="/register" component={Register} />
                
                <Route path="/profile" component={Profile} />

                <Route path="/subjects/new/:day" component={NewSubject} />
                <Route path="/subjects/update/:id/:day/:name/:start/:finish" component={UpdateSubject} />

                <Route path="/students" exact component={Student}/>
                <Route path="/students/new" component={NewStudent} />
                <Route path="/students/update/:id/:registration/:name/:shift/:course/:description" component={UpdateStudent} />
                
            </Switch>
        </BrowserRouter>
    );
}