import classes from './Order.module.css';
import { HiMinus, HiPlus, HiX } from 'react-icons/hi';
import OrderItem from './OrderItem';
import { useState } from 'react';

const Order = (props) => {
	console.log('props.order', props.order);
	const [isExpanded, setExpanded] = useState(false);
	console.log(props.order.products);
	let total = 0;

	const toggleExpanded = () => {
		if (isExpanded) {
			setExpanded(false);
		}
		if (!isExpanded) {
			setExpanded(true);
		}
	};
	if (props.order.products) {
		props.order.products.forEach((product) => {
			let subtotal = product.price * product.qty;
			total = total + subtotal;
		});
		console.log(total);
	}
	return (
		<li className={classes.orderContainer}>
			{!isExpanded ? (
				<div
					onClick={toggleExpanded}
					className={classes.orderMini}
				>
					<p className={classes.name}>
						<HiPlus /> {props.order.buyer_name.slice(0, 15)}
					</p>
					<p className={classes.date}>
						{props.order.created.slice(0, 10)}
					</p>
					<p className={classes.total}>
						${total.toFixed(2)}
					</p>
				</div>
			) : (
				<div className={classes.expanded}>
					<div className={classes.heading}>
						<div>
							<h3>Order For {props.order.buyer_name}</h3>
							<h4>
								Ordered On{' '}
								{props.order.created.slice(0, 10)}
							</h4>
						</div>
						<HiX
							className={classes.x}
							onClick={toggleExpanded}
						/>
					</div>
					<table className={classes.table}>
						<thead></thead>
						<tbody className={classes.tableBody}>
							{props.order.products.map(
								(product, index) => (
									<OrderItem
										product={product}
										key={index}
									/>
								)
							)}
							<tr className={classes.totalRow}>
								<td></td>
								<td></td>
								<td className={classes.total}>Total: </td>
								<td className={classes.totalNum}>
									${total.toFixed(2)}
								</td>
								<td></td>
							</tr>
						</tbody>
					</table>
					<p className={classes.light}>
						Buyer Id: {props.order.buyer_id}
					</p>
					<p className={classes.light}>
						Order Id: {props.order.id}
					</p>
				</div>
			)}
		</li>
	);
};

export default Order;
