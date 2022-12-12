import ReviewContainer from '../UI/ReviewContainer';
import ButtonElement from '../UI/ButtonElement';
import ImgDragSlider from '../UI/ImgDragSlider';
import ProductDetails from '../UI/ProductDetails';
import classes from './ProductPage.module.css';
import { addToCart } from '../storage/helper-functions';
import { useParams } from 'react-router-dom';
import PocketBase from 'pocketbase';
import { useState, useEffect, useContext } from 'react';
import AuthContext from '../storage/auth-context';

const client = new PocketBase('http://127.0.0.1:8090');
let thisSellerData = {};
let thisProduct = [];

const ProductPage = (props) => {
	const [isLoaded, setLoaded] = useState(false);
	let [addQty, setQty] = useState(1);
	const params = useParams();
	const authCtx = useContext(AuthContext);

	useEffect(() => {
		const fetchThisProduct = async function () {
			const responseProduct = await client.records.getOne(
				'products',
				params.productId
			);
			thisProduct = responseProduct;

			const responseSeller = await client.records.getOne(
				'producers',
				thisProduct.producer_id
			);
			thisSellerData = responseSeller;

			setLoaded(true);
		};

		if (isLoaded) return;
		if (!isLoaded) {
			fetchThisProduct();
		}
	});

	if (!isLoaded) return <h1>Loading...</h1>;

	if (isLoaded)
		return (
			<main className={classes.productContainer}>
				<div className={classes.titleReviews}>
					<h2 className={classes.title}>
						{thisProduct.title}
					</h2>
					<ReviewContainer product={thisProduct} />
				</div>
				<ImgDragSlider seller={thisProduct} />

				<div className={classes.priceAndStock}>
					<div className={classes.priceAndUnit}>
						<h3>${thisProduct.price.toFixed(2)}</h3>
						<p>per {thisProduct.unit}</p>
					</div>
					<p
						className={classes.inStock}
						style={
							thisProduct.qty <= 0
								? { color: 'red' }
								: { color: 'Green' }
						}
					>
						{thisProduct.qty > 0
							? `${thisProduct.qty} Availble`
							: 'Out of Stock'}
					</p>
				</div>
				<div className={classes.qtyAndAdd}>
					<div className={classes.qtyCounter}>
						<button
							style={
								addQty >= thisProduct.qty
									? { color: 'gray' }
									: { color: 'white' }
							}
							onClick={() => {
								if (addQty + 1 <= thisProduct.qty)
									setQty(addQty + 1);
							}}
							className={classes.qtyButton}
						>
							+
						</button>
						<p className={classes.qtyNumber}>{addQty}</p>
						<button
							style={
								addQty < 2
									? { color: 'gray' }
									: { color: 'white' }
							}
							onClick={() => {
								if (addQty >= 2) setQty(addQty - 1);
							}}
							className={classes.qtyButton}
						>
							-
						</button>
					</div>

					<button
						onClick={() => {
							addToCart(
								thisProduct.title,
								thisProduct.id,
								authCtx.user.id,
								1
							);
						}}
					>
						Add to Basket
					</button>
				</div>
				<ButtonElement buttonText="Pick Up / Meetup Options" />
				<p>{thisProduct.description}</p>
				<ProductDetails
					className={classes.details}
					details={thisProduct.details}
				/>
			</main>
		);
};

export default ProductPage;
