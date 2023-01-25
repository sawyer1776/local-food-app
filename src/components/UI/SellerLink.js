import { NavLink } from 'react-router-dom';
import classes from './SellerLink.module.css';
import ReviewStars from './ReviewStars';
import GLOBALIP from '../globalVars';

const SellerLink = (props) => {
	return (
		<NavLink
			className={classes.sellerLinkContainer}
			to={`/seller-page/${props.id}`}
		>
			<img
				className={classes.sellerImg}
				src={`${GLOBALIP}/api/files/${props.seller.collectionId}/${props.seller.id}/${props.seller.imgs[0]}`}
			></img>
			<div className={classes.sellerText}>
				<h2 className={classes.sellerTitle}>
					{props.seller.producer_name}
				</h2>
				<h3 className={classes.sellerSubtitle}>
					{props.seller.location}
				</h3>
				<ul className={classes.reviewStarsContainer}>
					<ReviewStars
						className={classes.reviewStars}
						stars={props.seller.reviews}
					/>
				</ul>
			</div>
		</NavLink>
	);
};

export default SellerLink;
