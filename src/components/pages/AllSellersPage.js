import PocketBase from 'pocketbase';
import { useEffect, useState } from 'react';
import SellerLink from '../UI/SellerLink';
import LoadingSpinner from '../UI/LoadingSpinner';

const client = new PocketBase('http://127.0.0.1:8090');

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
			<section>
				<h1>All Sellers</h1>
				<div>
					{allSellersData.map((seller) => (
						<SellerLink
							seller={seller}
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
