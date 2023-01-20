import classes from './ImgAdminItem.module.css';
import { BsTrash, BsPencil } from 'react-icons/bs';
const ImgAdminItem = (props) => {
	return (
		<tr className={classes.listItemContainer}>
			<td className={classes.imgTitle}>{props.img}</td>
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

export default ImgAdminItem;
