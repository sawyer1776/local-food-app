import classes from './SellerPage.module.css';
import ImgSlider from './ImgSlider';
import ButtonElement from '../UI/ButtonElement';
import ProductSnapshot from './ProductSnapshot';
import { useState, useEffect } from 'react';
import { Link, Route, useParams } from 'react-router-dom';
import ProductPage from './ProductPage';
import PocketBase from 'pocketbase';

const client = new PocketBase('http://127.0.0.1:8090');
let thisSellerData = {};
let productList = [];

const SellerPage = (props) => {
	let [showMore, setShowMore] = useState(false);
	const [isLoaded, setLoaded] = useState(false);
	const params = useParams();
	useEffect(() => {
		const fetchListedProducersProducts = async function () {
			console.log('trying');
			const responseProducts = await client.records.getList(
				'products',
				1,
				100,
				{
					filter: `producer_id = '${params.sellerId}'`,
				}
			);
			productList = responseProducts.items;

			console.log('products', productList);
			console.log('product Slice', productList.slice(0, 2));
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
			console.log('Page Seller Data', thisSellerData);
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

	if (!isLoaded) {
		return <h1>loading...</h1>;
	}
	if (isLoaded) {
		return (
			<section className={classes.container}>
				<h1>Seller Page</h1>
				<p>{params.sellerId}</p>
				<h2>{thisSellerData.producer_name}</h2>
				<ImgSlider imgs={thisSellerData} />
				<ButtonElement
					buttonText="About"
					className={classes.btn}
				></ButtonElement>
				<ButtonElement
					buttonText="All Products"
					className={classes.btn}
				></ButtonElement>
				<ul className={classes.featuredContainer}>
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
