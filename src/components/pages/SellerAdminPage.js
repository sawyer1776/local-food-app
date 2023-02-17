import classes from './SellerAdminPage.module.css';
import { HiArrowRight } from 'react-icons/hi';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../storage/auth-context';

const SellerAdminPage = (props) => {
	const authCtx = useContext(AuthContext);
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
						to={`/seller-admin/about`}
					>
						<button className={classes.adminButton}>
							<h3 className={classes.adminButtonTitle}>
								About You
							</h3>
							<HiArrowRight />
						</button>
					</NavLink>
				</li>
				<li className={classes.listItem}>
					<NavLink
						className={classes.link}
						to={`/seller-admin/seller-imgs`}
					>
						<button className={classes.adminButton}>
							<h3 className={classes.adminButtonTitle}>
								Seller Images
							</h3>
							<HiArrowRight />
						</button>
					</NavLink>
				</li>
				<li className={classes.listItem}>
					<NavLink
						className={classes.link}
						to={`/seller-admin/title`}
					>
						<button className={classes.adminButton}>
							<h3 className={classes.adminButtonTitle}>
								Title
							</h3>
							<HiArrowRight />
						</button>
					</NavLink>
				</li>
				<li className={classes.listItem}>
					<NavLink
						className={classes.link}
						to={`/seller-page/${authCtx.sellerPageId}`}
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
