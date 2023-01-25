import classes from './OrdersSection.module.css';

const OrderSection = (props) => {
	return (
		<section className={classes.ordersContainer}>
			<h2 className={classes.title}>Your Orders:</h2>
			{props.orders ? (
				<p>Show orders Here</p>
			) : (
				<p className={classes.noOrder}>No Orders Yet</p>
			)}
		</section>
	);
};

export default OrderSection;
