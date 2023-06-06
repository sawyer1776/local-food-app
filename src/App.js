import React, { useContext, useState } from 'react';
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
import AdminPickupsPage from './components/pages/AdminPickupsPage';
import AdminAboutPage from './components/pages/AdminAboutPage';
import AdminSellerImgsPage from './components/pages/AdminSellerImgsPage';
import AdminTitlePage from './components/pages/AdminTitlePage';
import OrdersAdminPage from './components/pages/OrdersAdminPage';

function App() {
	const authCtx = useContext(AuthContext);
	const params = useParams();
	const [selected, setSelected] = useState(null);

	const selectIcon = function (arg) {
		setSelected(arg);
	};

	return (
		<main>
			<Header selected={selected}></Header>

			<Switch>
				<Route path="/" exact>
					<LandingPage selectIconFunc={selectIcon} />
				</Route>

				<Route path={`/seller-page/:sellerId`}>
					<SellerPage selectIconFunc={selectIcon} />
				</Route>

				<Route path={`/product/:productId`}>
					<ProductPage selectIconFunc={selectIcon} />
				</Route>

				<Route path="/search-results">
					<SearchResultsPage selectIconFunc={selectIcon} />
				</Route>

				<Route path="/checkout">
					<CheckoutPage selectIconFunc={selectIcon} />
				</Route>

				<Route path="/all-sellers">
					<AllSellersPage selectIconFunc={selectIcon} />
				</Route>

				<Route path="/login">
					<LoginSection />
				</Route>

				<Route path={`/seller-admin/products`}>
					<ProductsAdmin />
				</Route>
				<Route path={`/seller-admin/orders`}>
					<OrdersAdminPage />
				</Route>
				<Route path={`/seller-admin/contact`}>
					<AdminContactPage />
				</Route>
				<Route path={`/seller-admin/location`}>
					<AdminLocationPage />
				</Route>
				<Route path={`/seller-admin/pickups`}>
					<AdminPickupsPage />
				</Route>
				<Route path={`/seller-admin/about`}>
					<AdminAboutPage />
				</Route>
				<Route path={`/seller-admin/seller-imgs`}>
					<AdminSellerImgsPage />
				</Route>
				<Route path={`/seller-admin/title`}>
					<AdminTitlePage />
				</Route>

				<Route path={`/seller-admin`}>
					<SellerAdminPage />
				</Route>

				<Route path="/new-seller">
					<NewSeller />
				</Route>

				<Route path={`/profile`}>
					<ProfilePage selectIconFunc={selectIcon} />
				</Route>

				<Route path="/basket">
					<BasketPage selectIconFunc={selectIcon} />
				</Route>
			</Switch>
		</main>
	);
}

export default App;
