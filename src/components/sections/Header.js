import {
	BsFillBasketFill,
	BsFillPersonFill,
	BsX,
} from 'react-icons/bs';
import { HiHome, HiSearch, HiX } from 'react-icons/hi';
import classes from './Header.module.css';
import { NavLink, useHistory } from 'react-router-dom';
import { useState } from 'react';
import PocketBase from 'pocketbase';

const client = new PocketBase('http://127.0.0.1:8090');

const Header = (props) => {
	const [showSearch, setShowSearch] = useState(false);
	const [search, setSearch] = useState(null);
	const history = useHistory();
	let searchData = [];
	const conductSearch = function () {
		console.log('search', search);
		const fetchSearchResults = async function () {
			const responseSearchResults =
				await client.records.getList('products', 1, 50, {
					filter: `title~"${search}" || description~"${search}" `,
				});
			searchData = responseSearchResults.items;
			console.log(searchData);
			history.push({
				pathname: '/search-results',
				state: { data: searchData, searchTerm: search },
			});
		};
		fetchSearchResults();
		setSearch(null);
		setShowSearch(false);
	};

	if (showSearch) {
		return (
			<div
				className={`${classes.header} ${classes.headerSearch}`}
			>
				<HiSearch
					className={classes.icon}
					onClick={conductSearch}
				/>

				<input
					className={classes.searchBox}
					type="text"
					placeholder="Search Products"
					onChange={(event) => {
						setSearch(event.target.value);
					}}
					onKeyDown={(e) => {
						console.log(e.code);
						if (e.code === 'Enter') {
							conductSearch();
						}
					}}
				></input>
				<HiX
					className={classes.icon}
					onClick={() => {
						setShowSearch(false);
					}}
				/>
			</div>
		);
	}

	return (
		<div className={classes.header}>
			<NavLink to="/all-sellers">
				<HiHome className={classes.icon} />
			</NavLink>
			<HiSearch
				className={classes.icon}
				onClick={() => {
					setShowSearch(true);
				}}
			/>

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
