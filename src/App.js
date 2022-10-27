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
import ProductPage from './componants/sections/ProductPage';
import SellerPageRouter from './componants/sections/SellerPageRouter';

const client = new PocketBase('http://127.0.0.1:8090');
let currentProduct = {};
let productStatic = {};
let producerStatic = {};
let producerId = '7de2hsj7oxu2rtc';
let allSellersData = [];
let allProductsData = [];

function App() {
	const [isLoaded, setLoaded] = useState(false);
	const authCtx = useContext(AuthContext);

	useEffect(() => {
		const fetchListedProducersProducts = async function () {
			console.log('trying');
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
			console.log('products static', productStatic);
			setLoaded(true);
		};

		const fetchOneProducer = async function () {
			const response = await client.records.getOne(
				'producers',
				producerId,
				{
					sort: '-created',
				}
			);
			producerStatic = response;
			console.log('ProducerStatic', producerStatic);
		};
		const fetchAllProducers = async function () {
			const responseProducersData =
				await client.records.getList(
					'producers',
					1,
					1000,
					{}
				);
			allSellersData = responseProducersData.items;

			setLoaded(true);
		};
		const fetchAllProducts = async function () {
			const responseProducts = await client.records.getList(
				'products',
				1,
				1000
			);
			allProductsData = responseProducts.items;
			setLoaded(true);
		};

		if (isLoaded) return;
		if (!isLoaded) {
			fetchAllProducers();
			// fetchOneProducer();
			// fetchListedProducersProducts();
			fetchAllProducts();
		}
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

				<Route path={`/seller-page/:sellerId`}>
					<SellerPage />
				</Route>
				<Route path={`/product/:productId`}>
					<ProductPage />
				</Route>

				{/* 
				{allProductsData.map((product) => (
					<Route path={`/product/${product.id}`}>
						<ProductPage
							product={product}
							key={product.id}
						/>
					</Route>
				))} */}

				<Route path="/create-new-page">
					<InputsPage></InputsPage>
				</Route>
			</Switch>
		</main>
	);
}

export default App;
