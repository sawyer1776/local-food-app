import classes from './PickupAdminItem.module.css';
import { BsTrash, BsPencil } from 'react-icons/bs';
const PickupAdminItem = (props) => {
	return (
		<tr className={classes.listItemContainer}>
			<td>
				<BsPencil />
			</td>
			<td>
				{props.meetup.pickup === true ? 'Pickup' : 'Meetup'}
			</td>
			<td>{props.meetup.location_name}</td>
			<td>
				{props.meetup.start_time} - {props.meetup.end_time}
			</td>
			<td>
				<button
					onClick={() => {
						props.deleteFunc(props.meetup.id);
					}}
					className={classes.deleteBtn}
				>
					<BsTrash />
				</button>
			</td>
		</tr>
	);
};

export default PickupAdminItem;
