import PocketBase from 'pocketbase';
import { useContext, useEffect, useState } from 'react';
import BasketItem from '../UI/BasketItem';
import AuthContext from '../storage/auth-context';
import classes from './BasketPage.module.css';

//testDATA
// {
//   "items": [
//     {
//       "id": "mf55gm1hyah1i27",
//       "qty": 1
//     },
//     {
//       "id": "a9mocdst87l86rv",
//       "qty": 3
//     },
//     {
//       "id": "x1e7z6qjcjjg4hs",
//       "qty": 2
//     }
//   ]
// }

const client = new PocketBase('http://127.0.0.1:8090');

let currentTotal = 0;
let basketContents = [];

const BasketPage = (props) => {
	const [isLoaded, setLoaded] = useState(false);
	const [theTotal, setTotal] = useState(0);
	const [test, setTest] = useState(1);

	const authCtx = useContext(AuthContext);

	let cartIds = authCtx.user.profile.cart.items;

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
		const responseBasketContents =
			await client.records.getOne(
				'products',
				`${productId}`,
				{}
			);
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
		console.log('pre', basketContents);
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
		if (isLoaded) return;
		if (!isLoaded) {
			basketContents = [];
			cartIds.forEach((item, i) => {
				fetchBasketContents(item.id, item.qty, i);
			});
		}
	});

	if (!isLoaded) {
		return <h1>...Loading</h1>;
	}

	if (isLoaded) {
		return (
			<main className="container">
				{/* <button
					onClick={() => {
						setTest(test + 1);
					}}
				>
					TEST
				</button> */}
				<h2 className={classes.subtotal}>
					Subtotal: ${theTotal.toFixed(2)}
				</h2>
				<button>Proceed to Checkout</button>

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
			</main>
		);
	}
};

export default BasketPage;
