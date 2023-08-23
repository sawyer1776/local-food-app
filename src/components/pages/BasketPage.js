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
		console.log(tempBasketContent);
		//Format JSON
		//Send Order to DB
		// Later make multiple orders for multiple sellers
		const send = async () => {
			const tempProductsVar = [];
			tempBasketContent.forEach((item) => {
				tempProductsVar.push({
					title: item.product.title,
					unit: item.product.unit,
					qty: item.qty,
					price: item.product.price,
				});
			});
			console.log('tempProductsVar', tempProductsVar);
			const data = {
				products: JSON.stringify(tempProductsVar),
				producer_id: `${tempBasketContent[0].product.producer_id}`,
				buyer_id: `${authCtx.user.id}`,
				buyer_name: `${authCtx.user.name}`,
			};

			await client.collection('orders').create(data);
			await client
				.collection('users')
				.update(`${authCtx.user.id}`, {
					cart: { items: [] },
				});
			console.log('Order Sent');
		};
		send();
	};

	const updateDB = function () {
		console.log('updateDB is called');
		setBasketContents(tempBasketContent);

		let tempItems = [];
		tempBasketContent.forEach((item) => {
			tempItems.push({
				id: item.product.id,
				qty: item.qty,
				title: item.product.title,
			});
		});
		console.log('temp Items', tempItems);
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
		console.log('deleteItem is called', index);
		tempBasketContent.splice(index, 1);
		calcTotal();
		updateDB();
	};

	const loadContent = function () {
		console.log(
			'LoadContent is called should only happen once'
		);
		let tempVar = [];
		if (!authCtx.user.cart.items.length > 0) {
			setLoaded(true);
			return;
			// setBasketContents([]);
			// setTotal(0);
		}

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
		props.selectIconFunc('basket');
		console.log('useEffect is called');
		if (!authCtx.isLoggedIn) return;
		if (isLoaded) return;
		if (!isLoaded) {
			//why is this called twice?
			//a: because of the useEffect in the LoginSection
			//the login use effect is temporary and can be removed later.
			console.log('is not loaded');
			loadContent();
		}
	});

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
