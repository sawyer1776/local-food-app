import PocketBase from 'pocketbase';
import { useEffect, useState } from 'react';
import SellerLink from './SellerLink';

const client = new PocketBase('http://127.0.0.1:8090');

let allSellersData = [];

const AllSellers = (props) => {
	const [isLoaded, setLoaded] = useState(false);
	useEffect(() => {
		const fetchProducers = async function () {
			const responseProducersData =
				await client.records.getList(
					'producers',
					1,
					100,
					{}
				);
			allSellersData = responseProducersData.items;
			console.log('response Data', allSellersData);
			console.log(typeof allSellersData);
			console.count();
			setLoaded(true);
		};
		if (isLoaded) return;
		if (!isLoaded) fetchProducers();
	});

	if (!isLoaded) {
		return <h1>loading...</h1>;
	}
	if (isLoaded) {
		return (
			<section>
				<h1>All Sellers</h1>
				<div>
					{allSellersData.map((seller) => (
						<SellerLink
							name={seller.producer_name}
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
