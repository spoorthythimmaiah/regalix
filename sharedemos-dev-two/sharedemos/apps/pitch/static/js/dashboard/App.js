import React from "react";
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import Home from "./containers/Home/Home";
import ToolBar from "./components/Toolbar/Toolbar";
import Reports from "./reports/Reports";

const App = () => {
    return (
		<Router basename="/dashboard/pitch">
			<ToolBar />
			<Switch>
				<Route path="/" exact component={Home} />
				<Route path="/reports" component={Reports} />
			
			</Switch>
		</Router>
    )
}

export default App;


