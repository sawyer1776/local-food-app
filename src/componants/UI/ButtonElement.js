import classes from './ButtonElement.module.css';
const ButtonElement = (props) => {
	return (
		<button className={classes.btn}>
			{props.buttonText}
		</button>
	);
};

export default ButtonElement;
