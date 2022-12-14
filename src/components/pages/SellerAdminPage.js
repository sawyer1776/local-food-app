import AuthContext from '../storage/auth-context';
import { useContext, useEffect, useState } from 'react';
import PocketBase from 'pocketbase';
import LoginSection from '../sections/LoginSection';
import ProductAdminItem from '../UI/ProductAdminItem';
import InputsSection from '../sections/InputsSection';
import LoadingSpinner from '../UI/LoadingSpinner';
import { toggleState } from '../storage/helper-functions';
import classes from './SellerAdminPage.module.css';
import { BsPencil } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const client = new PocketBase('http://127.0.0.1:8090');
let adminData = null;
let productList = [];

const SellerAdminPage = () => {
	const [isLoaded, setLoaded] = useState(false);
	const [addingAProduct, setAddingAProduct] =
		useState(false);
	const authCtx = useContext(AuthContext);
	console.log('ctx', authCtx);
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

	const deleteProduct = async function (recordId) {
		await client.records.delete('products', recordId);
		setLoaded(false);
		fetchData();
	};

	const addingProductFunc = () => {
		toggleState(setAddingAProduct, addingAProduct);
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
	console.log('admin data', adminData);
	return (
		<main className="container">
			<h1>Seller Admin Page</h1>
			<h4 className={classes.titleLine}>
				Title:{' '}
				<Link
					// to={`/seller-page/${adminData}`}
					className={classes.title}
				>
					{isLoaded ? (
						adminData.producer_name
					) : (
						<LoadingSpinner />
					)}
				</Link>{' '}
				<BsPencil />
			</h4>
			<ul>
				<li>
					<table className={classes.adminTable}>
						<thead>
							<tr>
								<th>Edit</th>
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
						<InputsSection
							addingProductFunc={addingProductFunc}
						/>
					) : null}
					<button
						className={classes.addBtn}
						onClick={() => {
							toggleState(
								setAddingAProduct,
								addingAProduct
							);
						}}
					>
						{addingAProduct
							? 'Nevermind '
							: 'Add A Product'}
					</button>
				</li>
			</ul>
		</main>
	);
};
export default SellerAdminPage;
