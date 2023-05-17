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
import {
	fetchListedProducersProducts,
	fetchProducersPickups,
	fetchSeller,
} from '../storage/db-functions';
import { useQuery } from '@tanstack/react-query';
import ErrorMessage from '../UI/ErrorMessage';

const client = new PocketBase(`${GLOBALIP}`);

// let producer.data = {};
// let producersProducts.data = [];
// let producersPickups.data = [];
// let latLong = [];

const SellerPage = (props) => {
	const [showMore, setShowMore] = useState(false);
	const [showAbout, setShowAbout] = useState(false);
	const [showPickup, setShowPickup] = useState(false);
	const [showContact, setShowContact] = useState(false);
	const [isLoaded, setLoaded] = useState(false);
	const [mapIsLoaded, setMapIsLoaded] = useState(false);
	const params = useParams();

	const producersProducts = useQuery({
		queryKey: ['producersProducts', params.sellerId],
		queryFn: () => {
			fetchListedProducersProducts(params.sellerId);
		},
	});
	const producersPickups = useQuery({
		queryKey: ['producersPickups', params.sellerId],
		queryFn: () => {
			fetchListedProducersProducts(params.sellerId);
		},
	});
	const producer = useQuery({
		queryKey: ['producer', params.sellerId],
		queryFn: () => {
			fetchListedProducersProducts(params.sellerId);
		},
	});

	if (
		producer.isLoading ||
		producersProducts.isLoading ||
		producersPickups.isLoading
	) {
		return <LoadingSpinner />;
	}

	if (producer.isError) {
		return (
			<ErrorMessage
				errorMessage={producer.error.toString()}
			/>
		);
	}

	if (isLoaded) {
		return (
			<main
				className={`container ${classes.sellerContainer}`}
			>
				<div className={classes.title}>
					<div className={classes.titleAndReviews}>
						<h2 className={classes.name}>
							{producer.data.producer_name}
						</h2>
						<ul className={classes.reviewStarsContainer}>
							<ReviewStars
								className={classes.reviewStars}
								stars={producer.data.reviews}
							/>
						</ul>
					</div>
					<h3 className={classes.subtitle}>
						{producer.data.tagline}
					</h3>
				</div>

				<ImgDragSlider seller={producer.data} />

				<button
					className={`wide ${classes.firstBtn}`}
					onClick={() => {
						toggleState(setShowAbout, showAbout);
					}}
				>
					About
				</button>
				{showAbout ? (
					producer.data.about_description ? (
						<>
							<AboutSection
								aboutText={producer.data.about_description}
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
					<PickupSection
						pickupMeetups={producersPickups.data}
					/>
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
						email={producer.data.public_email}
						phone={producer.data.public_phone}
					/>
				) : null}

				<ul
					id="products-container"
					className={classes.productsContainer}
				>
					{producersProducts.data.length > 0 ? (
						producersProducts.data
							.slice(0, 2)
							.map((product) => (
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
						producersProducts.data
							.slice(2)
							.map((product) => (
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
					latLong={producer.data.lat_long}
				></MapSection>
			</main>
		);
	}
};

export default SellerPage;
