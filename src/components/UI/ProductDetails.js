import classes from './ProductDetails.module.css';

const ProductDetails = (props) => {
	return (
		<div className={classes.container}>
			<h3>Product Details</h3>
			<ul className={classes.list}>
				{props.details.items.map((detail, index) => (
					<li key={index} className={classes.listItem}>
						<p>{detail}</p>
					</li>
				))}
			</ul>
		</div>
	);
};

export default ProductDetails;
