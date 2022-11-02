import classes from './ReviewStars.module.css';

const ReviewStars = (props) => {
	let totalStars = [];
	for (let i = 0; i < props.stars; i++) {
		totalStars.push(
			//MAKE BETTER UNIQUE KEY LATER
			<li className={classes.star} key={Math.random()}>
				*
			</li>
		);
	}
	return totalStars;
};

export default ReviewStars;
