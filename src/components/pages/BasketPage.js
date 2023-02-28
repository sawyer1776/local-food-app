import PocketBase from 'pocketbase';
import { useContext, useEffect, useState } from 'react';
import BasketItem from '../UI/BasketItem';
import AuthContext from '../storage/auth-context';
import classes from './BasketPage.module.css';
import LoadingSpinner from '../UI/LoadingSpinner';
import { NavLink } from 'react-router-dom';
import LoginSection from '../sections/LoginSection';
import { GLOBALIP } from '../globalVars';

const client = new PocketBase(`${GLOBALIP}`);

let currentTotal = 0;
let basketContents = [];

const BasketPage = (props) => {
	const [isLoaded, setLoaded] = useState(false);
	const [theTotal, setTotal] = useState(0);
	const [test, setTest] = useState(1);

	const authCtx = useContext(AuthContext);
	const sendToDB = async (data) => {
		await client.collection('orders').create(data);
	};

	const sendOrder = () => {
		let order = [];
		console.log('basket', basketContents);
		basketContents.forEach((item) => {
			order.push({
				id: item.item.id,
				title: item.item.title,
				unit: item.item.unit,
				qty: item.qty,
				price: item.item.price,
			});
		});
		console.log('Order', order);
		console.log('stringed', JSON.stringify(order));
		console.log('ctx', authCtx);
		const data = {
			products: JSON.stringify(order),
			producer_id: 'k9rfk6p2epvhe6c',
			buyer_id: authCtx.user.id,
			buyer_name: authCtx.user.name,
		};
		sendToDB(data);
	};

	// let cartIds = authCtx.user.cart.items;
	let cartIds = null;

	const calcTotal = function () {
		console.log('calcTotal');
		let subtotal = 0;
		basketContents.forEach((product, i) => {
			const extendedPrice =
				product.item.price * product.qty;

			subtotal = subtotal + extendedPrice;
		});
		setTotal(subtotal);
	};

	const editCount = function (symbol, itemId) {
		if (symbol === '+') {
			basketContents.forEach((_, i) => {
				if (basketContents[i].item.id === itemId) {
					basketContents[i].qty++;
				}
			});
			cartIds.forEach((_, i) => {
				if (cartIds[i].id === itemId) {
					cartIds[i].qty++;
				}
			});
			calcTotal();
			setTest(test + 1);
		}
		if (symbol === '-') {
			basketContents.forEach((_, i) => {
				if (basketContents[i].item.id === itemId) {
					if (basketContents[i].qty > 1) {
						basketContents[i].qty--;
					}
				}
			});
			cartIds.forEach((_, i) => {
				if (cartIds[i].id === itemId) {
					cartIds[i].qty--;
				}
			});

			calcTotal();
			setTest(test + 1);
		}
	};

	const fetchBasketContents = async function (
		productId,
		qty,
		i
	) {
		const responseBasketContents = await client
			.collection('products')
			.getOne(`${productId}`, {});
		basketContents.push({
			item: responseBasketContents,
			qty: qty,
		});

		if (i === cartIds.length - 1) {
			setTimeout(() => {
				calcTotal();
				setLoaded(true);
			}, 120);
		}
	};

	const deleteItem = function (itemId) {
		let indexContent = null;
		let indexIds = null;
		basketContents.forEach((_, i) => {
			if (basketContents[i].item.id === itemId) {
				indexContent = i;
			}
		});
		cartIds.forEach((_, i) => {
			if (cartIds[i].id === itemId) {
				indexIds = i;
			}
		});

		if (indexContent != null) {
			basketContents.splice(indexContent, 1);
			cartIds.splice(indexContent, 1);

			calcTotal();
			setTest(test + 1);
		}
	};

	useEffect(() => {
		if (!authCtx.isLoggedIn) return;
		if (isLoaded) return;
		if (!isLoaded) {
			basketContents = [];
			cartIds = authCtx.user.cart.items;

			cartIds.forEach((item, i) => {
				fetchBasketContents(item.id, item.qty, i);
			});
		}
	});

	if (!authCtx.isLoggedIn) return <LoginSection />;

	if (!isLoaded) {
		return <LoadingSpinner />;
	}

	if (isLoaded) {
		return (
			<main className="container">
				{/* <h2 className={classes.subtotal}>
					Subtotal: ${theTotal.toFixed(2)}
				</h2>
				<button>Proceed to Checkout</button> */}

				<ul className={classes.list}>
					{basketContents.length > 0 ? (
						basketContents.map((product) => (
							<BasketItem
								product={product.item}
								qty={product.qty}
								editCountFunc={editCount}
								deleteFunc={deleteItem}
								key={product.item.id}
							/>
						))
					) : (
						<p>Your Cart is Empty</p>
					)}
				</ul>
				<h2 className={classes.subtotal}>
					Subtotal: ${theTotal.toFixed(2)}
				</h2>
				<NavLink to="/checkout" onClick={sendOrder}>
					<button>Proceed to Checkout</button>
				</NavLink>
			</main>
		);
	}
};

export default BasketPage;
