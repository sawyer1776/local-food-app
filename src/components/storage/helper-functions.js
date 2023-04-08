import PocketBase from 'pocketbase';
import { GLOBALIP } from '../globalVars';

const client = new PocketBase(`${GLOBALIP}`);

const toggleState = function (setFunction, variable) {
	if (variable === false) {
		setFunction(true);
	} else {
		setFunction(false);
	}
};

const uploadCart = async function (newCart, userId) {
	console.log('what arrived', newCart);

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
	console.log('cartData', cartData);
	let data = {
		title: title,
		id: productID,
		qty: qty,
	};
	console.log('data is', data);
	let newCart = [];
	if (cartData.length > 0) {
		console.log('not Undefinded');
		console.log(cartData.length);
		newCart = cartData;
		let boolVar = false;
		newCart.forEach((item, index) => {
			if (item.id === data.id) {
				console.log(index);
				console.log(newCart[index].qty);
				console.log(data.qty);
				boolVar = true;
				newCart[index].qty += data.qty;
			}
		});

		if (boolVar === false) {
			console.log('false');
			newCart.push(data);
		}
	} else {
		console.log('Is undefined');
		newCart.push(data);
	}
	console.log('new Cart at end is', newCart);

	const jsonNewCart = {
		cart: { items: newCart },
	};

	uploadCart(JSON.stringify(jsonNewCart), userId);
};

export { toggleState, addToCart };
