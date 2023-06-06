import PocketBase from 'pocketbase';
import { useEffect, useState, useContext } from 'react';

import classes from './AdminContactPage.module.css';
import { GLOBALIP, pbLoad } from '../globalVars';
import BackToAdmin from '../UI/BackToAdmin';
import AuthContext from '../storage/auth-context';
import { NavLink, useHistory } from 'react-router-dom';
import PickupSection from '../sections/PickupSection';
import EditingPickupSection from '../sections/EditingPickupSection';

const client = new PocketBase(`${GLOBALIP}`);

let pickupsList = {};

const AdminContactPage = (props) => {
	const [isLoaded, setLoaded] = useState(false);
	const authCtx = useContext(AuthContext);
	const [isEditing, setEditing] = useState(null);
	console.log('ctx', authCtx);

	const editClickHandler = function (pickupId) {
		if (pickupId === null) {
			setLoaded(false);
			fetchPickups();
		}
		setEditing(pickupId);
	};

	const submitHandler = function () {
		console.log('Submitted');
	};

	const fetchPickups = async function () {
		const responsePickups = await client
			.collection('pickup_meetups')
			.getList(1, 50, {
				filter: `producer_id = "${authCtx.sellerPageId}"`,
			});
		pickupsList = responsePickups.items;
		console.log(pickupsList);

		setLoaded(true);
	};
	useEffect(() => {
		if (isLoaded) return;
		if (!isLoaded) {
			fetchPickups();
		}
	});

	if (!isLoaded) {
		return <h1>loading...</h1>;
	}
	if (isLoaded && !isEditing) {
		console.log(pickupsList);
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
							<PickupSection
								pickupMeetups={pickupsList}
								editFunction={editClickHandler}
								editing={true}
							/>
						</li>

						<li className={classes.buttons}>
							<button
								onClick={() => {
									editClickHandler('new');
								}}
							>
								Add New Pickup
							</button>
						</li>
					</ul>
				</form>
			</main>
		);
	}
	if (isLoaded && isEditing) {
		return (
			<main className="container">
				<EditingPickupSection
					id={isEditing}
					cancelFunction={editClickHandler}
				/>
			</main>
		);
	}
};

export default AdminContactPage;
