import classes from './ProductSnapshot.module.css';
import ReviewContainer from '../UI/ReviewContainer';

const ProductSnapshot = (props) => {
	return (
		<div className={classes.productContainer}>
			{/* Make dynamic */}
			<img
				className={classes.productImg}
				src={`http://127.0.0.1:8090/api/files/ktbhywrwv3kbqar/${props.product.id}/${props.product.imgs[0]}`}
			></img>
			<h2 className={classes.title}>
				{props.product.title}
			</h2>
			<div className={classes.priceContainer}>
				<h3 className={classes.price}>
					${props.product.price}
				</h3>
				<div className={classes.reviewAndQty}>
					<p className={classes.unit}>
						per {props.product.unit}
					</p>

					<ReviewContainer product={props.product} />
				</div>
			</div>
		</div>
	);
};

export default ProductSnapshot;
