import PocketBase from 'pocketbase';
import { useContext, useEffect, useState } from 'react';
import BasketItem from '../UI/BasketItem';
import ThumbnailImg from '../UI/ThumbnailImg';
import AuthContext from '../storage/auth-context';

const client = new PocketBase('http://127.0.0.1:8090');

let currentTotal = 0;

const BasketPage = (props) => {
	const [basketContents, setBasketContents] = useState([]);
	const [isLoaded, setLoaded] = useState(false);
	const [theTotal, setTotal] = useState(0);
	const authCtx = useContext(AuthContext);

	let itemsList = [];

	const editCount = function (symbol) {
		if (symbol === '+') console.log('Add');
		if (symbol === '-') console.log('Subtract');
	};

	const calcTotal = function () {
		currentTotal = 0;
		itemsList.forEach((product) => {
			currentTotal += product[2].price * product[1];
			console.log(currentTotal);
		});

		setTotal(currentTotal);
	};

	const fetchBasketData = async function () {
		const linkLoadItem = async function (link, qty, id) {
			console.log('LinkLoad');
			const responseBasketItem =
				await client.records.getOne('products', link);
			console.log(
				'Actual product returned',
				responseBasketItem
			);

			itemsList.push([id, qty, responseBasketItem]);
			console.log('list', itemsList);
		};
		console.log('resetting Item List');
		itemsList = [];

		const responseBasket = await client.records.getList(
			'baskets',
			1,
			100,
			{ filter: `basket_id = "${authCtx.user.id}"` }
		);
		console.log(
			'Got Baskets should link load after this',
			responseBasket
		);
		responseBasket.items.forEach((item) => {
			linkLoadItem(item.product_id, item.qty, item.id);
		});
		console.log('This should be last');
		setBasketContents(itemsList);
		calcTotal();
		setLoaded(true);
	};

	const deleteItem = async function (itemId) {
		await client.records.delete('baskets', itemId);
		fetchBasketData();
	};

	useEffect(() => {
		if (isLoaded) return;
		if (!isLoaded) fetchBasketData();
	});

	if (!isLoaded) {
		return <h1>loading...</h1>;
	}

	if (isLoaded) {
		return (
			<section>
				<h1>Your Basket</h1>
				<ul>
					{basketContents.length > 0 ? (
						basketContents.map((product) => (
							<BasketItem
								id={product[0]}
								product={product[2]}
								qty={product[1]}
								editCountFunc={editCount}
								deleteFunc={deleteItem}
								key={product[2].id}
							/>
						))
					) : (
						<p>Your Cart is Empty</p>
					)}
				</ul>
				<h2>Your Total is ${theTotal}</h2>
				<button onClick={fetchBasketData}>Calc </button>
			</section>
		);
	}
};

export default BasketPage;
