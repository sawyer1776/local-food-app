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
import MapSection from '../sections/MapSection';
import ImgDragSlider from '../UI/ImgDragSlider';
import ContactInfoSection from '../sections/ContactInfoSection';
import { GLOBALIP } from '../globalVars';

const client = new PocketBase(`${GLOBALIP}`);

let thisSellerData = {};
let productList = [];
let pickupList = [];
let latLong = [];

const SellerPage = (props) => {
	const [showMore, setShowMore] = useState(false);
	const [showAbout, setShowAbout] = useState(false);
	const [showPickup, setShowPickup] = useState(false);
	const [showContact, setShowContact] = useState(false);
	const [isLoaded, setLoaded] = useState(false);
	const [mapIsLoaded, setMapIsLoaded] = useState(false);
	const params = useParams();
	useEffect(() => {
		const fetchListedProducersProducts = async function () {
			//CREATE EXCEPTION FOR LOADING MANY PRODUCTS
			const responseProducts = await client
				.collection('products')
				.getList(1, 100, {
					filter: `producer_id = '${params.sellerId}'`,
				});
			productList = responseProducts.items;
		};

		const fetchProducersPickups = async function () {
			const responseProducts = await client
				.collection('pickup_meetups')
				.getList(1, 10, {
					filter: `producer_id = '${params.sellerId}'`,
				});
			pickupList = responseProducts.items;
		};

		const fetchSeller = async function () {
			const responseSeller = await client
				.collection('producers')
				.getOne(params.sellerId, {});
			thisSellerData = responseSeller;
		};

		const initFetch = async function () {
			const allFetches = async function () {
				await fetchListedProducersProducts();
				await fetchProducersPickups();
				await fetchSeller();
			};
			await allFetches();

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
			<main
				className={`container ${classes.sellerContainer}`}
			>
				<div className={classes.title}>
					<div className={classes.titleAndReviews}>
						<h2 className={classes.name}>
							{thisSellerData.producer_name}
						</h2>
						<ul className={classes.reviewStarsContainer}>
							<ReviewStars
								className={classes.reviewStars}
								stars={thisSellerData.reviews}
							/>
						</ul>
					</div>
					<h3 className={classes.subtitle}>
						{thisSellerData.tagline}
					</h3>
				</div>

				<ImgDragSlider seller={thisSellerData} />

				<button
					className={`wide ${classes.firstBtn}`}
					onClick={() => {
						toggleState(setShowAbout, showAbout);
					}}
				>
					About
				</button>
				{showAbout ? (
					thisSellerData.avout_description ? (
						<>
							<AboutSection
								aboutText={thisSellerData.about_description}
								edit={false}
							/>
							<button
								className={classes.showLessBtn}
								onClick={() => {
									toggleState(setShowAbout, showAbout);
								}}
							>
								Show Less
							</button>
						</>
					) : (
						<p>This Seller Hasn't filled this out yet</p>
					)
				) : null}
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
				<button
					className="wide"
					onClick={() => {
						toggleState(setShowContact, showContact);
					}}
				>
					Get In Touch
				</button>
				{showContact ? (
					<ContactInfoSection
						email={thisSellerData.public_email}
						phone={thisSellerData.public_phone}
					/>
				) : null}

				<ul
					id="products-container"
					className={classes.productsContainer}
				>
					{productList.length > 0 ? (
						productList.slice(0, 2).map((product) => (
							<Link to={`/product/${product.id}`}>
								<ProductSnapshot
									product={product}
									key={product.id}
								/>
							</Link>
						))
					) : (
						<p className={classes.productWarning}>
							No Products yet.
						</p>
					)}

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

				<MapSection
					latLong={thisSellerData.lat_long}
				></MapSection>
			</main>
		);
	}
};

export default SellerPage;
