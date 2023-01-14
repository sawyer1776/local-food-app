import classes from './LoadingSpinner.module.css';

const LoadingSpinner = (props) => {
	return (
		<main className={classes.loadingContainer}>
			<p className={classes.loader}></p>
		</main>
	);
};
export default LoadingSpinner;
