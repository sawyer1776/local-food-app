import classes from './ProductDetails.module.css';

const ProductDetails = (props) => {
	return (
		<ul>
			<h3>Details</h3>
			<li>
				{props.details.items.map((detail, index) => (
					<p key={index}>{detail}</p>
				))}
			</li>
		</ul>
	);
};

export default ProductDetails;
