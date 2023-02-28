import classes from './OrderItem.module.css';

const OrderItem = (props) => {
	return (
		<tr className={classes.row}>
			<td>{props.product.qty}</td>
			<td>{props.product.unit}</td>
			<td>{props.product.title}</td>
			<td>${props.product.price.toFixed(2)}</td>
			<td>ea</td>
		</tr>
	);
};

export default OrderItem;
