import OrderItem from '../UI/OrderItem';
import classes from './OrdersSection.module.css';

const OrderSection = (props) => {
	console.log('Orders', props.orders);
	return (
		<section className={classes.ordersContainer}>
			<h2 className={classes.title}>Your Orders:</h2>
			{props.orders ? (
				<table className={classes.table}>
					<thead>
						<tr>
							<th>Date</th>
							<th>Total</th>
						</tr>
					</thead>
					<tbody className={classes.tbody}>
						{props.orders.map((order, index) => (
							<OrderItem order={order} key={index} />
						))}
					</tbody>
				</table>
			) : (
				<p className={classes.noOrder}>No Orders Yet</p>
			)}
		</section>
	);
};

export default OrderSection;
