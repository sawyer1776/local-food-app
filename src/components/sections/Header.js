import {
	BsFillBasketFill,
	BsFillPersonFill,
	BsArrowLeft,
} from 'react-icons/bs';
import {
	HiHome,
	HiSearch,
	HiX,
	HiArrowLeft,
} from 'react-icons/hi';
import classes from './Header.module.css';
import {
	NavLink,
	useHistory,
	useParams,
} from 'react-router-dom';
import { useState, useEffect } from 'react';
import PocketBase from 'pocketbase';
import { GLOBALIP } from '../globalVars';

const client = new PocketBase(`${GLOBALIP}`);

const Header = (props) => {
	const params = useParams();

	const [showSearch, setShowSearch] = useState(false);
	const [search, setSearch] = useState(null);

	const history = useHistory();
	let searchData = [];
	const conductSearch = function () {
		const fetchSearchResults = async function () {
			const responseSearchResults = await client
				.collection('products')
				.getList(1, 50, {
					filter: `title~"${search}" || description~"${search}" `,
				});

			searchData = responseSearchResults.items;

			history.push({
				pathname: '/search-results',
				state: { data: searchData, searchTerm: search },
			});
		};
		fetchSearchResults();
		setSearch(null);
		setShowSearch(false);
	};

	return (
		<nav className={classes.header}>
			<div className={classes.headerContainer}>
				<div className={`${classes.headerSearch}`}>
					<HiArrowLeft
						className={classes.icon}
						onClick={() => {
							history.goBack();
						}}
					/>

					<input
						className={classes.searchBox}
						type="text"
						placeholder="Search Products"
						onChange={(event) => {
							setSearch(event.target.value);
						}}
						onKeyDown={(e) => {
							if (e.code === 'Enter') {
								conductSearch();
							}
						}}
					></input>
				</div>

				<div className={classes.headerNavBar}>
					<NavLink
						className={classes.navIcon}
						to="/all-sellers"
					>
						<HiHome className={classes.icon} />
						{props.selected === 'home' ? (
							<div className={classes.selection} />
						) : (
							''
						)}
					</NavLink>
					<NavLink
						className={classes.navIcon}
						to="/profile"
					>
						<BsFillPersonFill className={classes.icon} />
						{props.selected === 'profile' ? (
							<div className={classes.selection} />
						) : (
							''
						)}
					</NavLink>
					<NavLink className={classes.navIcon} to="/basket">
						<BsFillBasketFill className={classes.icon} />
						{props.selected === 'basket' ? (
							<div className={classes.selection} />
						) : (
							''
						)}
					</NavLink>
				</div>
			</div>
		</nav>
	);
};

export default Header;
