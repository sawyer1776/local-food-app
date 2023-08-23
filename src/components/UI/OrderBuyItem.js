import classes from './OrderItem.module.css';

const OrderBuyItem = (props) => {
	console.log(props.product);
	let total = 0;
	props.order.products.forEach((product) => {
		total += product.price * product.qty;
	});

	return (
		<tr className={classes.row}>
			<td>{props.order.created.slice(0, 10)}</td>

			<td>${total.toFixed(2)}</td>
		</tr>
	);
};

export default OrderBuyItem;
