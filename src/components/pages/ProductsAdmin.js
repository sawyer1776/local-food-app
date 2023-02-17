import PocketBase from 'pocketbase';
import { useEffect, useState, useContext } from 'react';
import AuthContext from '../storage/auth-context';
import LoadingSpinner from '../UI/LoadingSpinner';
import AdminCurrentProductsSection from '../sections/AdminCurrentProductsSection';
import { HiArrowLeft } from 'react-icons/hi';
import classes from './ProductsAdminPage.module.css';
import { GLOBALIP } from '../globalVars';
import BackToAdmin from '../UI/BackToAdmin';
import EditingProductSection from '../sections/EditingProductSection';

const client = new PocketBase(`${GLOBALIP}`);

let productsList = {};

const ProductsAdmin = (props) => {
	const [isLoaded, setLoaded] = useState(false);
	const authCtx = useContext(AuthContext);
	const [isEditing, setEditing] = useState(null);

	console.log(authCtx);

	const editClickHandler = function (productId) {
		if (productId === null) {
			setLoaded(false);
			fetchProducts();
		}
		setEditing(productId);
	};

	const fetchProducts = async function () {
		const responseProducts = await client
			.collection('products')
			.getList(1, 50, {
				filter: `producer_id = "${authCtx.sellerPageId}"`,
			});

		productsList = responseProducts.items;
		console.log(productsList);
		setLoaded(true);
	};
	useEffect(() => {
		if (isLoaded) return;
		if (!isLoaded) fetchProducts();
	});

	if (!isLoaded) {
		return <LoadingSpinner />;
	}
	if (isLoaded && !isEditing) {
		return (
			<main className="container">
				<ul className={classes.list}>
					<li>
						<h1>Your Products</h1>
					</li>
					<li>
						<BackToAdmin />
					</li>
					<li>
						<AdminCurrentProductsSection
							productsList={productsList}
							editFunction={editClickHandler}
						/>
					</li>
					<li>
						<button
							onClick={() => {
								editClickHandler('new');
							}}
						>
							Add A New Product
						</button>
					</li>
				</ul>
			</main>
		);
	}
	if (isLoaded && isEditing) {
		return (
			<main className="container">
				<EditingProductSection
					id={isEditing}
					cancelFunction={editClickHandler}
				/>
			</main>
		);
	}
};

export default ProductsAdmin;
