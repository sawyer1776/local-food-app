import PocketBase from 'pocketbase';
import { useEffect, useState } from 'react';

const client = new PocketBase('http://127.0.0.1:8090');

let DATAVAR = {};

const COMPONANTNAME = (props) => {
	const [isLoaded, setLoaded] = useState(false);
	useEffect(() => {
		const FETCHFUNC = async function () {
			const RESPONSEDATA = await client.records.getList(
				'producers',
				1,
				100,
				{}
			);
			DATAVAR = RESPONSEDATA.items;
			setLoaded(true);
		};
		if (isLoaded) return;
		if (!isLoaded) FETCHFUNC();
	});

	if (!isLoaded) {
		return <h1>loading...</h1>;
	}
	if (isLoaded) {
		return <h1>CONTENT</h1>;
	}
};

export default COMPONANTNAME;
