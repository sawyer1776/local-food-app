import PocketBase from 'pocketbase';
import { useEffect, useState } from 'react';
import SellerLink from '../UI/SellerLink';
import SellersMapSection from '../sections/SellersMapSection';
import LoadingSpinner from '../UI/LoadingSpinner';
import classes from './AllSellersPage.module.css';
import { GLOBALIP } from '../globalVars';

const client = new PocketBase(`${GLOBALIP}`);

let allSellersData = [];

const AllSellers = (props) => {
	const [isLoaded, setLoaded] = useState(false);
	useEffect(() => {
		props.selectIconFunc('home');
		const fetchProducers = async function () {
			//PAGINATE with PARAMS
			const responseProducersData = await client
				.collection('producers')
				.getList(1, 25, {});
			allSellersData = responseProducersData.items;

			console.log('data', allSellersData);

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
			<main>
				<section className="container">
					<h1 className={classes.title}>
						Find A Seller Near You
					</h1>
					<SellersMapSection sellers={allSellersData} />
					<h1 className={classes.title}>All Sellers</h1>
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
			</main>
		);
	}
};

export default AllSellers;
