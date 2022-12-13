import classes from './SearchResultsPage.module.css';
import { useLocation, Link } from 'react-router-dom';
import ProductSnapshot from '../UI/ProductSnapshot';
import {
	HiArrowRight,
	HiArrowLeft,
	HiSortDescending,
} from 'react-icons/hi';

const SearchResultsPage = (props) => {
	const location = useLocation();
	const data = location.state.data;
	const searchTerm = location.state.searchTerm;
	console.log('at Search', location.state.data);
	return (
		<main className="container">
			<div className={classes.headingContainer}>
				<h3 className={classes.heading}>
					Search Results for: "{searchTerm}"
				</h3>
				<HiSortDescending className={classes.icon} />
			</div>
			<p className={classes.searchQty}>
				{data.length} result{data.length > 1 ? 's' : ''} for
				"{searchTerm}"
			</p>
			{data.length === 0 ? (
				<p className={classes.notFound}>
					Hmm...? I'm not finding anything for "{searchTerm}
					". Check your spelling or try something different.
				</p>
			) : (
				''
			)}
			<ul
				id="products-container"
				className={classes.productsContainer}
			>
				{data.map((product) => (
					<Link to={`/product/${product.id}`}>
						<ProductSnapshot
							product={product}
							key={product.id}
						/>
					</Link>
				))}
			</ul>
			<nav className={classes.arrowsContainer}>
				<button className={classes.iconButton}>
					<HiArrowLeft className={classes.icon} />
				</button>
				<button className={classes.iconButton}>
					<HiArrowRight className={classes.icon} />
				</button>
			</nav>
		</main>
	);
};

export default SearchResultsPage;
