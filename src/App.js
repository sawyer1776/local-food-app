import PocketBase from 'pocketbase';
import React, {
	useEffect,
	useState,
	useContext,
} from 'react';
import { Route, Switch } from 'react-router-dom';
import AuthContext from './componants/storage/auth-context';
import { NavLink } from 'react-router-dom';
import classes from './App.module.css';
import Header from './componants/Header';
import Categories from './componants/sections/Categories.js';
import SellerPage from './componants/sections/SellerPage.js';
import InputsPage from './componants/sections/InputsPage';
import LandingPage from './componants/sections/LandingPage';
import NewSeller from './componants/sections/NewSeller';
import AllSellers from './componants/sections/AllSellers';
import SellerAdminPage from './componants/sections/SellerAdminPage';

const client = new PocketBase('http://127.0.0.1:8090');
let currentProduct = {};
let productStatic = {};
let producerStatic = {};
let producerId = '7de2hsj7oxu2rtc';

function App() {
	const [isLoaded, setLoaded] = useState(false);
	const authCtx = useContext(AuthContext);

	useEffect(() => {
		const fetchStatic = async function () {
			const responseProducts = await client.records.getList(
				'products',
				1,
				100,
				{
					filter: `producer_id = '${producerId}'`,
				}
			);
			productStatic = responseProducts.items;
			currentProduct = productStatic[0];
			setLoaded(true);
		};

		const fetchProducerStatic = async function () {
			const response = await client.records.getOne(
				'producers',
				producerId,
				{
					sort: '-created',
				}
			);
			producerStatic = response;
		};
		fetchProducerStatic();
		fetchStatic();
	}, []);

	if (!isLoaded) {
		return <h1>loading...</h1>;
	}

	return (
		<main>
			<Header></Header>

			{/* <LoginPage /> */}

			<Switch>
				<Route path="/" exact>
					<LandingPage />
					<NavLink to="/seller-page">
						Go to Seller Page
					</NavLink>
					<NavLink to="/create-new-page">
						Create New Page
					</NavLink>
				</Route>

				<Route
					path={`/seller-admin/${
						authCtx.isLoggedIn ? authCtx.user.id : ''
					}`}
				>
					<SellerAdminPage></SellerAdminPage>
				</Route>

				<Route path="/new-seller">
					<NewSeller />
				</Route>
				<Route path="/all-sellers">
					<AllSellers />
				</Route>

				<Route path="/seller-page">
					<SellerPage
						key={producerStatic.id}
						producer={producerStatic}
						products={productStatic}
					/>
				</Route>
				<Route path="/create-new-page">
					<InputsPage></InputsPage>
				</Route>
			</Switch>
		</main>
	);
}

export default App;
