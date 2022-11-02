import classes from './ProductAdminItem.module.css';

const ProductAdminItem = (props) => {
	return (
		<tr className={classes.trstItemContainer}>
			<td>{props.product.title}</td>
			<td>${props.product.price.toFixed(2)}</td>
			<td>{props.product.qty}</td>
			<td>
				<button
					onClick={() => {
						props.deleteFunc(props.product.id);
					}}
				>
					DEL
				</button>
			</td>
		</tr>
	);
};

export default ProductAdminItem;
