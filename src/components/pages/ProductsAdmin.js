import PocketBase from 'pocketbase';
import { useEffect, useState, useContext } from 'react';
import AuthContext from '../storage/auth-context';
import LoadingSpinner from '../UI/LoadingSpinner';
import AdminCurrentProductsSection from '../sections/AdminCurrentProductsSection';
import GLOBALIP from '../globalVars';

const client = new PocketBase(`${GLOBALIP}`);

let productsList = {};

const ProductsAdmin = (props) => {
	const [isLoaded, setLoaded] = useState(false);
	const authCtx = useContext(AuthContext);
	const [isEditing, setEditing] = useState(null);

	console.log(authCtx);

	const editClickHandler = function (productId) {
		setEditing(productId);
	};

	useEffect(() => {
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
		if (isLoaded) return;
		if (!isLoaded) fetchProducts();
	});

	if (!isLoaded) {
		return <LoadingSpinner />;
	}
	if (isLoaded && !isEditing) {
		return (
			<main className="container">
				<h1>Your Products</h1>;
				<ul>
					<li>
						<AdminCurrentProductsSection
							productsList={productsList}
							editFunction={editClickHandler}
						/>
					</li>
					<li>
						<button>Add A New Product</button>
					</li>
				</ul>
			</main>
		);
	}
	if (isLoaded && isEditing) {
		return (
			<div>
				<h2>Editing {isEditing}</h2>
				<button
					onClick={() => {
						editClickHandler(null);
					}}
				>
					CANCEL
				</button>
			</div>
		);
	}
};

export default ProductsAdmin;
