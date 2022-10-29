import classes from './SellerPage.module.css';
import ImgSlider from './ImgSlider';
import ButtonElement from '../UI/ButtonElement';
import ProductSnapshot from './ProductSnapshot';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import PocketBase from 'pocketbase';
import LoadingSpinner from '../miniComponents/LoadingSpinner';
import AboutSection from './AboutSection';

const client = new PocketBase('http://127.0.0.1:8090');
let thisSellerData = {};
let productList = [];

const SellerPage = (props) => {
	let [showMore, setShowMore] = useState(false);
	let [showAbout, setShowAbout] = useState(false);
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

	const toggleShowMore = function () {
		if (showMore == false) {
			setShowMore(true);
		} else {
			setShowMore(false);
		}
	};
	const toggleShowAbout = function () {
		if (showAbout == false) {
			setShowAbout(true);
		} else {
			setShowAbout(false);
		}
	};

	if (!isLoaded) {
		return <LoadingSpinner />;
	}
	if (isLoaded) {
		return (
			<section className={classes.container}>
				<h2>{thisSellerData.producer_name}</h2>
				<ImgSlider imgs={thisSellerData} />
				<button onClick={toggleShowAbout}>About</button>
				{showAbout ? (
					<AboutSection
						aboutText={thisSellerData.description}
					/>
				) : null}
				<button>All Products</button>

				<ul
					id="products-container"
					className={classes.featuredContainer}
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
					onClick={toggleShowMore}
					className={classes.moreBtn}
				>
					{showMore ? 'Show Less' : 'Show More'}
				</button>
			</section>
		);
	}
};

export default SellerPage;
