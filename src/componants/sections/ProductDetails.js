import classes from './ProductDetails.module.css';

const ProductDetails = (props) => {
	return (
		<ul>
			<h3>Details</h3>
			<li>
				{props.product.details.map((detail) => (
					<p>{detail}</p>
				))}
			</li>
		</ul>
	);
};

export default ProductDetails;
