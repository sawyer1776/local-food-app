import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import AuthContext from './componants/storage/auth-context';
import classes from './App.module.css';
import Header from './componants/Header';
import SellerPage from './componants/sections/SellerPage.js';
import LandingPage from './componants/sections/LandingPage';
import NewSeller from './componants/sections/NewSeller';
import AllSellers from './componants/sections/AllSellers';
import SellerAdminPage from './componants/sections/SellerAdminPage';
import ProductPage from './componants/sections/ProductPage';
import LoginPage from './componants/sections/LoginSection';
import ProfilePage from './ProfilePage';
import BasketPage from './componants/sections/BasketPage';

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

				<Route path="/profile/:profileId">
					<ProfilePage />
				</Route>

				<Route path="/basket/:profileId">
					<BasketPage />
				</Route>
			</Switch>
		</main>
	);
}

export default App;
