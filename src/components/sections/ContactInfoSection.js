import { HiOutlineMail, HiPhone } from 'react-icons/hi';
import classes from './ContactInfoSection.module.css';

const ContactInfoSection = (props) => {
	let phoneFormatted = `(${props.phone.slice(
		0,
		3
	)}) ${props.phone.slice(3, 6)}-${props.phone.slice(
		6,
		10
	)}`;

	return (
		<div className="container">
			<a
				href={`mailto: ${props.email}`}
				className={classes.contactLine}
			>
				<HiOutlineMail className={classes.icon} />{' '}
				{props.email}
			</a>

			<a
				href={`tel:+${props.phone}`}
				className={classes.contactLine}
			>
				<HiPhone className={classes.icon} />
				{phoneFormatted}
			</a>
		</div>
	);
};

export default ContactInfoSection;
