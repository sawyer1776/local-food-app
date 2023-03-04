import PocketBase from 'pocketbase';
import { useEffect, useState, useContext } from 'react';
import {
	HiOutlineLocationMarker,
	HiOutlineMail,
	HiPhone,
} from 'react-icons/hi';
import classes from './AdminContactPage.module.css';
import { GLOBALIP, pbLoad } from '../globalVars';
import BackToAdmin from '../UI/BackToAdmin';
import AuthContext from '../storage/auth-context';
import { NavLink, useHistory } from 'react-router-dom';

const client = new PocketBase(`${GLOBALIP}`);
let sellerAddress = {};

const AdminContactPage = (props) => {
	const [isLoaded, setLoaded] = useState(false);
	const authCtx = useContext(AuthContext);
	const history = useHistory();
	let latLong = [];

	const updateAddress = async function (
		sellerPageId,
		data
	) {
		await client
			.collection('producers')
			.update(`${sellerPageId}`, data);
	};

	const fetchLatLong = async function (address) {
		const request = new XMLHttpRequest();
		request.open(
			'GET',
			`https://api.opencagedata.com/geocode/v1/json?q=${address}&countrycode=us&limit=1&key=c44325b9d11346f595aaca4bedc21234`
		);
		request.send();
		console.log('sent');
		request.addEventListener('load', function () {
			console.log('loaded');
			const data = JSON.parse(this.responseText);
			let lat = String(data.results[0].geometry.lat);
			console.log('lat', lat);
			let indexOf = lat.indexOf('.');
			lat = lat.slice(0, indexOf + 3);
			lat = lat.concat('5');
			let long = String(data.results[0].geometry.lng);
			indexOf = long.indexOf('.');
			long = long.slice(0, indexOf + 3);
			long = long.concat('5');

			latLong = [lat, long];
			console.log('latLong inside', latLong);
			const sendData = {
				address: address,
				lat_long: latLong,
			};
			updateAddress(authCtx.sellerPageId, sendData);
		});
	};

	const submitHandler = async (e) => {
		e.preventDefault();
		console.log('submitted');
		const address = e.currentTarget.elements.address.value;
		await fetchLatLong(address);
		history.push({
			pathname: '/seller-admin',
		});
	};

	useEffect(() => {
		const loadContact = async function () {
			const responseContact = await client
				.collection('producers')
				.getList(1, 50, {
					filter: `id = "${authCtx.sellerPageId}"`,
				});
			sellerAddress = responseContact.items[0];
			console.log(sellerAddress);
			console.log(sellerAddress.public_phone);
			console.log(sellerAddress.public_email);
			setLoaded(true);
		};

		if (isLoaded) return;
		if (!isLoaded) {
			loadContact();
		}
	});

	if (!isLoaded) {
		return <h1>loading...</h1>;
	}
	if (isLoaded) {
		console.log(sellerAddress);
		return (
			<main className="container">
				<form
					className={classes.form}
					onSubmit={submitHandler}
				>
					<ul className={classes.list}>
						<li>
							<h1>Your Contact Info</h1>
						</li>
						<li>
							<BackToAdmin />
						</li>

						<li
							className={`${classes.listItem} ${classes.descriptionListItem}`}
						>
							<label className={classes.label} for="email">
								<HiOutlineLocationMarker
									className={classes.icon}
								/>
							</label>
							<input
								className={`${classes.input}`}
								id="address"
								type="text"
								placeholder="101 Main Street, Anytown, GA 31000"
								defaultValue={
									sellerAddress.address
										? sellerAddress.address
										: null
								}
							></input>
							{/* <label className={classes.switch}>
							<input type="checkbox" />
							<span
								className={`${classes.slider} ${classes.round}`}
							></span>
						</label> */}
						</li>

						<li className={classes.buttons}>
							<button className="buttonOutline">
								<NavLink to={'/seller-admin'}>
									Cancel
								</NavLink>
							</button>
							<button type="submit">Save</button>
						</li>
					</ul>
				</form>
			</main>
		);
	}
};

export default AdminContactPage;
