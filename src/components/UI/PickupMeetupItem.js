import { BsPencil } from 'react-icons/bs';
import classes from './PickupMeetupItem.module.css';

const PickupMeetupItem = (props) => {
	let startTime = props.info.start_time;
	let endTime = props.info.end_time;
	// if (startTime.slice > 1259) {
	// 	startTime = startTime - 1200;
	// }
	// if (endTime > 1259) {
	// 	endTime = endTime - 1200;
	// }
	let startFirst = String(startTime).slice(0, 2);
	if (Number(startFirst >= 13)) {
		startFirst = startFirst - 12;
	}
	let startLast = String(startTime).slice(3, 5);
	let endFirst = String(endTime).slice(0, 2);
	if (Number(endFirst >= 13)) {
		endFirst = endFirst - 12;
	}
	let endLast = String(endTime).slice(3, 5);

	return (
		<div className={classes.container}>
			<h3>
				{props.info.pickup
					? 'Pickup at the farm'
					: 'Meetup locally'}
			</h3>

			<p>{props.info.location_name}</p>
			<p>
				{props.info.show_address_public ? (
					<a href={props.info.address_link}>
						{props.info.address}
					</a>
				) : null}
			</p>
			<p>
				{props.info.day.length > 1
					? props.info.day.map((day) => day + ', ')
					: props.info.day[0]}
			</p>
			<p>
				{props.info.one_time_date}
				{/* CONVERT THIS TO READABLE */}
			</p>

			<p className={classes.time}>
				{startFirst + ':' + startLast}
				{Number(startTime.slice(0, 2)) > 11 &&
				Number(startTime.slice(0, 2)) < 24
					? 'pm'
					: 'am'}{' '}
				- {endFirst + ':' + endLast}
				{Number(endTime.slice(0, 2)) > 11 &&
				Number(endTime.slice(0, 2)) < 24
					? 'pm'
					: 'am'}
			</p>

			<button
				className={classes.editButton}
				onClick={() => {
					props.editFunction(props.info.id);
				}}
			>
				<BsPencil />
			</button>
		</div>
	);
};

export default PickupMeetupItem;
