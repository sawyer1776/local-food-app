import classes from './SellerAdminPage.module.css';
import { HiArrowRight } from 'react-icons/hi';
import { NavLink } from 'react-router-dom';

const SellerAdminPage = (props) => {
	return (
		<main className="container">
			<h1 className={classes.title}>Seller Admin Page</h1>
			<ul className={classes.listOfBtns}>
				<li className={classes.listItem}>
					<NavLink
						className={classes.link}
						to={`/seller-admin/products`}
					>
						<button className={classes.adminButton}>
							<h3 className={classes.adminButtonTitle}>
								Products
							</h3>
							<HiArrowRight />
						</button>
					</NavLink>
				</li>
				<li className={classes.listItem}>
					<NavLink
						className={classes.link}
						to={`/seller-admin/orders`}
					>
						<button className={classes.adminButton}>
							<h3 className={classes.adminButtonTitle}>
								Orders
							</h3>
							<HiArrowRight />
						</button>
					</NavLink>
				</li>
				<li className={classes.listItem}>
					<NavLink
						className={classes.link}
						to={`/seller-admin/pickups`}
					>
						<button className={classes.adminButton}>
							<h3 className={classes.adminButtonTitle}>
								Pickup Times
							</h3>
							<HiArrowRight />
						</button>
					</NavLink>
				</li>
				<li className={classes.listItem}>
					<NavLink
						className={classes.link}
						to={`/seller-admin/location`}
					>
						<button className={classes.adminButton}>
							<h3 className={classes.adminButtonTitle}>
								Location
							</h3>
							<HiArrowRight />
						</button>
					</NavLink>
				</li>
				<li className={classes.listItem}>
					<NavLink
						className={classes.link}
						to={`/seller-admin/contact`}
					>
						<button className={classes.adminButton}>
							<h3 className={classes.adminButtonTitle}>
								Contact Info
							</h3>
							<HiArrowRight />
						</button>
					</NavLink>
				</li>
				<li className={classes.listItem}>
					<NavLink
						className={classes.link}
						to={`/seller-admin/seller-page`}
					>
						<button className={classes.adminButton}>
							<h3 className={classes.adminButtonTitle}>
								Seller Page
							</h3>
							<HiArrowRight />
						</button>
					</NavLink>
				</li>
			</ul>
		</main>
	);
};

export default SellerAdminPage;
