import ReviewContainer from '../UI/ReviewContainer';
import ButtonElement from '../UI/ButtonElement';
import ImgDragSlider from '../UI/ImgDragSlider';
import ProductDetails from '../UI/ProductDetails';
import classes from './ProductPage.module.css';
import { addToCart } from '../storage/helper-functions';
import { useParams } from 'react-router-dom';
import PocketBase from 'pocketbase';
import { useState, useEffect, useContext } from 'react';
import { toggleState } from '../storage/helper-functions';
import AuthContext from '../storage/auth-context';
import PickupSection from '../sections/PickupSection';

const client = new PocketBase('http://127.0.0.1:8090');
let thisSellerData = {};
let thisProduct = [];
let pickupList = [];

const ProductPage = (props) => {
	const [isLoaded, setLoaded] = useState(false);
	let [addQty, setQty] = useState(1);
	const [showPickup, setShowPickup] = useState(false);
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

		const fetchProducersPickups = async function () {
			const responseProducts = await client.records.getList(
				'pickup_meetups',
				1,
				10,
				{
					filter: `producer_id = '${thisProduct.producer_id}'`,
				}
			);
			pickupList = responseProducts.items;
		};

		const initFetch = async function () {
			const allFetches = async function () {
				await fetchThisProduct();
				await fetchProducersPickups();
			};
			await allFetches();

			setLoaded(true);
		};

		if (isLoaded) return;
		if (!isLoaded) {
			initFetch();
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
				<button
					className="wide"
					onClick={() => {
						toggleState(setShowPickup, showPickup);
					}}
				>
					Pickup / Meetup Times
				</button>
				{showPickup ? (
					<PickupSection pickupMeetups={pickupList} />
				) : null}

				<p>{thisProduct.description}</p>
				<ProductDetails
					className={classes.details}
					details={thisProduct.details}
				/>
			</main>
		);
};

export default ProductPage;
