import ProductSnapshot from './ProductSnapshot';
import classes from './ProductSnapshotList.module.css';

const ProductSnapshotList = (props) => {
	return (
		<div>
			<h3>Other things you might like</h3>
			<ul className={classes.productsList}>
				{props.allProducts.map((product) => (
					<ProductSnapshot product={product} />
				))}
			</ul>
		</div>
	);
};

export default ProductSnapshotList;
