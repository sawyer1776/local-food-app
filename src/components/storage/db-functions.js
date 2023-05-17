import { GLOBALIP } from '../globalVars';
import PocketBase from 'pocketbase';

const client = new PocketBase(`${GLOBALIP}`);

export const fetchSellers = async function () {
	const data = await client
		.collection('producers')
		.getList(1, 25, {});
	return data.items;
};

export const fetchListedProducersProducts = async function (
	sellerId
) {
	const data = await client
		.collection('products')
		.getList(1, 50, {
			filter: `producer_id = '${sellerId}'`,
		});

	return data.items;
};

export const fetchProducersPickups = async function (
	sellerId
) {
	const data = await client
		.collection('pickup_meetups')
		.getList(1, 10, {
			filter: `producer_id = '${sellerId}'`,
		});
	return data.items;
};

export const fetchSeller = async function (sellerId) {
	console.log('fetching');
	const data = await client
		.collection('producers')
		.getOne(sellerId, {});
	console.log('data', data);
	return data;
};
