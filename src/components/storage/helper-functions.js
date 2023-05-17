import PocketBase from 'pocketbase';
import { GLOBALIP } from '../globalVars';
import LoadingSpinner from '../UI/LoadingSpinner';

const client = new PocketBase(`${GLOBALIP}`);

const toggleState = function (setFunction, variable) {
	if (variable === false) {
		setFunction(true);
	} else {
		setFunction(false);
	}
};

const uploadCart = async function (newCart, userId) {
	await client
		.collection('users')
		.update(`${userId}`, newCart);
};

const addToCart = function (
	title,
	productID,
	qty,
	cartData,
	userId
) {
	console.log(
		'addToCart',
		title,
		productID,
		qty,
		cartData,
		userId
	);
	let data = {
		title: title,
		id: productID,
		qty: qty,
	};

	let newCart = [];
	if (cartData.length > 0) {
		newCart = cartData;
		let boolVar = false;
		newCart.forEach((item, index) => {
			if (item.id === data.id) {
				boolVar = true;
				newCart[index].qty += data.qty;
				console.log('newCart match', newCart[index]);
			}
		});

		if (boolVar === false) {
			newCart.push(data);
			console.log('newCart no match', newCart);
		}
	} else {
		newCart.push(data);
		console.log('newCart empty', newCart);
	}

	const jsonNewCart = {
		cart: { items: newCart },
	};

	uploadCart(JSON.stringify(jsonNewCart), userId);
};

export { toggleState, addToCart };
