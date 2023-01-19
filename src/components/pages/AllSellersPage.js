import PocketBase from 'pocketbase';
import { useEffect, useState } from 'react';
import SellerLink from '../UI/SellerLink';
import LoadingSpinner from '../UI/LoadingSpinner';
import classes from './AllSellersPage.module.css';
import GLOBALIP from '../globalVars';

const client = new PocketBase(`${GLOBALIP}`);

let allSellersData = [];

const AllSellers = (props) => {
	const [isLoaded, setLoaded] = useState(false);
	useEffect(() => {
		const fetchProducers = async function () {
			//PAGINATE with PARAMS
			const responseProducersData =
				await client.records.getList(
					'producers',
					1,
					25,
					{}
				);
			allSellersData = responseProducersData.items;

			setLoaded(true);
		};
		if (isLoaded) return;
		if (!isLoaded) fetchProducers();
	});

	if (!isLoaded) {
		return <LoadingSpinner />;
	}
	if (isLoaded) {
		return (
			<section className="container">
				<h1>All Sellers</h1>
				<div className={classes.sellerLinks}>
					{allSellersData.map((seller) => (
						<SellerLink
							seller={seller}
							id={seller.id}
							key={seller.id}
						/>
					))}
				</div>
			</section>
		);
	}
};

export default AllSellers;
