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
let tempBasketContent = [];
let otherVar = [];

const BasketPage = (props) => {
	const [isLoaded, setLoaded] = useState(false);
	const [isTotal, setTotal] = useState(0);
	const [isBasketContents, setBasketContents] = useState(
		[]
	);

	const authCtx = useContext(AuthContext);
	console.log('Auth', authCtx);

	// const sendToDB = async (data) => {
	// 	await client.collection('orders').create(data);
	// };

	// const sendOrder = () => {
	// 	let order = [];
	// 	console.log('basket', basketContents);
	// 	basketContents.forEach((item) => {
	// 		order.push({
	// 			id: item.item.id,
	// 			title: item.item.title,
	// 			unit: item.item.unit,
	// 			qty: item.qty,
	// 			price: item.item.price,
	// 		});
	// 	});
	// 	console.log('Order', order);
	// 	console.log('stringed', JSON.stringify(order));
	// 	console.log('ctx', authCtx);
	// 	const data = {
	// 		products: JSON.stringify(order),
	// 		producer_id: 'k9rfk6p2epvhe6c',
	// 		buyer_id: authCtx.user.id,
	// 		buyer_name: authCtx.user.name,
	// 	};
	// 	sendToDB(data);
	// };

	// // let cartIds = authCtx.user.cart.items;
	// let cartIds = null;

	// const calcTotal = function () {
	// 	console.log('calcTotal');
	// 	let subtotal = 0;
	// 	basketContents.forEach((product, i) => {
	// 		const extendedPrice =
	// 			product.item.price * product.qty;

	// 		subtotal = subtotal + extendedPrice;
	// 	});
	// 	setTotal(subtotal);
	// };

	// const editCount = function (symbol, itemId) {
	// 	console.log('symbol', symbol, 'id', itemId);
	// 	console.log('contents', basketContents);
	// 	if (symbol === '+') {
	// 		basketContents.forEach((_, i) => {
	// 			if (basketContents[i].item.id === itemId) {
	// 				basketContents[i].qty++;
	// 			}
	// 		});
	// 		cartIds.forEach((_, i) => {
	// 			if (cartIds[i].id === itemId) {
	// 				cartIds[i].qty++;
	// 			}
	// 		});
	// 		calcTotal();
	// 		setTest(test + 1);
	// 	}
	// 	if (symbol === '-') {
	// 		basketContents.forEach((_, i) => {
	// 			if (basketContents[i].item.id === itemId) {
	// 				if (basketContents[i].qty > 1) {
	// 					basketContents[i].qty--;
	// 				}
	// 			}
	// 		});
	// 		cartIds.forEach((_, i) => {
	// 			if (cartIds[i].id === itemId) {
	// 				cartIds[i].qty--;
	// 			}
	// 		});

	// 		calcTotal();
	// 		setTest(test + 1);
	// 	}
	// };

	// const fetchBasketContents = async function (
	// 	productId,
	// 	qty,
	// 	i
	// ) {
	// 	const responseBasketContents = await client
	// 		.collection('products')
	// 		.getOne(`${productId}`, {});
	// 	basketContents.push({
	// 		item: responseBasketContents,
	// 		qty: qty,
	// 	});
	// 	console.log('basket contents', basketContents);

	// 	if (i === cartIds.length - 1) {
	// 		setTimeout(() => {
	// 			calcTotal();
	// 			setLoaded(true);
	// 		}, 120);
	// 	}
	// };

	// const deleteItem = function (itemId) {
	// 	let indexContent = null;
	// 	let indexIds = null;
	// 	basketContents.forEach((_, i) => {
	// 		if (basketContents[i].item.id === itemId) {
	// 			indexContent = i;
	// 		}
	// 	});
	// 	cartIds.forEach((_, i) => {
	// 		if (cartIds[i].id === itemId) {
	// 			indexIds = i;
	// 		}
	// 	});

	// 	if (indexContent != null) {
	// 		basketContents.splice(indexContent, 1);
	// 		cartIds.splice(indexContent, 1);

	// 		calcTotal();
	// 		setTest(test + 1);
	// 	}
	// };
	const editCountFunc = function (symbol, itemIndex) {
		console.log(symbol, itemIndex);
		console.log(tempBasketContent);
		if (symbol === '-') {
			tempBasketContent[itemIndex].qty--;
		}
		if (symbol === '+') {
			tempBasketContent[itemIndex].qty++;
		}
		calcTotal();
		updateDB();
	};

	const calcTotal = function () {
		let tempVar = 0;
		tempBasketContent.forEach((item) => {
			tempVar += item.product.price * item.qty;
		});
		setTotal(tempVar);
	};

	const sendOrder = function () {
		console.log('SENDING ORDER');
		//Format JSON
		//Send Order to DB
		// const send = async () => {
		// 	const data = {
		// 		products: 'JSON',
		// 		producer_id: 'test',
		// 		buyer_id: 'test',
		// 		buyer_name: 'test',
		// 	};

		// 	await client
		// 		.collection('users')
		// 		.update(`${authCtx.user.id}`, JSON.stringify(data));
		// };
		// send();
	};

	const updateDB = function () {
		setBasketContents(tempBasketContent);
		//This isn't triggering a re render for some reason
		let tempItems = [];
		tempBasketContent.forEach((item) => {
			tempItems.push({
				id: item.product.id,
				qty: item.qty,
			});
		});
		const send = async () => {
			const data = {
				cart: {
					items: tempItems,
				},
			};

			await client
				.collection('users')
				.update(`${authCtx.user.id}`, JSON.stringify(data));
		};
		send();
	};

	const deleteItem = function (index) {
		tempBasketContent.splice(index, 1);
		updateDB();
	};

	const loadContent = function () {
		console.log(
			'LoadContent is called should only happen once'
		);
		let tempVar = [];

		authCtx.user.cart.items.forEach(async (item, index) => {
			const responseProduct = await client
				.collection('products')
				.getOne(`${item.id}`, {});
			tempVar.push({
				product: responseProduct,
				qty: item.qty,
			});
			if (index + 1 === authCtx.user.cart.items.length) {
				setBasketContents(tempVar);
				tempBasketContent = tempVar;
				calcTotal();
				setLoaded(true);
			}
		});
	};

	useEffect(() => {
		if (!authCtx.isLoggedIn) return;
		if (isLoaded) return;
		if (!isLoaded) {
			loadContent();
		}
	});

	// useEffect(() => {
	// 	if (!authCtx.isLoggedIn) return;
	// 	if (isLoaded) return;
	// 	if (!isLoaded) {
	// 		basketContents = [];
	// 		cartIds = authCtx.user.cart.items;

	// 		cartIds.forEach((item, i) => {
	// 			fetchBasketContents(item.id, item.qty, i);
	// 		});
	// 	}
	// });

	if (!authCtx.isLoggedIn) return <LoginSection />;

	if (!isLoaded) {
		return <LoadingSpinner />;
	}

	if (isLoaded) {
		return (
			<main className="container">
				<ul className={classes.list}>
					{isBasketContents.length > 0 ? (
						isBasketContents.map((item, index) => (
							<BasketItem
								product={item.product}
								qty={item.qty}
								editCountFunc={editCountFunc}
								deleteFunc={deleteItem}
								index={index}
								key={item.product.id}
							/>
						))
					) : (
						<p>Your Cart is Empty</p>
					)}
				</ul>

				<h2 className={classes.subtotal}>
					Total: ${isTotal.toFixed(2)}
				</h2>
				<NavLink to="/checkout" onClick={sendOrder}>
					<button>Proceed to Checkout</button>
				</NavLink>
			</main>
		);
	}
};

export default BasketPage;
