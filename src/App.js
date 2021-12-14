import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Auth from './hoc/auth';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';

const App = () => {
	return (
		<Router>
			<div id='App'>
				<Navbar />
				<Switch>
					<Route exact path='/' component={Auth(HomePage, null)} />
				</Switch>
			</div>
		</Router>
	);
};

export default App;
