import PocketBase from 'pocketbase';

const client = new PocketBase('http://127.0.0.1:8090');

const toggleState = function (setFunction, variable) {
	if (variable == false) {
		setFunction(true);
	} else {
		setFunction(false);
	}
};

const addToCart = async function (
	title,
	productID,
	basketId,
	qty
) {
	let data = {
		title: title,
		product_id: productID,
		basket_id: basketId,
		qty: qty,
	};
	const record = await client.records.create(
		'baskets',
		data
	);
	console.log(record);
};

export { toggleState, addToCart };
