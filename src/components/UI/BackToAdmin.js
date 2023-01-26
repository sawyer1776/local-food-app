import { NavLink } from 'react-router-dom';
import classes from './BackToAdmin.module.css';
import { HiArrowLeft } from 'react-icons/hi';

const BackToAdmin = (props) => {
	return (
		<NavLink to={'/seller-admin'}>
			<button className={classes.back}>
				<HiArrowLeft />
				<p>Back to admin page</p>
			</button>
		</NavLink>
	);
};

export default BackToAdmin;
