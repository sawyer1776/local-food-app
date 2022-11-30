import ReviewContainer from '../UI/ReviewContainer';
import ButtonElement from '../UI/ButtonElement';
import ImgSlider from '../UI/ImgSlider';
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
			<div>
				<div className={classes.titleReviews}>
					<h2 className={classes.title}>
						{thisProduct.title}
					</h2>
					<ReviewContainer product={thisProduct} />
				</div>
				<ImgSlider imgs={thisProduct} />
				<div className={classes.priceAndStock}>
					<div className={classes.priceAndUnit}>
						<h3>${thisProduct.price.toFixed(2)}</h3>
						<p>per {thisProduct.unit}</p>
					</div>
					<p>
						{thisProduct.qty > 0
							? 'Availble'
							: 'Out of Stock'}
					</p>
				</div>

				<p>qty</p>
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
				<ButtonElement buttonText="Pick Up / Meetup Options" />
				<p>{thisProduct.description}</p>
				<ProductDetails details={thisProduct.details} />
			</div>
		);
};

export default ProductPage;