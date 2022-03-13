import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Main from './Main/Main'
import PitchReport from './PitchReport/PitchReport'
import UserReport from './UserReport/UserReport'
import './style.css';

const Reports=  () =>  {
    return (
        <Router basename="/dashboard/pitch/reports">
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/:uuid" exact component={PitchReport} />
                <Route path="/:uuid/user_details" component={UserReport} />
            </Switch>
        </Router>
    );
}

export default Reports;