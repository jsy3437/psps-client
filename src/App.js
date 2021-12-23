import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Auth from './hoc/auth';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import FindInfoPage from './pages/FindInfoPage';
import ServicePage from './pages/ServicePage';
import ProductPage from './pages/ProductPage';
import IntroPage from './pages/IntroPage';
import ProductDetailPage from './pages/ProductDetailPage';

const App = () => {
	return (
		<Router>
			<div id='App'>
				<Navbar />
				<Switch>
					<Route exact path='/' component={Auth(HomePage, null)} />
					<Route exact path='/login' component={Auth(LoginPage, false)} />
					<Route
						exact
						path='/register'
						component={Auth(RegisterPage, false)}
					/>
					<Route
						exact
						path='/find-info'
						component={Auth(FindInfoPage, false)}
					/>
					<Route
						exact
						path='/service'
						component={Auth(ServicePage, null)}
					/>
					<Route
						exact
						path='/product'
						component={Auth(ProductPage, null)}
					/>
					<Route
						exact
						path='/detail/:productId'
						component={Auth(ProductDetailPage, null)}
					/>
					<Route exact path='/intro' component={Auth(IntroPage, null)} />
				</Switch>
			</div>
		</Router>
	);
};

export default App;
