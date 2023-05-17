import PocketBase from 'pocketbase';
import { useEffect, useState } from 'react';
import SellerLink from '../UI/SellerLink';
import SellersMapSection from '../sections/SellersMapSection';
import LoadingSpinner from '../UI/LoadingSpinner';
import classes from './AllSellersPage.module.css';
import { GLOBALIP } from '../globalVars';
import { useQuery } from '@tanstack/react-query';
import { fetchSellers } from '../storage/db-functions';
import ErrorMessage from '../UI/ErrorMessage';

const AllSellers = (props) => {
	const sellers = useQuery({
		queryKey: ['allSellers'],
		queryFn: fetchSellers,
	});

	if (sellers.isLoading) {
		return <LoadingSpinner />;
	}
	if (sellers.dataUpdatedAtisError) {
		return (
			<ErrorMessage
				errorMessage={sellers.error.toString()}
			/>
		);
	}

	return (
		<section className="container">
			<h1 className={classes.title}>
				Find A Seller Near You
			</h1>
			<SellersMapSection sellers={sellers.data} />
			<h1 className={classes.title}>All Sellers</h1>
			<div className={classes.sellerLinks}>
				{sellers.data.map((seller) => (
					<SellerLink
						seller={seller}
						id={seller.id}
						key={seller.id}
					/>
				))}
			</div>
		</section>
	);
};

export default AllSellers;
