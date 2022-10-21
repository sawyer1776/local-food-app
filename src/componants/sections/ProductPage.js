import ReviewContainer from '../miniComponents/ReviewContainer';
import ButtonElement from '../UI/ButtonElement';
import ImgSlider from './ImgSlider';
import ProductDetails from './ProductDetails';
import classes from './ProductPage.module.css';
import ProductSnapshotList from './ProductSnapshotList';
import { Link, Route, useParams } from 'react-router-dom';
const ProductPage = (props) => {
	const params = useParams();
	const inStock = function (props) {
		if (props.product.qty > 0) {
			return 'Available';
		} else {
			return 'Out Of Stock';
		}
	};

	return (
		<div>
			{/* <h1>{iD}</h1> */}
			<h1>{params.productId}</h1>
			<div className={classes.titleReviews}>
				<h2 className={classes.title}>
					{props.product.title}
				</h2>
				<ReviewContainer product={props.product} />
			</div>
			<ImgSlider imgs={props.product} />
			<div className={classes.priceAndStock}>
				<div className={classes.priceAndUnit}>
					<h3>${props.product.price.toFixed(2)}</h3>
					<p>per {props.product.unit}</p>
				</div>
				<p>{inStock(props)}</p>
			</div>

			<p>qty</p>
			<ButtonElement buttonText="Add To Basket" />
			<ButtonElement buttonText="Pick Up / Meetup Options" />
			<p>{props.product.description}</p>
			{/* <ProductDetails product={props.product} /> */}
			{/* <ProductSnapshotList
				allProducts={props.allProducts}
			/> */}
		</div>
	);
};

export default ProductPage;
