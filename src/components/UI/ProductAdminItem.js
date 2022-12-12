import classes from './ProductAdminItem.module.css';
import { BsTrash, BsPencil } from 'react-icons/bs';
const ProductAdminItem = (props) => {
	return (
		<tr className={classes.listItemContainer}>
			<td>
				<BsPencil />
			</td>
			<td>{props.product.title}</td>
			<td>${props.product.price.toFixed(2)}</td>
			<td>{props.product.qty}</td>
			<td>
				<button
					onClick={() => {
						props.deleteFunc(props.product.id);
					}}
					className={classes.deleteBtn}
				>
					<BsTrash />
				</button>
			</td>
		</tr>
	);
};

export default ProductAdminItem;
