import PocketBase from 'pocketbase';
import { useEffect, useState } from 'react';
import classes from './COMPONANTNAME.module.css';
import GLOBALIP from '../globalVars';

const client = new PocketBase(`${GLOBALIP}`);

let DATAVAR = {};

const COMPONANTNAME = (props) => {
	const [isLoaded, setLoaded] = useState(false);
	useEffect(() => {
		const FETCHFUNC = async function () {
			const RESPONSEDATA = await client
				.collection('producers')
				.getList(1, 100, {});
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
