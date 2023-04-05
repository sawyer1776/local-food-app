import { NavLink, Route } from 'react-router-dom';
import ButtonElement from '../UI/ButtonElement';
import classes from './LandingPage.module.css';
import NewSeller from './NewSellerPage.js';
import AuthContext from '../storage/auth-context';
import { useContext } from 'react';
import {
	FaCarrot,
	FaMapMarkerAlt,
	FaTruck,
} from 'react-icons/fa';

import { IoLogoVenmo } from 'react-icons/io5';

const LandingPage = (props) => {
	const authCtx = useContext(AuthContext);

	return (
		<main
			className={`container ${classes.landingPageContainer}`}
		>
			<section className={classes.heroSection}>
				<h2 className={classes.headingText}>
					Find your next meal from a local farm or backyard
					gardner
				</h2>

				<NavLink to="/all-sellers">
					<button>View Producers</button>
				</NavLink>
			</section>
			<ul className={classes.howItWorks}>
				<li>
					<h3 className={classes.title}>How it works</h3>
				</li>
				<li>
					<FaMapMarkerAlt className={classes.icon} />
					<h4 className={classes.subHeading}>
						Look on the map local producers near you. From
						the gardener down the street to full time
						farmers.
					</h4>
					<NavLink to="/all-sellers">
						<button>View Producers</button>
					</NavLink>
				</li>
				<li>
					<FaCarrot className={classes.icon} />
					<h4 className={classes.subHeading}>
						Browse the food products they offer
					</h4>

					<NavLink to="/profile">
						<ButtonElement buttonText="Sign Up" />
					</NavLink>
				</li>
				<li>
					<FaTruck className={classes.icon} />
					<h4 className={classes.subHeading}>
						Quickly see where and when you can pick it up
					</h4>
				</li>
				<li>
					<IoLogoVenmo className={classes.icon} />
					<h4 className={classes.subHeading}>
						Pay easily with Venmo
					</h4>
				</li>
			</ul>

			<NavLink to="/new-seller">
				<ButtonElement buttonText="Become a seller" />
			</NavLink>
			<NavLink to="/all-sellers">
				<ButtonElement buttonText="View On Map" />
			</NavLink>
		</main>
	);
};

export default LandingPage;
