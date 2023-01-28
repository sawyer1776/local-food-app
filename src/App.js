import React, { useContext } from 'react';
import { Route, Switch, useParams } from 'react-router-dom';
import AuthContext from './components/storage/auth-context';
import Header from './components/sections/Header';
import SellerPage from './components/pages/SellerPage.js';
import LandingPage from './components/pages/LandingPage';
import NewSeller from './components/pages/NewSellerPage';
import AllSellersPage from './components/pages/AllSellersPage';
import SellerAdminPage from './components/pages/SellerAdminPage';
import ProductPage from './components/pages/ProductPage';
import LoginSection from './components/sections/LoginSection';
import ProfilePage from './components/pages/ProfilePage';
import BasketPage from './components/pages/BasketPage';
import SearchResultsPage from './components/pages/SearchResultsPage';
import CheckoutPage from './components/pages/CheckoutPage';
import ProductsAdmin from './components/pages/ProductsAdmin';
import { Admin } from 'pocketbase';
import AdminContactPage from './components/pages/AdminContactPage';
import AdminLocationPage from './components/pages/AdminLocationPage';

function App() {
	const authCtx = useContext(AuthContext);
	const params = useParams();

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

				<Route path="/search-results">
					<SearchResultsPage />
				</Route>

				<Route path="/checkout">
					<CheckoutPage />
				</Route>

				<Route path="/all-sellers">
					<AllSellersPage />
				</Route>

				<Route path="/login">
					<LoginSection />
				</Route>

				<Route path={`/seller-admin/products`}>
					<ProductsAdmin />
				</Route>
				<Route path={`/seller-admin/contact`}>
					<AdminContactPage />
				</Route>
				<Route path={`/seller-admin/location`}>
					<AdminLocationPage />
				</Route>

				<Route path={`/seller-admin`}>
					<SellerAdminPage />
				</Route>

				<Route path="/new-seller">
					<NewSeller />
				</Route>

				<Route path={`/profile`}>
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
