import classes from './OrderItem.module.css';

const OrderItem = (props) => {
	console.log(props.product);
	// let total = 0;
	// props.order.products.forEach((product) => {
	// 	total += product.price * product.qty;
	// });
	return (
		<tr className={classes.row}>
			<td>{props.product.title}</td>

			<td>{props.product.qty}</td>
			<td>{props.product.unit}</td>
			<td>${props.product.price} ea</td>
		</tr>
	);
	// return (
	// 	<tr className={classes.row}>
	// 		<td>{props.order.created.slice(0, 10)}</td>

	// 		<td>${total.toFixed(2)}</td>
	// 	</tr>
	// );
};

export default OrderItem;
