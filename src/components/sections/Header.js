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
import { NavLink, useHistory } from 'react-router-dom';
import { useState } from 'react';
import PocketBase from 'pocketbase';
import { GLOBALIP } from '../globalVars';

const client = new PocketBase(`${GLOBALIP}`);

const Header = (props) => {
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
					<NavLink to="/all-sellers">
						<HiHome className={classes.icon} />
					</NavLink>
					<NavLink to="/profile">
						<BsFillPersonFill className={classes.icon} />
					</NavLink>
					<NavLink to="/basket">
						<BsFillBasketFill className={classes.icon} />
					</NavLink>
				</div>
			</div>
		</nav>
	);
};

export default Header;
