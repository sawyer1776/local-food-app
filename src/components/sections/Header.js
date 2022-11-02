import {
	BsFillBasketFill,
	BsFillPersonFill,
} from 'react-icons/bs';
import { HiHome } from 'react-icons/hi';

import { GiHamburgerMenu } from 'react-icons/gi';

import classes from './Header.module.css';
import { NavLink } from 'react-router-dom';

const Header = (props) => {
	return (
		<div className={classes.header}>
			<GiHamburgerMenu className={classes.icon} />
			<NavLink to="/all-sellers">
				<HiHome className={classes.icon} />
			</NavLink>
			<input type="text" placeholder="Search"></input>
			<NavLink to="/profile">
				<BsFillPersonFill className={classes.icon} />
			</NavLink>
			<NavLink to="/basket">
				<BsFillBasketFill className={classes.icon} />
			</NavLink>
		</div>
	);
};

export default Header;
