import classes from './Categories.module.css';
import Category from './Category';
const Categories = (props) => {
	return (
		<div className={classes.categories}>
			<h2>Browse Categories</h2>
			<div className={classes.categoriescontainer}>
				{props.displayCategories.map((category) => (
					<Category
						title={category.title}
						src={category.src}
						key={category.id}
					/>
				))}
			</div>
		</div>
	);
};

export default Categories;
