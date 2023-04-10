import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './BasketItem.module.css';
import ThumbnailImg from './ThumbnailImg';
import { BsTrash } from 'react-icons/bs';
import { GLOBALIP } from '../globalVars';

const BasketItem = (props) => {
	const [isCount, setCount] = useState(props.qty);

	return (
		<li className={classes.basketItemContainer}>
			<div className={classes.imgAndText}>
				<NavLink to={`/product/${props.product.id}`}>
					<img
						className={classes.productImg}
						src={`${GLOBALIP}/api/files/fju2ageazj7ce35/${props.product.id}/${props.product.imgs[0]}`}
					></img>
				</NavLink>

				<div className={classes.text}>
					<h3 className={classes.subtitle}>
						{props.product.title}
					</h3>

					<div className={classes.priceAndQty}>
						<h3>${props.product.price}</h3>
						<div className={classes.basketQty}>
							<p>per</p>
							<h3>{props.product.unit}</h3>
						</div>
					</div>
				</div>
			</div>

			<ul className={classes.basketBtns}>
				<li>
					<button
						className={classes.trashItem}
						onClick={() => {
							props.deleteFunc(props.index);
						}}
					>
						<BsTrash />
					</button>
				</li>

				<li className={classes.qtyBtns}>
					<button
						className={classes.qtyBtn}
						onClick={() => {
							if (isCount > 1) {
								setCount(isCount - 1);
								props.editCountFunc('-', props.index);
							}
						}}
					>
						-
					</button>
					<p className={classes.qtyNumber}>{isCount}</p>
					<button
						className={classes.qtyBtn}
						onClick={() => {
							//ADD control for available qty
							setCount(isCount + 1);
							props.editCountFunc('+', props.index);
						}}
					>
						+
					</button>
				</li>
			</ul>
		</li>
	);
};
export default BasketItem;
