import AuthContext from '../storage/auth-context';
import { useContext, useEffect, useState } from 'react';
import PocketBase from 'pocketbase';
import LoginSection from './LoginSection';
import ProductAdminItem from './ProductAdminItem';
import InputsPage from './InputsPage';
import LoadingSpinner from '../miniComponents/LoadingSpinner';

const client = new PocketBase('http://127.0.0.1:8090');
let adminData = null;
let productList = [];

const SellerAdminPage = () => {
	const [isLoaded, setLoaded] = useState(false);
	const [addingAProduct, setAddingAProduct] =
		useState(false);
	const authCtx = useContext(AuthContext);
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
		const responseAdminData = await client.records.getList(
			'producers',
			1,
			1,
			{
				filter: `id = '${authCtx.sellerPageId}'`,
			}
		);
		adminData = responseAdminData.items[0];
		console.log(adminData);
	};
	const fetchData = async function () {
		await fetchListedProducersProducts();
		await fetchAdminData();
		setLoaded(true);
	};

	const toggleAddingAProduct = function () {
		if (addingAProduct == false) {
			setAddingAProduct(true);
		} else {
			setAddingAProduct(false);
		}
	};

	const deleteProduct = async function (recordId) {
		await client.records.delete('products', recordId);
		setLoaded(false);
		fetchData();
	};

	const addingProductFunc = () => {
		toggleAddingAProduct();
		setLoaded(false);
		fetchData();
	};

	useEffect(() => {
		if (authCtx.isLoggedIn) {
			fetchData();
			console.log('Fetching Data');
		}
	});

	//This doesn't work, if not logged in it loads null data and error
	if (!authCtx.isLoggedIn) return <LoginSection />;

	return (
		<section>
			<h1>Seller Admin Page</h1>
			<h3>
				What you call yourself{' '}
				{isLoaded ? (
					adminData.producer_name
				) : (
					<LoadingSpinner />
				)}
			</h3>
			<ul>
				<li>
					<table>
						<thead>
							<tr>
								<th>Title</th>
								<th>Price</th>
								<th>Qty</th>
								<th>Delete</th>
							</tr>
						</thead>
						<tbody>
							{isLoaded ? (
								productList.map((product, index) => (
									<ProductAdminItem
										index={index}
										product={product}
										key={product.id}
										deleteFunc={deleteProduct}
									/>
								))
							) : (
								<LoadingSpinner />
							)}
						</tbody>
					</table>
				</li>
				<li>
					{addingAProduct ? (
						<InputsPage
							addingProductFunc={addingProductFunc}
						/>
					) : null}
					<button onClick={toggleAddingAProduct}>
						{addingAProduct
							? 'Nevermind '
							: 'Add A Product'}
					</button>
				</li>
			</ul>
		</section>
	);
};
export default SellerAdminPage;
