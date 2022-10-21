import {
	BsFillBasketFill,
	BsFillPersonFill,
} from 'react-icons/bs';
import { HiHome } from 'react-icons/hi';

import { GiHamburgerMenu } from 'react-icons/gi';

import classes from './Header.module.css';

const Header = (props) => {
	return (
		<div className={classes.header}>
			<GiHamburgerMenu className={classes.icon} />
			<HiHome className={classes.icon} />
			<input type="text" placeholder="Search"></input>
			<BsFillPersonFill className={classes.icon} />
			<BsFillBasketFill className={classes.icon} />
		</div>
	);
};

export default Header;
