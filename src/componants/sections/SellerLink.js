import { NavLink } from 'react-router-dom';
import classes from './SellerLink.module.css';

const SellerLink = (props) => {
	console.log(props.seller['@collectionId']);
	return (
		<NavLink
			className={classes.sellerLinkContainer}
			to={`/seller-page/${props.id}`}
		>
			<img
				className={classes.sellerImg}
				src={`http://127.0.0.1:8090/api/files/${props.seller['@collectionId']}/${props.seller.id}/${props.seller.imgs[0]}`}
			></img>
			<div>
				<h2>{props.name}</h2>
				<h3>{props.seller.location}</h3>
			</div>
		</NavLink>
	);
};

export default SellerLink;
