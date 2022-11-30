import classes from './ProductSnapshot.module.css';
import ReviewContainer from '../UI/ReviewContainer';
import ThumbnailImg from './ThumbnailImg';
import { BsStarFill } from 'react-icons/bs';
import ReviewStars from './ReviewStars';

const ProductSnapshot = (props) => {
	return (
		<div className={classes.productContainer}>
			<ThumbnailImg product={props.product} />

			<h2 className={classes.title}>
				{props.product.title}
			</h2>
			<div className={classes.priceContainer}>
				<h3 className={classes.price}>
					${props.product.price}
				</h3>

				<p>Per {props.product.unit}</p>

				{/* <div className={classes.reviewAndQty}>
					<p className={classes.unit}>
						per {props.product.unit}
					</p>

					<ReviewContainer
						className={classes.stars}
						product={props.product}
					/>
				</div> */}
			</div>

			<ul className={classes.stars}>
				<ReviewStars stars={props.product.stars} />
			</ul>
		</div>
	);
};

export default ProductSnapshot;
