import classes from './SellerPage.module.css';
// import chicken from './chicken.jpg';
import ImgSlider from './ImgSlider';
import ButtonElement from '../UI/ButtonElement';
import ProductSnapshot from './ProductSnapshot';
import { useState } from 'react';
import { Link, Route, useParams } from 'react-router-dom';
import ProductPage from './ProductPage';

const SellerPage = (props) => {
	let [showMore, setShowMore] = useState(false);
	const params = useParams();
	const toggleShowMore = function () {
		if (showMore == false) {
			setShowMore(true);
		} else {
			setShowMore(false);
		}
	};

	console.table(props.products);

	return (
		<section className={classes.container}>
			<Route path="/seller-page" exact>
				<h2>{props.producer.producer_name}</h2>
				<ImgSlider imgs={props.producer} />
				<ButtonElement
					buttonText="About"
					className={classes.btn}
				></ButtonElement>
				<ButtonElement
					buttonText="All Products"
					className={classes.btn}
				></ButtonElement>
				<ul className={classes.featuredContainer}>
					{props.products.slice(0, 2).map((product) => (
						<Link to={`/seller-page/${product.id}`}>
							<ProductSnapshot
								product={product}
								key={product.id}
							/>
						</Link>
					))}

					{showMore &&
						props.products.slice(2).map((product) => (
							<Link to={`/seller-page/${product.id}`}>
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
			</Route>

			{props.products.map((product) => (
				<Route path={`/seller-page/${product.id}`}>
					<ProductPage product={product} key={product.id} />
				</Route>
			))}
		</section>
	);
};

export default SellerPage;
