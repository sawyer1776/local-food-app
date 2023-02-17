import PocketBase from 'pocketbase';

export const GLOBALIP = 'http://167.71.182.79';

const client = new PocketBase(`${GLOBALIP}`);

export function TESTFUNC(input) {
	console.log('Test Sucessful', input);
	/* … */
}
export async function pbLoad(
	collection,
	filterColumn,
	filterTerm
) {
	const response = await client
		.collection(`${collection}`)
		.getList(1, 50, {
			filter: `${filterColumn} = "${filterTerm}"`,
		});

	return response.items;
}
