import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { user_logout } from './modules/user';
import Auth from './hoc/auth';

import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import FindInfoPage from './pages/FindInfoPage';
import FindIdResultPage from './pages/FindIdResultPage';
import MyPagePage from './pages/MyPagePage';
import ServicePage from './pages/ServicePage';
import ProductPage from './pages/ProductPage';
import IntroPage from './pages/IntroPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import PaymentPage from './pages/PaymentPage';
import PaymentResultPage from './pages/PaymentResultPage';
import OrderChangePage from './pages/OrderChangePage';

const App = () => {
	const dispatch = useDispatch();
	window.addEventListener('unload', () => {
		dispatch(user_logout());
	});

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
						path='/find-result'
						component={Auth(FindIdResultPage, false)}
					/>
					<Route
						exact
						path='/members'
						component={Auth(MyPagePage, true)}
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
						path='/detail/:product_id'
						component={Auth(ProductDetailPage, null)}
					/>
					<Route exact path='/intro' component={Auth(IntroPage, null)} />
					<Route exact path='/cart' component={Auth(CartPage, null)} />
					<Route
						exact
						path='/payment'
						component={Auth(PaymentPage, true)}
					/>
					<Route
						exact
						path='/payment/result/:payment_id'
						component={Auth(PaymentResultPage, null)}
					/>
					<Route
						exact
						path='/claim'
						component={Auth(OrderChangePage, true)}
					/>
				</Switch>
			</div>
		</Router>
	);
};

export default App;
