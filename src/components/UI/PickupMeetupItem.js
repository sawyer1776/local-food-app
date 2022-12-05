import classes from './PickupMeetupItem.module.css';

const PickupMeetupItem = (props) => {
	let startTime = props.info.start_time;
	let endTime = props.info.end_time;
	if (startTime > 1259) {
		startTime = startTime - 1200;
	}
	if (endTime > 1259) {
		endTime = endTime - 1200;
	}
	let startFirst = String(startTime).slice(0, -2);
	let startLast = String(startTime).slice(-2);
	let endFirst = String(endTime).slice(0, -2);
	let endLast = String(endTime).slice(-2);

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
				{props.info.start_time > 1159 ? 'pm' : 'am'} -{' '}
				{endFirst + ':' + endLast}
				{props.info.end_time > 1159 ? 'pm' : 'am'}
			</p>
		</div>
	);
};

export default PickupMeetupItem;
