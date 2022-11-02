import AuthContext from '../storage/auth-context';
import { useContext, useEffect, useState } from 'react';
import PocketBase from 'pocketbase';
import LoginSection from './LoginSection';
import ProductAdminItem from './ProductAdminItem';
import InputsPage from './InputsPage';

const client = new PocketBase('http://127.0.0.1:8090');
let adminData = null;
let productList = [];

const SellerAdminPage = () => {
	const [isLoaded, setLoaded] = useState(false);
	const [addingAProduct, setAddingAProduct] =
		useState(false);
	const authCtx = useContext(AuthContext);

	const toggleAddingAProduct = function () {
		if (addingAProduct == false) {
			setAddingAProduct(true);
		} else {
			setAddingAProduct(false);
		}
	};

	const deleteProduct = function (recordId) {
		client.records.delete('products', recordId);
	};

	useEffect(() => {
		const fetchListedProducersProducts = async function () {
			//CREATE EXCEPTION FOR LOADING MANY PRODUCTS
			const responseProducts = await client.records.getList(
				'products',
				1,
				100,
				{
					filter: `producer_id = '${authCtx.sellerPageId}'`,
				}
			);
			productList = responseProducts.items;
		};

		const fetchAdminData = async function () {
			const responseAdminData =
				await client.records.getList('producers', 1, 1, {
					filter: `id = '${authCtx.sellerPageId}'`,
				});
			adminData = responseAdminData.items[0];
			console.log(adminData);
		};

		const initFetch = async function () {
			await fetchListedProducersProducts();
			await fetchAdminData();
			setLoaded(true);
		};

		if (authCtx.isLoggedIn) {
			initFetch();
			console.log('Fetching Data');
		}
	});

	//This doesn't work, if not logged in it loads null data and error
	if (!authCtx.isLoggedIn) return <LoginSection />;

	if (!isLoaded) {
		return <h1>Loading</h1>;
	}

	if (isLoaded) {
		return (
			<section>
				<h1>Seller Admin Page</h1>
				<h3>
					What you call yourself {adminData.producer_name}
				</h3>
				<ul>
					{productList.map((product, index) => (
						<ProductAdminItem
							index={index}
							product={product}
							key={product.id}
							deleteFunc={deleteProduct}
						/>
					))}
					<li>
						{addingAProduct ? <InputsPage /> : null}
						<button onClick={toggleAddingAProduct}>
							{addingAProduct
								? 'Nevermind '
								: 'Add A Product'}
						</button>
					</li>
				</ul>
			</section>
		);
	}
};

export default SellerAdminPage;
