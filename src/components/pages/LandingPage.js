import { NavLink, Route } from 'react-router-dom';
import ButtonElement from '../UI/ButtonElement';
import classes from './LandingPage.module.css';
import NewSeller from './NewSellerPage.js';
import AuthContext from '../storage/auth-context';
import { useContext } from 'react';

const LandingPage = (props) => {
	const authCtx = useContext(AuthContext);

	console.log('authContext', authCtx);
	return (
		<main className="container">
			<NavLink to="/new-seller">
				<ButtonElement buttonText="Sign up to be a seller" />
			</NavLink>
			<NavLink to="/all-sellers">
				<ButtonElement buttonText="View Farmers" />
			</NavLink>
		</main>
	);
};

export default LandingPage;
