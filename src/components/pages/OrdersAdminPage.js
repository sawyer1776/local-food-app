import PocketBase from 'pocketbase';
import { useContext, useEffect, useState } from 'react';
import classes from './OrdersAdminPage.module.css';
import Order from '../UI/Order';
import { GLOBALIP } from '../globalVars';
import AuthContext from '../storage/auth-context';

const client = new PocketBase(`${GLOBALIP}`);

let orders = {};

const OrdersAdminPage = (props) => {
	const [isLoaded, setLoaded] = useState(false);
	const authCtx = useContext(AuthContext);
	useEffect(() => {
		const fetchOrders = async function () {
			const responseOrders = await client
				.collection('orders')
				.getList(1, 50, {
					filter: `producer_id = "${authCtx.sellerPageId}"`,
				});
			orders = responseOrders.items;
			console.log('orders', orders);
			setLoaded(true);
		};
		if (isLoaded) return;
		if (!isLoaded) fetchOrders();
	});

	if (!isLoaded) {
		return <h1>loading...</h1>;
	}
	if (isLoaded) {
		return (
			<main className="container">
				<h1>Your Sold Orders</h1>
				<ul className={classes.list}>
					{orders.length > 0 ? (
						orders.map((order) => (
							<Order key={order.id} order={order} />
						))
					) : (
						<p>No Orders Yet</p>
					)}
				</ul>
			</main>
		);
	}
};

export default OrdersAdminPage;
