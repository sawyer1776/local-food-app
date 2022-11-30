import classes from './SellerPage.module.css';
import ImgSlider from '../UI/ImgSlider';
import ProductSnapshot from '../UI/ProductSnapshot';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import PocketBase from 'pocketbase';
import LoadingSpinner from '../UI/LoadingSpinner';
import AboutSection from '../sections/AboutSection';
import PickupSection from '../sections/PickupSection';
import { toggleState } from '../storage/helper-functions';
import ReviewStars from '../UI/ReviewStars';

const client = new PocketBase('http://127.0.0.1:8090');
let thisSellerData = {};
let productList = [];

const SellerPage = (props) => {
	let [showMore, setShowMore] = useState(false);
	let [showAbout, setShowAbout] = useState(false);
	let [showPickup, setShowPickup] = useState(false);
	const [isLoaded, setLoaded] = useState(false);
	const params = useParams();
	useEffect(() => {
		const fetchListedProducersProducts = async function () {
			//CREATE EXCEPTION FOR LOADING MANY PRODUCTS
			const responseProducts = await client.records.getList(
				'products',
				1,
				100,
				{
					filter: `producer_id = '${params.sellerId}'`,
				}
			);
			productList = responseProducts.items;
		};

		const fetchSeller = async function () {
			const responseSeller = await client.records.getOne(
				'producers',
				params.sellerId,
				{
					sort: '-created',
				}
			);
			thisSellerData = responseSeller;
			console.log(thisSellerData);
		};

		const initFetch = async function () {
			await fetchListedProducersProducts();
			await fetchSeller();
			setLoaded(true);
		};

		if (isLoaded) return;
		if (!isLoaded) {
			initFetch();
		}
	});

	if (!isLoaded) {
		return <LoadingSpinner />;
	}
	if (isLoaded) {
		return (
			<section className={classes.container}>
				<div className={classes.title}>
					<div className={classes.titleAndReviews}>
						<h2>{thisSellerData.producer_name}</h2>
						<ul className={classes.reviewStarsContainer}>
							<ReviewStars
								className={classes.reviewStars}
								stars={thisSellerData.reviews}
							/>
						</ul>
					</div>
					<h3 className={classes.subtitle}>
						Backyard farm in the greater Opilika Al, area
					</h3>
				</div>
				<ImgSlider imgs={thisSellerData} />
				<button
					className="wide"
					onClick={() => {
						toggleState(setShowAbout, showAbout);
					}}
				>
					About
				</button>
				{showAbout ? (
					<AboutSection
						aboutText={thisSellerData.about_description}
					/>
				) : null}
				<button
					className="wide"
					onClick={() => {
						toggleState(setShowPickup, showPickup);
					}}
				>
					Pickup / Meetup Options
				</button>
				{showPickup ? <PickupSection /> : null}

				<ul
					id="products-container"
					className={classes.productsContainer}
				>
					{productList.slice(0, 2).map((product) => (
						<Link to={`/product/${product.id}`}>
							<ProductSnapshot
								product={product}
								key={product.id}
							/>
						</Link>
					))}

					{showMore &&
						productList.slice(2).map((product) => (
							<Link to={`/product/${product.id}`}>
								<ProductSnapshot
									product={product}
									key={product.id}
								/>
							</Link>
						))}
				</ul>
				<button
					onClick={() => {
						toggleState(setShowMore, showMore);
					}}
					className={classes.moreBtn}
				>
					{showMore ? 'Show Less' : 'Show More'}
				</button>
			</section>
		);
	}
};

export default SellerPage;
