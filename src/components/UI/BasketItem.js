import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './BasketItem.module.css';
import ThumbnailImg from './ThumbnailImg';
import { BsTrash } from 'react-icons/bs';

const BasketItem = (props) => {
	return (
		<li className={classes.basketItemContainer}>
			<NavLink
				className={classes.imgAndText}
				to={`/product/${props.product.id}`}
			>
				<img
					className={classes.productImg}
					src={`http://127.0.0.1:8090/api/files/ktbhywrwv3kbqar/${props.product.id}/${props.product.imgs[0]}`}
				></img>

				<div>
					<h3 className={classes.subtitle}>
						{props.product.title}
					</h3>
					<h3 className={classes.subtitle}>
						Pickup options here
					</h3>
					<div className={classes.priceAndQty}>
						<h3>${props.product.price}</h3>
						<div className={classes.basketQty}>
							<p>per</p>
							<h3>{props.product.unit}</h3>
						</div>
					</div>
				</div>
			</NavLink>
			<ul className={classes.basketBtns}>
				<li>
					<button
						className={classes.trashItem}
						onClick={() => {
							props.deleteFunc(props.product.id);
						}}
					>
						<BsTrash />
					</button>
				</li>

				<li className={classes.qtyBtns}>
					<button
						className={classes.qtyBtn}
						onClick={() => {
							props.editCountFunc('-', props.product.id);
						}}
					>
						-
					</button>
					<p className={classes.qtyNumber}>{props.qty}</p>
					<button
						className={classes.qtyBtn}
						onClick={() => {
							props.editCountFunc('+', props.product.id);
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
