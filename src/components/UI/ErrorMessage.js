import classes from './ErrorMessage.module.css';

const ErrorMessage = (props) => {
	return (
		<div className={classes.error}>
			<h4 className={classes.errorTitle}>
				There was an error!
			</h4>
			<p className={classes.errorMessage}>
				{' '}
				{props.errorMessage}
			</p>
		</div>
	);
};

export default ErrorMessage;
