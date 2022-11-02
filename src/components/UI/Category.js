import classes from './Category.module.css';
import chicken from './chicken.jpg';

const Category = (props) => {
	return (
		<li className={classes.category}>
			{/* Make dynamic later */}
			<img className={classes.img} src={chicken} />

			<h3 className={classes.title}>{props.title}</h3>
		</li>
	);
};

export default Category;
