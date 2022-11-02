import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import AuthContext from './components/storage/auth-context';
import Header from './components/Header';
import SellerPage from './components/sections/SellerPage.js';
import LandingPage from './components/sections/LandingPage';
import NewSeller from './components/sections/NewSeller';
import AllSellers from './components/sections/AllSellers';
import SellerAdminPage from './components/sections/SellerAdminPage';
import ProductPage from './components/sections/ProductPage';
import LoginPage from './components/sections/LoginSection';
import ProfilePage from './ProfilePage';
import BasketPage from './components/sections/BasketPage';

function App() {
	const authCtx = useContext(AuthContext);

	return (
		<main>
			<Header></Header>

			<Switch>
				<Route path="/" exact>
					<LandingPage />
				</Route>

				<Route path={`/seller-page/:sellerId`}>
					<SellerPage />
				</Route>

				<Route path={`/product/:productId`}>
					<ProductPage />
				</Route>

				<Route path="/all-sellers">
					<AllSellers />
				</Route>

				<Route path="/login">
					<LoginPage />
				</Route>

				<Route
					path={`/seller-admin/${
						authCtx.isLoggedIn ? authCtx.user.id : ''
					}`}
				>
					<SellerAdminPage />
				</Route>

				<Route path="/new-seller">
					<NewSeller />
				</Route>

				<Route path="/profile">
					<ProfilePage />
				</Route>

				<Route path="/basket">
					<BasketPage />
				</Route>
			</Switch>
		</main>
	);
}

export default App;
