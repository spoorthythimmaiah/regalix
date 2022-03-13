import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import List from "./List/List";
import Pitch from "./Pitch/Pitch";
import "../style.css";


class App extends Component {

	render() {
		return (
			<Router>
				<Switch>
					<Route path="/pitch" exact component={List} />
					<Route path="/pitch/:uuid" exact component={Pitch} />
					<Route path="/edit/pitch/:uuid" exact component={Pitch} />
				</Switch>
			</Router>
		);
	}

}

export default App;