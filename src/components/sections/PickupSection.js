import classes from './PickupSection.module.css';
import PickupMeetupItem from '../UI/PickupMeetupItem';

const PickupSection = (props) => {
	return (
		<section>
			{props.pickupMeetups.map((pickupMeetup) => (
				<PickupMeetupItem
					className={classes.container}
					info={pickupMeetup}
					editFunction={props.editFunction}
				></PickupMeetupItem>
			))}

			{/* <h1>Pickup Options Here</h1>
			<p>{props.pickupMeetups[0].location_name}</p> */}
		</section>
	);
};

export default PickupSection;
