import { NavLink } from 'react-router-dom';

const SellerLink = (props) => {
	return (
		<NavLink to={`/seller-page/${props.id}`}>
			<h2>{props.name}</h2>
		</NavLink>
	);
};

export default SellerLink;
