import PocketBase from 'pocketbase';
import { useEffect, useState, useContext } from 'react';
import classes from './EditingPickupSection.module.css';
import AuthContext from '../storage/auth-context';
import { GLOBALIP } from '../globalVars';

const client = new PocketBase(`${GLOBALIP}`);

let pickup = {};
let data = {};

const EditingPickupSection = (props) => {
	const [isLoaded, setLoaded] = useState(false);
	const authCtx = useContext(AuthContext);

	const deleteHandler = async function () {
		await client
			.collection('pickup_meetups')
			.delete(`${props.id}`);
	};

	const updatePickup = async function (data) {
		if (props.id != 'new')
			await client
				.collection('pickup_meetups')
				.update(`${props.id}`, data);

		if (props.id === 'new') {
			await client
				.collection('pickup_meetups')
				.create(data);
		}

		pickup = {};
		data = {};
		props.cancelFunction(null);
	};

	const submitHandler = function (e) {
		e.preventDefault();
		console.log(e.currentTarget.elements);
		console.log(e.currentTarget.elements.location.value);
		const locationName =
			e.currentTarget.elements.location.value;
		const address = e.currentTarget.elements.address.value;
		const startTime = e.currentTarget.elements.start.value;
		const endTime = e.currentTarget.elements.end.value;
		const producerId = authCtx.sellerPageId;

		data = {
			location_name: locationName,
			address: address,
			start_time: startTime,
			end_time: endTime,
			producer_id: producerId,
		};

		console.log(data);

		updatePickup(data);
	};

	useEffect(() => {
		const fetchPickup = async function () {
			const responsePickup = await client
				.collection('pickup_meetups')
				.getList(1, 1, {
					filter: `id = "${props.id}"`,
				});
			pickup = responsePickup.items[0];

			setLoaded(true);
		};
		if (isLoaded) return;
		if (!isLoaded && props.id != 'new') fetchPickup();
		if (props.id === 'new') setLoaded(true);
	});

	if (!isLoaded) {
		return <h1>loading...</h1>;
	}
	if (isLoaded) {
		return (
			<section>
				<div className={classes.idAndDelete}>
					<h2 className={classes.id}>ID: {props.id}</h2>
					<button
						className={`${classes.deleteBtn} buttonOutline`}
						onClick={() => {
							deleteHandler();
							pickup = {};
							props.cancelFunction(null);
						}}
					>
						Delete
					</button>
				</div>
				<form onSubmit={submitHandler}>
					<ul className={classes.list}>
						<li className={classes.listItem}>
							<label
								className={classes.label}
								for="location"
							>
								Location Name:
							</label>

							<input
								className={classes.input}
								id="location"
								type="text"
								placeholder="Enter the location"
								defaultValue={
									pickup.location_name
										? pickup.location_name
										: null
								}
							></input>
						</li>
						<li className={classes.listItem}>
							<label
								className={classes.label}
								for="address"
							>
								Address:
							</label>

							<input
								className={classes.input}
								id="address"
								type="text"
								placeholder="Enter the address"
								defaultValue={
									pickup.address ? pickup.address : null
								}
							></input>
						</li>
						<li className={classes.listItem}>
							<label className={classes.label} for="start">
								Start Time:
							</label>

							<input
								className={classes.input}
								id="start"
								type="time"
								defaultValue={
									pickup.start_time
										? pickup.start_time
										: null
								}
							></input>
						</li>
						<li className={classes.listItem}>
							<label className={classes.label} for="end">
								End Time:
							</label>

							<input
								className={classes.input}
								id="end"
								type="time"
								defaultValue={
									pickup.end_time ? pickup.end_time : null
								}
							></input>
						</li>
					</ul>

					<div className={classes.buttons}>
						<button
							className="buttonOutline"
							onClick={() => {
								props.cancelFunction(null);
								pickup = {};
							}}
						>
							Cancel
						</button>
						<button type="submit">Save</button>
					</div>
				</form>
			</section>
		);
	}
};

export default EditingPickupSection;
