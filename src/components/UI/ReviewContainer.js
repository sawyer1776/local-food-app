import classes from './ReviewContainer.module.css';
import ReviewStars from './ReviewStars';
const ReviewContainer = (props) => {
	return (
		<ul className={classes.reviewContainer}>
			<ReviewStars stars={props.product.stars} />
		</ul>
	);
};
export default ReviewContainer;
