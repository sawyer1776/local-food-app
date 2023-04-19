import classes from './PickupSection.module.css';
import PickupMeetupItem from '../UI/PickupMeetupItem';

const PickupSection = (props) => {
	return (
		<section>
			{props.pickupMeetups.length > 0 ? (
				props.pickupMeetups.map((pickupMeetup) => (
					<PickupMeetupItem
						className={classes.container}
						info={pickupMeetup}
						editFunction={props.editFunction}
					></PickupMeetupItem>
				))
			) : (
				<p>
					This producer has not yet set any pickup times
				</p>
			)}

			{/* <h1>Pickup Options Here</h1>
			<p>{props.pickupMeetups[0].location_name}</p> */}
		</section>
	);
};

export default PickupSection;
