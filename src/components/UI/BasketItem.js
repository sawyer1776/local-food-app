import { NavLink } from 'react-router-dom';
import classes from './BasketItem.module.css';
import ThumbnailImg from './ThumbnailImg';

const BasketItem = (props) => {
	return (
		<li>
			<NavLink to={`/product/${props.product.id}`}>
				<div className={classes.imgAndText}>
					<ThumbnailImg product={props.product} />
					<div>
						<h3>{props.product.title}</h3>
						<h3>Pickup options here</h3>
						<div className={classes.priceAndQty}>
							<h3>${props.product.price}</h3>
							<div className={classes.basketQty}>
								<p>per</p>
								<h3>{props.product.unit}</h3>
							</div>
						</div>
					</div>
				</div>
			</NavLink>
			<ul className={classes.basketBtns}>
				<li>
					<button
						onClick={() => {
							props.deleteFunc(props.id);
						}}
					>
						Delete
					</button>
				</li>
				<li>
					<button>Move to H</button>
				</li>
				<li className={classes.qtyBtns}>
					<button
						onClick={() => {
							props.editCountFunc('-');
						}}
					>
						-
					</button>
					<div>{props.qty}</div>
					<button
						onClick={() => {
							props.editCountFunc('+');
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
