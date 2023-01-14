import { NavLink, Route } from 'react-router-dom';
import ButtonElement from '../UI/ButtonElement';
import classes from './LandingPage.module.css';
import NewSeller from './NewSellerPage.js';
import AuthContext from '../storage/auth-context';
import { useContext } from 'react';
import { FaCarrot } from 'react-icons/fa';

const LandingPage = (props) => {
	const authCtx = useContext(AuthContext);

	console.log('authContext', authCtx);
	return (
		<main className="container">
			<section>
				<h1 className={classes.title}>NAME OF APP HERE</h1>
				<FaCarrot className={classes.carrot} />

				<h2 className={classes.heading}>
					Find Food That Is Grown Close To Home
				</h2>
				<h4 className={classes.subHeading}>
					Meet local producers near you. From the gardener
					down the street to full time farmers.
				</h4>
				<NavLink to="/all-sellers">
					<button>View Producers</button>
				</NavLink>
			</section>
			<section></section>

			<NavLink to="/new-seller">
				<ButtonElement buttonText="Sign up to be a seller" />
			</NavLink>
		</main>
	);
};

export default LandingPage;
